from enum import Enum
from datetime import datetime
from pydantic import BaseModel, EmailStr


class UserRole(str, Enum):
    ADMIN = "ADMIN"
    STANDARD = "STANDARD"


class UserBase(BaseModel):
    email: EmailStr
    role: UserRole


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    email: EmailStr | None = None
    password: str | None = None
    role: UserRole | None = None


class UserResponse(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
