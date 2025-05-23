from users.models import User
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from users.schemas import UserCreate, UserUpdate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

from utilities.email import send_email


def send_emailverification_email(recipient_email: str, message: str):

    subject = "Cyberlooper – Verify Your Email Address"

    body = f"""
    Hello,

    Thank you for signing up with Cyberlooper!

    To complete your registration and activate your account, please verify your email address by clicking the link below:

    {message}

    If you did not sign up for a Cyberlooper account, you can safely ignore this email.

    Best regards,  
    Support Team
    """

    try:
        send_email(recipient_email, subject, body)
    except Exception as e:
        print(f"❌ Failed to send email: {e}")


def send_forgotpassword_email(recipient_email: str, message: str):

    subject = "Cyberlooper - Reset Your Password"

    body = f"""
    Hello,

    We received a request to reset your Cyberlooper account password.

    To proceed, please click the link below:

    "{message}"

    If you didn’t request this, you can safely ignore this email—your password will remain unchanged.

    Best regards,  
    Support Team
    """

    try:
        send_email(recipient_email, subject, body)
    except Exception as e:
        print(f"❌ Failed to send email: {e}")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        return None
    return user


def create_user(db: Session, user_data: UserCreate):
    hashed_password = hash_password(user_data.password) if user_data.password else None
    user = User(
        email=user_data.email,
        firstname=user_data.firstname,
        password=hashed_password,
        role=user_data.role,
        # firebase_uid=user_data.firebase_uid,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_or_create_firebase_user(
    db: Session, firebase_uid: str, email: str, provider: str, name: str
):
    user = db.query(User).filter(User.email == email).first()

    if user:
        # Update the corresponding Firebase UID field if it's not already set
        if provider == "google.com" and not user.google_firebase_uid:
            user.google_firebase_uid = firebase_uid
        elif provider == "microsoft.com" and not user.microsoft_firebase_uid:
            user.microsoft_firebase_uid = firebase_uid

        db.commit()
        db.refresh(user)
        return user

    # No user with this email exists, create a new one
    user = User(
        email=email,
        firstname=name,
        google_firebase_uid=firebase_uid if provider == "google" else None,
        microsoft_firebase_uid=firebase_uid if provider == "microsoft" else None,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def update_user(db: Session, user_id: int, user_data: UserUpdate):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        if user_data.firstname is not None:
            user.firstname = user_data.firstname
        if user_data.lastname is not None:
            user.lastname = user_data.lastname
        if user_data.jobtitle is not None:
            user.jobtitle = user_data.jobtitle
        if user_data.bio is not None:
            user.bio = user_data.bio
        db.commit()
        db.refresh(user)
    return user


def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
    return user
