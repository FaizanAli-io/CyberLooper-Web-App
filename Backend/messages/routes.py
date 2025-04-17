from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from messages.crud import (
    create_message_with_ai,
    get_message,
    get_messages_by_chat,
    delete_message,
    get_last_n_messages_by_chat,
)
from messages.schemas import MessageCreate, MessageResponse, SwitchModel
from chats.models import Chat
from datetime import datetime
from users.auth import get_current_user
from users.models import User
from chats.crud import get_chat

import os
from dotenv import load_dotenv
load_dotenv()
TOKEN_LIMIT = int(os.getenv("TOKEN_LIMIT"))

router = APIRouter()

@router.post("/switchmodel", response_model=MessageResponse)  # ✅ Returns correct schema
def send_message(
    message_data: SwitchModel,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Handle user message, create chat if necessary, and return AI response."""
    user_id = current_user.id
    chat_id = message_data.chat_id
    user_role = message_data.user_role
    department = message_data.department
    language = message_data.language
    old_chat = get_chat(db, chat_id)
    if old_chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    if old_chat.user_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to access this chat"
        )
    model_name = "gpt"
    if old_chat.model == "gpt":
        model_name = "grok"

    messages = get_last_n_messages_by_chat(db, chat_id)

    request_text = messages[-1].request if messages else ""
    message_context = [msg.request for msg in messages[:-1]]

    if not user_id or not request_text:
        raise HTTPException(
            status_code=400, detail="User ID and request text are required."
        )

    if current_user.token_used >= TOKEN_LIMIT:
        raise HTTPException(
            status_code=400, detail="Token limit reached. Limit will be reset at midnight."
        )

    new_chat = Chat(
        user_id=user_id, topic=request_text[:30], created_at=datetime.utcnow(), model=model_name
    )
    db.add(new_chat)
    db.commit()
    db.refresh(new_chat)
    chat_id = new_chat.id  # Assign the new chat_id

    db_chat = get_chat(db, chat_id)
    if db_chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    if db_chat.user_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to access this chat"
        )
    model = db_chat.model
    # ✅ Generate AI response and store message
    saved_message, tokens = create_message_with_ai(
        db, MessageCreate(user_id=user_id, chat_id=chat_id, request=request_text, user_role=user_role, department=department,language=language), model, message_context
    )

    if not saved_message:
        raise HTTPException(status_code=500, detail="Failed to generate AI response.")

    current_user.token_used += tokens
    db.commit()
    db.refresh(current_user)

    # ✅ Return the response in `MessageResponse` format
    return MessageResponse(
        id=saved_message.id,
        chat_id=saved_message.chat_id,
        request=saved_message.request,
        response=saved_message.response,
        created_at=saved_message.created_at,
        updated_at=saved_message.updated_at,
    )

@router.post("", response_model=MessageResponse)  # ✅ Returns correct schema
def send_message(
    message_data: MessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Handle user message, create chat if necessary, and return AI response."""
    user_id = current_user.id
    chat_id = message_data.chat_id
    request_text = message_data.request
    user_role = message_data.user_role
    department = message_data.department
    language = message_data.language

    if not user_id or not request_text:
        raise HTTPException(
            status_code=400, detail="User ID and request text are required."
        )

    if current_user.token_used >= TOKEN_LIMIT:
        raise HTTPException(
            status_code=400, detail="Token limit reached. Limit will be reset at midnight."
        )

    # ✅ If no chat_id, create a new chat
    if not chat_id:
        new_chat = Chat(
            user_id=user_id, topic=request_text[:30], created_at=datetime.utcnow(), model=message_data.model
        )
        db.add(new_chat)
        db.commit()
        db.refresh(new_chat)
        chat_id = new_chat.id  # Assign the new chat_id

    db_chat = get_chat(db, chat_id)
    if db_chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    if db_chat.user_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to access this chat"
        )
    model = db_chat.model
    message_context = get_last_n_messages_by_chat(db, chat_id, 5)
    # ✅ Generate AI response and store message
    saved_message, tokens = create_message_with_ai(
        db, MessageCreate(user_id=user_id, chat_id=chat_id, request=request_text, user_role=user_role, department=department,language=language), model, message_context
    )

    if not saved_message:
        raise HTTPException(status_code=500, detail="Failed to generate AI response.")

    current_user.token_used += tokens
    db.commit()
    db.refresh(current_user)

    # ✅ Return the response in `MessageResponse` format
    return MessageResponse(
        id=saved_message.id,
        chat_id=saved_message.chat_id,
        request=saved_message.request,
        response=saved_message.response,
        created_at=saved_message.created_at,
        updated_at=saved_message.updated_at,
    )

@router.get("/{message_id}", response_model=MessageResponse)
def read_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_message = get_message(db, message_id)
    if db_message is None:
        raise HTTPException(status_code=404, detail="Message not found")

    db_chat = get_chat(db, db_message.chat_id)
    if db_chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    if db_chat.user_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to access this chat"
        )

    return db_message

@router.delete("/{message_id}")
def delete_existing_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_message = get_message(db, message_id)
    if db_message is None:
        raise HTTPException(status_code=404, detail="Message not found")

    db_chat = get_chat(db, db_message.chat_id)
    if db_chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    if db_chat.user_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to access this chat"
        )

    deleted_message = delete_message(db, message_id)
    if deleted_message is None:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"detail": "Message deleted successfully"}


@router.get("/chat/{chat_id}", response_model=list[MessageResponse])
def fetch_messages(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_chat = get_chat(db, chat_id)
    if db_chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    if db_chat.user_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to access this chat"
        )
    messages = get_messages_by_chat(db, chat_id)
    if not messages:
        raise HTTPException(status_code=404, detail="No messages found for this chat")
    return messages
