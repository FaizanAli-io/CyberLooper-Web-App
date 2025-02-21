from users.models import User
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from users.schemas import UserCreate, UserUpdate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password with stored hash."""
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(db: Session, email: str, password: str):
    """Check if user exists and password is correct."""
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        return None  # Return None if user does not exist or password is incorrect
    return user

def create_user(db: Session, user_data: UserCreate):
    hashed_password = hash_password(user_data.password)
    user = User(email=user_data.email, password=hashed_password, role=user_data.role)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

# def create_user(db: Session, user_data: UserCreate):
#     hashed_password = hash_password(user_data.password)
#     user = User(email=user_data.email, password=hashed_password, role=user_data.role)
#     db.add(user)
#     db.commit()
#     db.refresh(user)
#     return user


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()


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
