from sqlalchemy.orm import Session
from blogs.models import Blog
from blogs.schemas import BlogCreate, BlogUpdate, BlogResponse
from datetime import datetime

def create_blog(db: Session, blog_data: BlogCreate):
    blog = Blog(caption=blog_data.caption, title=blog_data.title)
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return BlogResponse.from_orm(blog)
    # return blog

def get_blog(db: Session, blog_id: int):
    return db.query(Blog).filter(Blog.id == blog_id).first()

def get_blogs(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Blog).offset(skip).limit(limit).all()


def update_blog(db: Session, blog_id: int, blog_data: BlogUpdate):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        return None  # Handle case where blog doesn't exist
    
    updated = False
    if blog_data.caption is not None:
        blog.caption = blog_data.caption
        updated = True  # Track if something changed
    if blog_data.title is not None:
        blog.title = blog_data.title
        updated = True  # Track if something changed

    if updated:  # Commit only if changes were made
        blog.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(blog)
    
    return blog

# def update_blog(db: Session, blog_id: int, blog_data: BlogUpdate):
#     blog = db.query(Blog).filter(Blog.id == blog_id).first()
#     if blog:
#         if blog_data.caption is not None:
#             blog.caption = blog_data.caption
#         blog.updated_at = datetime.utcnow()
#         db.commit()
#         db.refresh(blog)
#     return blog

def delete_blog(db: Session, blog_id: int):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if blog:
        db.delete(blog)
        db.commit()
    return blog
