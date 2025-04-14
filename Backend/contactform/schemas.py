from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# ✅ Input Schema (Only required fields for creating a message)
class ContactFormCreate(BaseModel):
    message: str


# ✅ Response Schema (Includes fields returned from DB)
class ContactFormResponse(BaseModel):
    id: int
    message: str
    email: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
