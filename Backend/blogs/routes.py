from fastapi import APIRouter, Depends, HTTPException, Form, File, UploadFile
from sqlalchemy.orm import Session
from database import get_db
from blogs.crud import create_blog, get_blog, get_blogs, update_blog, delete_blog
from blogs.schemas import BlogResponse
from users.auth import get_current_user, get_current_admin
from users.models import User

router = APIRouter()

@router.post("", response_model=BlogResponse)
def create_new_blog(
    title: str = Form(...),
    caption: str = Form(...),
    image_file: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    if not title.strip():
        raise HTTPException(status_code=422, detail="Title cannot be empty")
    if not caption.strip():
        raise HTTPException(status_code=422, detail="Caption cannot be empty")
    return create_blog(db=db, title=title, caption=caption, image_file=image_file.file if image_file else None)


@router.get("/{blog_id}", response_model=BlogResponse)
def read_blog(
    blog_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not blog_id:
        raise HTTPException(status_code=422, detail="Blog ID is needed")
    db_blog = get_blog(db, blog_id)
    if db_blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return db_blog


@router.get("", response_model=list[BlogResponse])
def read_blogs(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_blogs(db, skip, limit)


@router.put("/{blog_id}", response_model=BlogResponse)
def update_existing_blog(
    blog_id: int,
    title: str = Form(None),
    caption: str = Form(None),
    image_file: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    updated_blog = update_blog(
        db=db,
        blog_id=blog_id,
        title=title,
        caption=caption,
        image_file=image_file.file if image_file else None
    )
    if updated_blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return updated_blog


@router.delete("/{blog_id}")
def delete_existing_blog(
    blog_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    if not blog_id:
        raise HTTPException(status_code=422, detail="Blog ID is needed")
    deleted_blog = delete_blog(db, blog_id)
    if deleted_blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"detail": "Blog deleted successfully"}
