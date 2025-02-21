from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from messages.crud import create_message_with_ai, get_message, get_messages_by_chat, delete_message
from messages.schemas import MessageCreate, MessageResponse
from chats.models import Chat
from datetime import datetime

router = APIRouter()


@router.post("/", response_model=MessageResponse)  # ✅ Returns correct schema
def send_message(message_data: MessageCreate, db: Session = Depends(get_db)):
    """Handle user message, create chat if necessary, and return AI response."""
    user_id = message_data.user_id
    chat_id = message_data.chat_id
    request_text = message_data.request

    if not user_id or not request_text:
        raise HTTPException(status_code=400, detail="User ID and request text are required.")

    # ✅ If no chat_id, create a new chat
    if not chat_id:
        new_chat = Chat(user_id=user_id, topic=request_text[:30], created_at=datetime.utcnow())
        db.add(new_chat)
        db.commit()
        db.refresh(new_chat)
        chat_id = new_chat.id  # Assign the new chat_id

    # ✅ Generate AI response and store message
    saved_message = create_message_with_ai(
        db, MessageCreate(user_id=user_id, chat_id=chat_id, request=request_text)
    )

    if not saved_message:
        raise HTTPException(status_code=500, detail="Failed to generate AI response.")

    # ✅ Return the response in `MessageResponse` format
    return MessageResponse(
        id=saved_message.id,
        chat_id=saved_message.chat_id,
        request=saved_message.request,
        response=saved_message.response,
        created_at=saved_message.created_at,
        updated_at=saved_message.updated_at
    )


# @router.post("", response_model=MessageResponse)
# def create_chat_message(message: MessageCreate, db: Session = Depends(get_db)):
#     msg = create_message_with_ai(db, message)
#     if msg is None:
#         raise HTTPException(status_code=404, detail="Could not get OpenAI response")
#     return msg

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