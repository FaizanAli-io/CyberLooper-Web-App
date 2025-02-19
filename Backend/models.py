import enum
from database import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, Enum, DateTime


class UserRole(enum.Enum):
    ADMIN = "ADMIN"
    STANDARD = "STANDARD"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.STANDARD, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
