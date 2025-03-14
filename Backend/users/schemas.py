from enum import Enum
from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional


class UserRole(str, Enum):
    ADMIN = "ADMIN"
    STANDARD = "STANDARD"


class UserBase(BaseModel):
    email: EmailStr
    role: UserRole


class UserCreate(UserBase):
    password: Optional[str] = None  # Optional for Firebase users
    firebase_uid: Optional[str] = None  # Store Firebase UID if applicable


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    role: Optional[UserRole] = None


class UserResponse(UserBase):
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
