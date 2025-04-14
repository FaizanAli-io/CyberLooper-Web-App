from sqlalchemy.orm import Session
from contactform.models import ContactForm
from contactform.schemas import ContactFormCreate, ContactFormResponse
from sqlalchemy.orm import joinedload

import os
from email.message import EmailMessage
import smtplib
from dotenv import load_dotenv

# Load .env values
load_dotenv()

sender_email = os.getenv("SENDER_EMAIL")
sender_password = os.getenv("SENDER_PASSWORD")

def send_ack_email(recipient_email: str, message: str):
    if not sender_email or not sender_password:
        raise RuntimeError("Email credentials not set in environment variables.")

    subject = "Cyberlooper - We’ve received your message"
    body = f"""
    Hello,

    Thank you for contacting us. We've received your message:

    "{message}"

    Our team will review it and get back to you shortly.

    Best regards,
    Support Team
    """

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = recipient_email
    msg.set_content(body)

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(sender_email, sender_password)
            smtp.send_message(msg)
            print("✅ Acknowledgment email sent")
    except Exception as e:
        print(f"❌ Failed to send email: {e}")


def create_contactform(db: Session, contactform: ContactFormCreate, current_user):
    contact = ContactForm(
        user_id=current_user.id,
        message=contactform.message
    )
    db.add(contact)
    db.commit()
    db.refresh(contact)

    send_ack_email(current_user.email, contact.message)

    return ContactFormResponse(
        id=contact.id,
        message=contact.message,
        email=current_user.email,  # Inject email from user
        created_at=contact.created_at,
        updated_at=contact.updated_at,
    )

def get_all_contactforms(db: Session):
    contactforms = db.query(ContactForm).options(joinedload(ContactForm.user)).all()

    response = [
        ContactFormResponse(
            id=cf.id,
            message=cf.message,
            email=cf.user.email,
            created_at=cf.created_at,
            updated_at=cf.updated_at,
        )
        for cf in contactforms
    ]
    return response