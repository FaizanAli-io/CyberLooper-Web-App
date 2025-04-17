import enum
from database import Base
from datetime import datetime, date
from sqlalchemy import Column, Integer, String, Enum, DateTime, Date, Boolean
from sqlalchemy.orm import relationship


class UserRole(enum.Enum):
    ADMIN = "ADMIN"
    STANDARD = "STANDARD"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    firstname = Column(String, nullable=False)
    lastname = Column(String, nullable=True)
    jobtitle = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    password = Column(String, nullable=True)  # Optional for Firebase users
    microsoft_firebase_uid = Column(String, unique=True, nullable=True)  # Firebase UID
    google_firebase_uid = Column(String, unique=True, nullable=True)  # Firebase UID
    role = Column(Enum(UserRole), default=UserRole.STANDARD, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    token_used = Column(Integer, default=0, nullable=False)

    reset_token = Column(String, nullable=True)
    reset_token_expiry = Column(DateTime, nullable=True)

    email_verification_token = Column(String, nullable=True)
    email_verification_token_expiry = Column(DateTime, nullable=True)
    email_verified = Column(Boolean, default=False)

    chats = relationship("Chat", back_populates="user", cascade="all, delete-orphan")
    contactform = relationship("ContactForm", back_populates="user", cascade="all, delete-orphan")
