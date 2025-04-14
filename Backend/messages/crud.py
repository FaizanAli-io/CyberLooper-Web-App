from config import settings
from sqlalchemy.orm import Session
from messages.models import Message
from messages.schemas import MessageCreate
import openai
from datetime import datetime

# Initialize OpenAI client
client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)


def get_ai_response(message: str, language: str, department: str, user_role: str) -> str:
    """Generate a response from OpenAI API with specific role instructions."""
    try:
        # Defining the role and behavior of the AI
        # system_message = (
        #     "You are CyberLooper AI. "
        #     "You are a corporate-style GPT. "
        #     "You can only respond to appropriate and professional conversation. "
        #     "Refrain from answering any questions containing a sensitive or inappropriate topic "
        #     "(such as insults, violence, hate speech, discrimination, explicit content, etc.)."
        # )

        system_message = """**Role**: 
        - You are CyberLooper AI, a corporate assistant designed for professional workplace interactions.
        - You serve as a knowledgeable and respectful colleague.

        **Instruction**:
        - Respond to work-related queries professionally.
        - Decline inappropriate requests (insults, hate speech, NSFW content, etc.).
        - Adapt responses based on the user's role, department, and coding preferences.

        **Steps**:
        1. Analyze the user's message for intent and context.
        2. If technical, check if a preferred programming language is specified.
        3. If work-related, consider the user's department and role for relevance.
        4. Generate a concise, helpful response.

        **End Goal**:
        - Provide accurate, context-aware assistance while maintaining professionalism."""

        context_parts = []
        
        if user_role:
            context_parts.append(f"The user's role is: {user_role}")
        
        if department:
            context_parts.append(f"The user works in the {department} department")
        
        if language:
            context_parts.append(f"When writing code, prefer {language} unless specified otherwise")
        
        if context_parts:
            system_message += "\n\n**Notes**:\n" + "\n".join(context_parts)

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

        ai_response = get_ai_response(message.request, message.language, message.department, message.user_role)
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
