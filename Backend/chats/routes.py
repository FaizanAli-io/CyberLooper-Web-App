from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from chats.crud import create_chat, get_chat, update_chat, delete_chat, get_chats_by_user
from chats.schemas import ChatCreate, ChatUpdate, ChatResponse

router = APIRouter()

@router.post("", response_model=ChatResponse)
def create_new_chat(chat: ChatCreate, db: Session = Depends(get_db)):
    return create_chat(db, chat)

@router.get("/{chat_id}", response_model=ChatResponse)
def read_chat(chat_id: int, db: Session = Depends(get_db)):
    db_chat = get_chat(db, chat_id)
    if db_chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    return db_chat

# @router.get("", response_model=list[ChatResponse])
# def read_chats(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     return get_chats(db, skip, limit)

@router.put("/{chat_id}", response_model=ChatResponse)
def update_existing_chat(chat_id: int, chat: ChatUpdate, db: Session = Depends(get_db)):
    updated_chat = update_chat(db, chat_id, chat)
    if updated_chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    return updated_chat

@router.delete("/{chat_id}")
def delete_existing_chat(chat_id: int, db: Session = Depends(get_db)):
    deleted_chat = delete_chat(db, chat_id)
    if deleted_chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    return {"detail": "Chat deleted successfully"}

@router.get("/user/{user_id}", response_model=list[ChatResponse])
def fetch_chats(user_id: int, db: Session = Depends(get_db)):
    """Get all chats corresponding to a user ID."""
    chats = get_chats_by_user(db, user_id)
    if not chats:
        raise HTTPException(status_code=404, detail="No chats found for this user")
    return chats