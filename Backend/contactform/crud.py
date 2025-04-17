from sqlalchemy.orm import Session
from contactform.models import ContactForm
from contactform.schemas import ContactFormCreate, ContactFormResponse
from sqlalchemy.orm import joinedload
from utilities.email import send_email

def send_ack_email(recipient_email: str, message: str):

    subject = "Cyberlooper - We’ve received your message"
    body = f"""
    Hello,

    Thank you for contacting us. We've received your message:

    "{message}"

    Our team will review it and get back to you shortly.

    Best regards,
    Support Team
    """

    try:
        send_email(recipient_email, subject, body)
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