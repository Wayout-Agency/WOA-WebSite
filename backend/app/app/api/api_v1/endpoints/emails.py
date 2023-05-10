from enum import Enum

from api.deps import email_client
from core.config import get_settings
from core.alerts import alert
from fastapi import APIRouter, Depends
from fastapi_mail import FastMail, MessageSchema, MessageType
from schemas.email import EmailSchema
from logging import Logger

router = APIRouter()
logger = Logger(__name__)
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
    mail_body = "\n".join([f"{key}: {value}" for key, value in dict(data.email).items()]).title()
    message = MessageSchema(
        subject=email_type.value,
        recipients=[emails_to[email_type]],
        body=mail_body,
        subtype=MessageType.plain,
    )
    try:
        await email_client.send_message(message)
    except Exception as error:
        logger.error(error)
        await alert(f"{mail_body}\n\nError: {error}")
