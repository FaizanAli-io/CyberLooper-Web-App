import enum
from database import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, Enum, DateTime
from sqlalchemy.orm import relationship


class UserRole(enum.Enum):
    ADMIN = "ADMIN"
    STANDARD = "STANDARD"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=True)  # Optional for Firebase users
    firebase_uid = Column(String, unique=True, nullable=True)  # Firebase UID
    role = Column(Enum(UserRole), default=UserRole.STANDARD, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    chats = relationship("Chat", back_populates="user", cascade="all, delete-orphan")
