from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class MessagePair(BaseModel):
    user: str
    ai: str

# ✅ Input Schema (Only required fields for creating a message)
class MessageCreate(BaseModel):
    chat_id: Optional[int] = None  # ✅ Allows missing chat_id for new chats
    request: str
    user_role: Optional[str] = None
    department: Optional[str] = None
    language: Optional[str] = None
    model: Optional[str] = None

class SwitchModel(BaseModel):
    chat_id: int
    user_role: Optional[str] = None
    department: Optional[str] = None
    language: Optional[str] = None


# ✅ Response Schema (Includes fields returned from DB)
class MessageResponse(BaseModel):
    id: int
    chat_id: Optional[int] = None  # ✅ Chat ID can be null for new chats
    request: str
    response: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
