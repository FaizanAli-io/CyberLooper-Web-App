from config import settings
from sqlalchemy.orm import Session
from messages.models import Message
from messages.schemas import MessageCreate
import openai
from datetime import datetime

import os
from dotenv import load_dotenv

load_dotenv()

XAI_API_KEY = os.getenv("XAI_API_KEY")

gpt = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

grok = openai.OpenAI(
  api_key=XAI_API_KEY,
  base_url="https://api.x.ai/v1",
)

def get_grok_response(message: str, system_message: str) -> str:
    try:
        print("grok")
        # API call to OpenAI with system message
        response = grok.chat.completions.create(
            model="grok-3-beta",  # Use the GPT-4o mini model
            messages=[
                {"role": "system", "content": system_message},  # Role instruction
                {"role": "user", "content": message},  # User's message
            ],
        )

        print(response)

        print("total tokens", response.usage.total_tokens)

        # Return AI's response
        return response.choices[0].message.content, response.usage.total_tokens

    except Exception as e:
        print(f"Error while calling OpenAI API: {e}")
        return "Sorry, I couldn't generate a response."

def get_gpt_response(message: str, system_message: str) -> str:
    try:
        # API call to OpenAI with system message
        response = gpt.chat.completions.create(
            model="gpt-4o-mini",  # Use the GPT-4o mini model
            messages=[
                {"role": "system", "content": system_message},  # Role instruction
                {"role": "user", "content": message},  # User's message
            ],
        )

        print(response)

        print("total tokens", response.usage.total_tokens)
        
        return response.choices[0].message.content, response.usage.total_tokens

    except Exception as e:
        print(f"Error while calling OpenAI API: {e}")
        return "Sorry, I couldn't generate a response."


def create_message_with_ai(db: Session, message: MessageCreate, model:str, message_context: list[str] ):
    """Create a new message with AI response, store it in DB."""
    try:
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
        
        if message.user_role:
            context_parts.append(f"The user's role is: {message.user_role}")
        
        if message.department:
            context_parts.append(f"The user works in the {message.department} department")
        
        if message.language:
            context_parts.append(f"When writing code, prefer {message.language} unless specified otherwise")
        
        if context_parts:
            system_message += "\n\n**Notes**:\n" + "\n".join(context_parts)

        context = ""
        if message_context:
            context = "The following are the user's previous messages to help maintain conversation context:\n"
            for i, msg in enumerate(message_context, start=1):
                context += f"{i} - {msg}\n"
        if context != "":
            system_message+=context

        if model=="grok":
            ai_response = get_grok_response(message.request, system_message)
        else:
            ai_response = get_gpt_response(message.request, system_message)
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

def get_last_n_messages_by_chat(db: Session, chat_id: int, n: int = 6) -> list:
    return (
        db.query(Message)
        .filter(Message.chat_id == chat_id)
        .order_by(Message.created_at.desc())  # newest first
        .limit(n)
        .all()
    )[::-1]  # reverse to restore chronological order