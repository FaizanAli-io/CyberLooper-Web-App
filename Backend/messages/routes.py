from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from messages.crud import create_message_with_ai, get_message, get_messages_by_chat, delete_message
from messages.schemas import MessageCreate, MessageResponse

router = APIRouter()

@router.post("")
def create_chat_message(message: MessageCreate, db: Session = Depends(get_db)):
    return create_message_with_ai(db, message)

# @router.post("/messages/", response_model=MessageResponse)
# def create_new_message(message: MessageCreate, db: Session = Depends(get_db)):
#     return create_message(db, message)

@router.get("/{message_id}", response_model=MessageResponse)
def read_message(message_id: int, db: Session = Depends(get_db)):
    db_message = get_message(db, message_id)
    if db_message is None:
        raise HTTPException(status_code=404, detail="Message not found")
    return db_message

# @router.get("/chats/{chat_id}", response_model=list[MessageResponse])
# def read_messages_by_chat(chat_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     return get_messages_by_chat(db, chat_id, skip, limit)

# @router.put("/{message_id}", response_model=MessageResponse)
# def update_existing_message(message_id: int, message: MessageUpdate, db: Session = Depends(get_db)):
#     updated_message = update_message(db, message_id, message)
#     if updated_message is None:
#         raise HTTPException(status_code=404, detail="Message not found")
#     return updated_message

@router.delete("/{message_id}")
def delete_existing_message(message_id: int, db: Session = Depends(get_db)):
    deleted_message = delete_message(db, message_id)
    if deleted_message is None:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"detail": "Message deleted successfully"}

@router.get("/chat/{chat_id}", response_model=list[MessageResponse])
def fetch_messages(chat_id: int, db: Session = Depends(get_db)):
    messages = get_messages_by_chat(db, chat_id)
    if not messages:
        raise HTTPException(status_code=404, detail="No messages found for this chat")
    return messages