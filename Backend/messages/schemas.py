from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# ✅ Input Schema (Only required fields for creating a message)
class MessageCreate(BaseModel):
    user_id: int
    chat_id: Optional[int] = None  # ✅ Allows missing chat_id for new chats
    request: str

# ✅ Response Schema (Includes fields returned from DB)
class MessageResponse(BaseModel):
    id: int
    chat_id: Optional[int]  # ✅ Chat ID can be null for new chats
    request: str
    response: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
