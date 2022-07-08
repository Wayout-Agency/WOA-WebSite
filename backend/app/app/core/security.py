from enum import Enum
from time import time
from typing import TypedDict

from crud.crud_user import user
from jose import JWTError, jwt
from passlib.hash import bcrypt
from schemas.auth import OAuth2Schema
from schemas.token import TokenPair

from .config import get_settings
from .errors import Errors

settings = get_settings()


class TokenType(Enum):
    access = "access"
    refresh = "refresh"


class Payload(TypedDict):
    expire: float
    token_type: TokenType


async def authenticate_user(data: OAuth2Schema):
    userdata = await user.get_by_login(login=data.login)
    if not _verify_password(data.password, userdata.password):
        raise Errors.credentials


def create_token(token_type: TokenType) -> str:
    match token_type:
        case TokenType.access:
            expire_seconds = settings.ACCESS_TOKEN_EXPIRE_MINUTES
        case TokenType.refresh:
            expire_seconds = settings.REFRESH_TOKEN_EXPIRE_MINUTES
    payload = Payload(expire=time() + expire_seconds, token_type=token_type.value)
    return jwt.encode(payload, settings.SECRET_KEY, settings.ALGORITHM)


def verify_token(token: str, token_type: TokenType):
    try:
        payload: Payload = jwt.decode(token, settings.SECRET_KEY, settings.ALGORITHM)
        if payload["expire"] < time() or token_type.value != payload["token_type"]:
            raise Errors.out_token
    except JWTError:
        raise Errors.inv_token


def create_new_pair() -> TokenPair:
    expire = time() + settings.ACCESS_TOKEN_EXPIRE_MINUTES
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
