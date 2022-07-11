from core.security import TokenType, authenticate_user, create_new_pair, verify_token
from crud.crud_token import token
from fastapi import APIRouter, Request
from schemas.auth import OAuth2Schema
from schemas.token import TokenBase, TokenPair
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
router = APIRouter()


@router.post("/", response_model=TokenPair)
@limiter.limit("10/hour")
async def get_token(data: OAuth2Schema, request: Request):
    await authenticate_user(data)
    pair = create_new_pair()
    await token.create(pair.refresh)
    return pair


@router.post("/refresh/", response_model=TokenPair)
async def update_token(schema: TokenBase):
    verify_token(schema.value, TokenType.refresh)
    pair = create_new_pair()
    await token.update(schema.value, pair.refresh)
    return pair
