from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class BlogBase(BaseModel):
    caption: str
    title: str

class BlogResponse(BlogBase):
    id: int
    image_url: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
