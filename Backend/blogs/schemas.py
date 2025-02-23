from datetime import datetime
from pydantic import BaseModel

class BlogBase(BaseModel):
    caption: str
    title: str

class BlogCreate(BlogBase):
    pass

# class BlogUpdate(BaseModel):
#     caption: str | None = None
from typing import Optional

class BlogUpdate(BaseModel):
    caption: Optional[str] = None
    title: Optional[str] = None

class BlogResponse(BlogBase):
    id: int
    created_at: datetime
    updated_at: datetime
      
    class Config:
        from_attributes = True
