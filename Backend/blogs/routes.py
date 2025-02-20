from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from blogs.crud import create_blog, get_blog, get_blogs, update_blog, delete_blog
from blogs.schemas import BlogCreate, BlogUpdate, BlogResponse

router = APIRouter()

@router.post("", response_model=BlogResponse)
def create_new_blog(blog: BlogCreate, db: Session = Depends(get_db)):
    return create_blog(db, blog)

@router.get("/{blog_id}", response_model=BlogResponse)
def read_blog(blog_id: int, db: Session = Depends(get_db)):
    db_blog = get_blog(db, blog_id)
    if db_blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return db_blog

@router.get("", response_model=list[BlogResponse])
def read_blogs(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_blogs(db, skip, limit)

@router.put("/{blog_id}", response_model=BlogResponse)
def update_existing_blog(blog_id: int, blog: BlogUpdate, db: Session = Depends(get_db)):
    updated_blog = update_blog(db, blog_id, blog)
    if updated_blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return updated_blog

@router.delete("/{blog_id}")
def delete_existing_blog(blog_id: int, db: Session = Depends(get_db)):
    deleted_blog = delete_blog(db, blog_id)
    if deleted_blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"detail": "Blog deleted successfully"}
