from enum import Enum
from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional


class UserRole(str, Enum):
    ADMIN = "ADMIN"
    STANDARD = "STANDARD"


class UserBase(BaseModel):
    email: EmailStr
    firstname: str
    role: UserRole


class UserCreate(UserBase):
    password: Optional[str] = None  # Optional for Firebase users
    google_firebase_uid: Optional[str] = None  # Store Firebase UID if applicable
    microsoft_firebase_uid: Optional[str] = None  # Store Firebase UID if applicable


class UserUpdate(BaseModel):
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    jobtitle: Optional[str] = None
    bio: Optional[str] = None


class UserLogin(BaseModel):
    email: Optional[EmailStr] = None
    password: Optional[str] = None  # Optional for Firebase users
    firebase_token: Optional[str] = None  # Store Firebase UID if applicable


class UserResponse(UserBase):
    created_at: datetime
    updated_at: datetime
    lastname: Optional[str] = None
    jobtitle: Optional[str] = None
    bio: Optional[str] = None

    class Config:
        from_attributes = True
