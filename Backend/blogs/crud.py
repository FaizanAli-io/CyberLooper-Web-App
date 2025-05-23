from fastapi import HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone

from blogs.models import Blog
from blogs.schemas import BlogResponse

from utilities.cloudinary import (
    upload_image_to_cloudinary,
    delete_image_from_cloudinary,
)


def create_blog(db: Session, title: str, caption: str, image_file=None):
    image_url, public_id = (
        upload_image_to_cloudinary(image_file) if image_file else (None, None)
    )
    blog = Blog(
        caption=caption, title=title, image_url=image_url, image_public_id=public_id
    )
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return BlogResponse.from_orm(blog)


def get_blog(db: Session, blog_id: int):
    return db.query(Blog).filter(Blog.id == blog_id).first()


def get_blogs(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Blog).offset(skip).limit(limit).all()


def update_blog(
    db: Session, blog_id: int, caption: str = None, title: str = None, image_file=None
):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        return None

    if caption:
        if caption is not None and not caption.strip():
            raise HTTPException(status_code=422, detail="Caption cannot be empty")
        blog.caption = caption
    if title:
        if title is not None and not title.strip():
            raise HTTPException(status_code=422, detail="Title cannot be empty")
        blog.title = title
    if image_file:
        if blog.image_public_id:
            delete_image_from_cloudinary(blog.image_public_id)
        new_url, new_pid = upload_image_to_cloudinary(image_file)
        blog.image_url = new_url
        blog.image_public_id = new_pid

    blog.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(blog)
    return blog


def delete_blog(db: Session, blog_id: int):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if blog:
        if blog.image_public_id:
            delete_image_from_cloudinary(blog.image_public_id)
        db.delete(blog)
        db.commit()
    return blog
