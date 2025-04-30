# from langchain.chat_models import ChatOpenAI
from langchain.chains.summarize import load_summarize_chain
from langchain.docstore.document import Document
# from langchain.callbacks import get_openai_callback

from langchain_community.chat_models import ChatOpenAI
from langchain_community.callbacks.manager import get_openai_callback

from fastapi import HTTPException
from config import settings
from sqlalchemy.orm import Session
from messages.models import Message
from messages.schemas import MessageCreate, MessagePair
from chats.crud import get_chat_summary
import openai
from datetime import datetime, timedelta
from pytz import timezone
import os
from dotenv import load_dotenv

load_dotenv()

XAI_API_KEY = os.getenv("XAI_API_KEY")

gpt = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

grok = openai.OpenAI(
  api_key=XAI_API_KEY,
  base_url="https://api.x.ai/v1",
)

llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0)
summary_chain = load_summarize_chain(llm, chain_type="stuff")

def get_grok_response(message: str, system_message: str) -> str:
    try:
        print("\ngrok\n")
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


def create_message_with_ai(db: Session, message: MessageCreate, message_context: str ):
    """Create a new message with AI response, store it in DB."""
    try:
        system_message = """**Role**: 
        - You are CyberLooper AI, a corporate assistant designed for professional workplace interactions.
        - You serve as a knowledgeable and respectful colleague.

        **Instruction**:
        - Respond to work-related queries professionally.
        - Decline inappropriate requests (insults, hate speech, NSFW content, sex, nudity, intimacy etc.).
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
            context = "The following is a summary of the previous conversation to maintain context:\n"
            context += message_context
        if context != "":
            system_message+=context

        print(system_message)
        
        tokens = 0

        if message.model=="grok":
            ai_response, tokens = get_grok_response(message.request, system_message)
        else:
            ai_response, tokens = get_gpt_response(message.request, system_message)
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

        return user_message, tokens

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

def get_last_n_message_pairs(db: Session, chat_id: int, n: int = 5) -> list[MessagePair]:
    rows = (
        db.query(Message.request, Message.response)
        .filter(Message.chat_id == chat_id)
        .order_by(Message.created_at.desc())
        .limit(n)
        .all()
    )[::-1]  # Reverse to chronological order

    return [MessagePair(user=row.request, ai=row.response) for row in rows]

def summarize_conversation(messages: list[MessagePair]) -> str:
    if not messages:
        return ""

    conversation_text = "\n".join(
        f"User: {m.user}\nAI: {m.ai}" for m in messages
    )

    doc = Document(page_content=conversation_text)
    summary = summary_chain.run([doc])
    return summary

def summarize_conversation_incremental(messages: list[MessagePair], previous_summary: str) -> tuple[str, int]:
    if not messages:
        return previous_summary, 0

    last_message = messages[-1]
    new_content = (
        f"Previous Summary:\n{previous_summary}\n\n"
        f"New Message:\nUser: {last_message.user}\nAI: {last_message.ai}"
    )

    doc = Document(page_content=new_content)

    # Optional: Get token usage
    # from langchain.callbacks import get_openai_callback

    with get_openai_callback() as cb:
        # updated_summary = summary_chain.invoke({"input_documents": [doc]})
        updated_summary = summary_chain.run([doc])

        # print(updated_summary)
        # updated_summary = updated_summary['output_text']
        print(f"Final Summary -> {updated_summary}")
        token_usage = cb.total_tokens

    print(token_usage)

    return updated_summary, token_usage


# def summarize_conversation_incremental(messages: list[MessagePair], previous_summary: str) -> str:
#     if not messages:
#         return previous_summary

#     # Get the last message pair
#     last_message = messages[-1]
#     new_content = f"Previous Summary:\n{previous_summary}\n\nNew Message:\nUser: {last_message.user}\nAI: {last_message.ai}"

#     # Create a Document with the combined content
#     doc = Document(page_content=new_content)

#     # Generate updated summary
#     response = summary_chain.invoke({"input_documents": [doc]}, return_only_outputs=False)

#     print(response)

#     updated_summary = response['output']
#     token_usage = response['llm_output']['token_usage']['total_tokens']

#     print(f"updated_summary -> {updated_summary}")
#     print(f"token_usage -> {token_usage}")

#     return updated_summary, token_usage


def get_summary_from_db_chat(db: Session, chat_id: int, n: int = 5) -> str:
    messages = get_last_n_message_pairs(db, chat_id, n)
    return summarize_conversation(messages)

def get_summary(db: Session, chat_id: int) -> str:
    messages = get_last_n_message_pairs(db, chat_id, 1)
    summary = get_chat_summary(db, chat_id)
    summary, token = summarize_conversation_incremental(messages, summary)
    return summary, token

def get_last_user_message_by_chat(db: Session, chat_id: int) -> str:
    row = (
        db.query(Message.request)
        .filter(Message.chat_id == chat_id)
        .order_by(Message.created_at.desc())
        .first()
    )

    if row and row.request:
        return row.request

    raise HTTPException(status_code=404, detail="No messages found for this chat.")

def time_until_midnight_karachi():
    # Define the Asia/Karachi timezone
    karachi_tz = timezone('Asia/Karachi')
    
    # Get current time in UTC and convert it to Asia/Karachi time zone
    now = datetime.now(karachi_tz)
    
    # Define midnight (00:00) of the current day in Asia/Karachi timezone
    midnight = now.replace(hour=0, minute=0, second=0, microsecond=0) + timedelta(days=1)
    
    # Calculate the time difference
    time_difference = midnight - now

    hours, remainder = divmod(time_difference.seconds, 3600)
    minutes, _ = divmod(remainder, 60)
    
    return hours, minutes

def delete_last_message(db: Session, chat_id: int):
    last_message = (
        db.query(Message)
        .filter(Message.chat_id == chat_id)
        .order_by(Message.created_at.desc())
        .first()
    )

    if not last_message:
        return False  # Nothing to delete

    db.delete(last_message)
    db.commit()
    return True