from typing import Optional

from core.errors import Errors
from core.security import TokenType, verify_token
from fastapi import Header


def check_root_user(authorization: Optional[str] = Header(None)):
    if authorization:
        verify_token(authorization.split(" ")[1], TokenType.access)
    else:
        raise Errors.forbidden
