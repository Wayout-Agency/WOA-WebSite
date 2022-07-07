from datetime import datetime, timedelta
from enum import Enum
from typing import TypedDict

from crud.crud_user import user
from fastapi import HTTPException, status
from jose import JWTError, jwt
from passlib.hash import bcrypt
from schemas.token import TokenPair
from schemas.user import User

from .config import get_settings

settings = get_settings()


class Payload(TypedDict):
    expire: int


async def authenticate_user(schema: User):
    userdata = await user.get_by_login(login=schema.login)
    if not _verify_password(schema.password, userdata.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )


class TokenType(Enum):
    access = "access"
    refresh = "refresh"


def create_token(token_type: TokenType) -> str:
    match token_type:
        case TokenType.access:
            expire_minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES
        case TokenType.refresh:
            expire_minutes = settings.REFRESH_TOKEN_EXPIRE_MINUTES
    payload = Payload(expire=datetime.utcnow() + timedelta(minutes=expire_minutes))
    return jwt.encode(payload, settings.SECRET_KEY, settings.ALGORITHM)


def verify_token(token: str):
    try:
        payload: Payload = jwt.decode(token, settings.SECRET_KEY, settings.ALGORITHM)
        if payload["expire"] < datetime.utcnow():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Outdated token",
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )


def create_new_pair() -> TokenPair:
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return TokenPair(
        access=create_token(TokenType.access),
        refresh=(create_token(TokenType.refresh)),
        expire=expire,
    )


hashed_password: str
plain_password: str


def get_password_hash(plain_password) -> str:
    return bcrypt.hash(plain_password)


def _verify_password(plain_password, hashed_password) -> bool:
    return bcrypt.verify(plain_password, hashed_password)
