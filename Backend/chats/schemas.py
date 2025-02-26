from datetime import datetime
from pydantic import BaseModel

class ChatBase(BaseModel):
    topic: str

class ChatCreate(ChatBase):
    pass

class ChatUpdate(BaseModel):
    topic: str | None = None

class ChatResponse(ChatBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
