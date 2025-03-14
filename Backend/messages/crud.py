from config import settings
from sqlalchemy.orm import Session
from messages.models import Message
from messages.schemas import MessageCreate
import openai
from datetime import datetime

# Initialize OpenAI client
client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)


def get_ai_response(message: str) -> str:
    """Generate a response from OpenAI API with specific role instructions."""
    try:
        # Defining the role and behavior of the AI
        system_message = (
            "You are CyberLooper AI. "
            "You are a corporate-style GPT. "
            "You can only respond to appropriate and professional conversation. "
            "Refrain from answering any questions containing a sensitive or inappropriate topic "
            "(such as insults, violence, hate speech, discrimination, explicit content, etc.)."
        )

        # API call to OpenAI with system message
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Use the GPT-4o mini model
            messages=[
                {"role": "system", "content": system_message},  # Role instruction
                {"role": "user", "content": message},  # User's message
            ],
        )

        # Return AI's response
        return response.choices[0].message.content

    except Exception as e:
        print(f"Error while calling OpenAI API: {e}")
        return "Sorry, I couldn't generate a response."


def create_message_with_ai(db: Session, message: MessageCreate):
    """Create a new message with AI response, store it in DB."""
    try:
        ai_response = get_ai_response(message.request)
        print(ai_response)  # Debugging: Print AI response

        # Store the user message and AI response in the DB
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


def get_message(db: Session, message_id: int) -> Message:
    """Retrieve a message from the DB by ID."""
    return db.query(Message).filter(Message.id == message_id).first()


def delete_message(db: Session, message_id: int) -> Message:
    """Delete a message from the DB by ID."""
    db_message = db.query(Message).filter(Message.id == message_id).first()
    if db_message:
        db.delete(db_message)
        db.commit()
    return db_message


def get_messages_by_chat(db: Session, chat_id: int) -> list:
    """Retrieve all messages for a specific chat."""
    return db.query(Message).filter(Message.chat_id == chat_id).all()
