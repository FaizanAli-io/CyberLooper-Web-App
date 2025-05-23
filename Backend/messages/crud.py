import openai

from config import settings
from dotenv import load_dotenv
from fastapi import HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone

from langchain.docstore.document import Document
from langchain_openai.chat_models import ChatOpenAI
from langchain.chains.summarize import load_summarize_chain
from langchain_community.callbacks.manager import get_openai_callback

from messages.models import Message
from chats.crud import get_chat_summary
from messages.schemas import MessageCreate, MessagePair

load_dotenv()


chat = openai.OpenAI(
    api_key=settings.OPENAI_API_KEY,
)

grok = openai.OpenAI(
    api_key=settings.XAI_API_KEY,
    base_url="https://api.x.ai/v1",
)

llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0)
summary_chain = load_summarize_chain(llm, chain_type="stuff")


class LLMResponseError(Exception):
    pass


def get_llm_response(model: str, message: str, system: str) -> tuple[str, int]:
    client = grok if model == "grok" else chat
    model_name = "grok-3-beta" if model == "grok" else "gpt-4o-mini"

    try:
        response = client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": message},
            ],
        )
        print(f"[{model_name}]: {response}")
        print("Message Tokens:", response.usage.total_tokens)
        return response.choices[0].message.content, response.usage.total_tokens
    except Exception as e:
        print(f"Error while calling {model_name} API: {e}")
        raise LLMResponseError(str(e))


def create_message_with_ai(db: Session, message: MessageCreate, message_context: str):
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

        context_parts = [
            f"The user's role is: {message.user_role}" if message.user_role else "",
            (
                f"The user works in the {message.department} department"
                if message.department
                else ""
            ),
            (
                f"When writing code, prefer {message.language} unless specified otherwise"
                if message.language
                else ""
            ),
        ]

        if any(context_parts):
            system_message += "\n\n**Notes**:\n" + "\n".join(
                filter(None, context_parts)
            )

        if message_context:
            system_message += (
                "\nThe following is a summary of the previous conversation to maintain context:\n"
                + message_context
            )

        try:
            response, tokens = get_llm_response(
                message.model, message.request, system_message
            )
        except LLMResponseError as e:
            return {"error": f"LLM call failed: {e}"}, 0

        user_message = Message(
            response=response,
            chat_id=message.chat_id,
            request=message.request,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc),
        )

        db.add(user_message)
        db.commit()
        db.refresh(user_message)

        return user_message, tokens

    except Exception as e:
        db.rollback()
        print(f"DB Error: {e}")
        return {"error": "Internal server error"}, 0


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


def get_last_n_message_pairs(
    db: Session, chat_id: int, n: int = 5
) -> list[MessagePair]:
    rows = (
        db.query(Message.request, Message.response)
        .filter(Message.chat_id == chat_id)
        .order_by(Message.created_at.desc())
        .limit(n)
        .all()
    )[::-1]

    return [MessagePair(user=row.request, ai=row.response) for row in rows]


def summarize_conversation(messages: list[MessagePair]) -> str:
    if not messages:
        return ""

    conversation_text = "\n".join(f"User: {m.user}\nAI: {m.ai}" for m in messages)

    doc = Document(page_content=conversation_text)
    summary = summary_chain.run([doc])
    return summary


def summarize_conversation_incremental(
    messages: list[MessagePair], previous_summary: str
) -> tuple[str, int]:
    if not messages:
        return previous_summary, 0

    last_message = messages[-1]
    new_content = (
        f"Previous Summary:\n{previous_summary}\n\n"
        f"New Message:\nUser: {last_message.user}\nAI: {last_message.ai}"
    )

    doc = Document(page_content=new_content)

    with get_openai_callback() as cb:
        updated_summary = summary_chain.run([doc])
        print(f"Final Summary -> {updated_summary}")
        token_usage = cb.total_tokens

    return updated_summary, token_usage


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
    now = datetime.now(timezone("Asia/Karachi"))
    midnight = (now + timedelta(days=1)).replace(
        hour=0, minute=0, second=0, microsecond=0
    )

    delta = midnight - now
    return (
        divmod(delta.seconds, 3600)[0],
        divmod(delta.seconds % 3600, 60)[0],
    )


def delete_last_message(db: Session, chat_id: int):
    last_message = (
        db.query(Message)
        .filter(Message.chat_id == chat_id)
        .order_by(Message.created_at.desc())
        .first()
    )

    if not last_message:
        return False

    db.delete(last_message)
    db.commit()

    return True
