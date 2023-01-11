from enum import Enum

from api.deps import email_client
from core.config import get_settings
from fastapi import APIRouter, Depends
from fastapi_mail import FastMail, MessageSchema, MessageType
from schemas.email import EmailSchema

router = APIRouter()

settings = get_settings()


class EmailType(Enum):
    feedbackOrder = "feedback-order"
    feedback = "feedback"
    offer = "offer"


emails_to = {
    EmailType.feedbackOrder: settings.FEEDBACK_ORDER_EMAIL,
    EmailType.feedback: settings.FEEDBACK_EMAIL,
    EmailType.offer: settings.OFFER_EMAIL,
}


@router.post(
    "/{email_type}/",
)
async def send_email(
    email_type: EmailType, data: EmailSchema, email_client: FastMail = Depends(email_client)
):
    message = MessageSchema(
        subject=email_type.value,
        recipients=[emails_to[email_type]],
        body="\n".join([f"{key}: {value}" for key, value in dict(data.email).items()]),
        subtype=MessageType.plain      
    )
    await email_client.send_message(message)
    return {"message": "Email has been sent"}
