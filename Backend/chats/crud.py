from sqlalchemy.orm import Session
from chats.models import Chat
from chats.schemas import ChatCreate, ChatUpdate

def create_chat(db: Session, chat_data: ChatCreate):
    chat = Chat(user_id=chat_data.user_id, topic=chat_data.topic)
    db.add(chat)
    db.commit()
    db.refresh(chat)
    return chat

def get_chat(db: Session, chat_id: int):
    return db.query(Chat).filter(Chat.id == chat_id).first()

# def get_chats(db: Session, skip: int = 0, limit: int = 10):
#     return db.query(Chat).offset(skip).limit(limit).all()

def update_chat(db: Session, chat_id: int, chat_data: ChatUpdate):
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if chat:
        if chat_data.topic is not None:
            chat.topic = chat_data.topic
        db.commit()
        db.refresh(chat)
    return chat

def delete_chat(db: Session, chat_id: int):
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if chat:
        db.delete(chat)
        db.commit()
    return chat

def get_chats_by_user(db: Session, user_id: int):
    return db.query(Chat).filter(Chat.user_id == user_id).all()