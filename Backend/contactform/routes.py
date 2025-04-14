from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from contactform.crud import (
    create_contactform,
    # get_contactform,
    get_all_contactforms,
    # update_contactform,
    # delete_contactform,
)
from contactform.schemas import ContactFormCreate, ContactFormResponse
from users.auth import get_current_user, get_current_admin
from users.models import User

router = APIRouter()


@router.post("", response_model=ContactFormResponse)
def create_new_contactform(
    contactform: ContactFormCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_contactform(db, contactform, current_user)


@router.get("", response_model=list[ContactFormResponse])
def fetch_contactforms(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_admin)
):
    contactforms = get_all_contactforms(db)
    if not contactforms:
        raise HTTPException(status_code=404, detail="No contact forms found")
    return contactforms
