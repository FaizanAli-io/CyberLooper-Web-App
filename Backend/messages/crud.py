from config import settings
from sqlalchemy.orm import Session
from messages.models import Message
from messages.schemas import MessageCreate
import openai
from datetime import datetime

# openai.api_key = settings.OPENAI_API_KEY

client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
#updated
def create_message_with_ai(db: Session, message: MessageCreate):
    try:
        # Step 1: Pass user message to OpenAI API (NEW SYNTAX)
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Use the GPT-4o mini model
            messages=[{"role": "user", "content": message.request}]
        )
        
        # Debugging: Print full response
        print(response)

        # # Extract AI response
        ai_response = response.choices[0].message.content  
        # ai_response = "I do not have OpenAi key"
        print(ai_response)  # Debugging: Print extracted response

        # Step 2: Store AI response in DB
        user_message = Message(
            chat_id=message.chat_id,
            request=message.request,
            response=ai_response,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.add(user_message)
        db.commit()
        db.refresh(user_message)

        return user_message

    except Exception as e:
        db.rollback()  # Rollback in case of failure
        print(f"Error: {e}")  # Debugging: Print error
        return None

#old
# def create_message_with_ai(db: Session, message: MessageCreate):
#     # Step 1: Store user message in DB
    

#     # Step 2: Pass user message to OpenAI API
#     response = openai.ChatCompletion.create(
#         model="gpt-4o-mini",  # Use the GPT-4o mini model
#         messages=[
#             {"role": "user", "content": message.request}
#         ]
#     )
#     print(response)
#     ai_response = response["choices"][0]["message"]["content"]
#     print(ai_response)
#     # ai_response = "I don't have Open AI API KEY"

#     # Step 3: Store AI response in DB
#     user_message = Message(
#         chat_id=message.chat_id,
#         request=message.request,
#         response=ai_response,
#         created_at=datetime.utcnow(),
#         updated_at=datetime.utcnow(),
#     )
#     db.add(user_message)
#     db.commit()
#     db.refresh(user_message)

#     return {"user_message": user_message}

# def create_message(db: Session, message: MessageCreate):
#     db_message = Message(**message.dict())
#     db.add(db_message)
#     db.commit()
#     db.refresh(db_message)
#     return db_message

def get_message(db: Session, message_id: int):
    return db.query(Message).filter(Message.id == message_id).first()

# def get_messages_by_chat(db: Session, chat_id: int, skip: int = 0, limit: int = 10):
#     return db.query(Message).filter(Message.chat_id == chat_id).offset(skip).limit(limit).all()

# def update_message(db: Session, message_id: int, message_update: MessageUpdate):
#     db_message = db.query(Message).filter(Message.id == message_id).first()
#     if db_message:
#         for key, value in message_update.dict(exclude_unset=True).items():
#             setattr(db_message, key, value)
#         db.commit()
#         db.refresh(db_message)
#     return db_message

def delete_message(db: Session, message_id: int):
    db_message = db.query(Message).filter(Message.id == message_id).first()
    if db_message:
        db.delete(db_message)
        db.commit()
    return db_message

def get_messages_by_chat(db: Session, chat_id: int):
    return db.query(Message).filter(Message.chat_id == chat_id).all()