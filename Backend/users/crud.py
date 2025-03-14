from users.models import User
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from users.schemas import UserCreate, UserUpdate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


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
        password=hashed_password,
        role=user_data.role,
        firebase_uid=user_data.firebase_uid,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_or_create_firebase_user(db: Session, firebase_uid: str, email: str):
    user = db.query(User).filter(User.firebase_uid == firebase_uid).first()
    if not user:
        user = User(email=email, firebase_uid=firebase_uid)
        db.add(user)
        db.commit()
        db.refresh(user)
    return user


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def update_user(db: Session, user_id: int, user_data: UserUpdate):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        if user_data.email is not None:
            user.email = user_data.email
        if user_data.password is not None:
            user.password = hash_password(user_data.password)
        if user_data.role is not None:
            user.role = user_data.role
        db.commit()
        db.refresh(user)
    return user


def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
    return user
