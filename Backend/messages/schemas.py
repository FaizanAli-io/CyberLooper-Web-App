from pydantic import BaseModel
from datetime import datetime

class MessageBase(BaseModel):
    chat_id: int
    request: str

class MessageCreate(MessageBase):
    pass

# class MessageUpdate(BaseModel):
#     content: str | None = None

class MessageResponse(MessageBase):
    id: int
    response: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
