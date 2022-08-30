from typing import Optional

from core.config import get_settings
from core.errors import Errors
from core.security import TokenType, verify_token
from fastapi import Header
from fastapi_mail import ConnectionConfig, FastMail
from fastapi_mail.errors import ConnectionErrors


def check_root_user(authorization: Optional[str] = Header(None)):
    if authorization:
        verify_token(authorization.split(" ")[1], TokenType.access)
    else:
        raise Errors.forbidden


def email_client():
    settings = get_settings()
    return FastMail(
        ConnectionConfig(
            MAIL_USERNAME=settings.SMTP_USER,
            MAIL_PASSWORD=settings.SMTP_PASSWORD,
            MAIL_FROM=settings.FROM_EMAIL,
            MAIL_PORT=settings.SMTP_PORT,
            MAIL_SERVER=settings.SMTP_HOST,
            MAIL_FROM_NAME=settings.FROM_NAME,
            MAIL_TLS=True,
            MAIL_SSL=False,
            USE_CREDENTIALS=True,
            VALIDATE_CERTS=True,
        )
    )
