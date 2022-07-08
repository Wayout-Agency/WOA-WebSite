from core.security import TokenType, authenticate_user, create_new_pair, verify_token
from crud.crud_token import token
from fastapi import APIRouter
from schemas.auth import OAuth2Schema
from schemas.token import TokenBase, TokenPair

router = APIRouter()


@router.post("/", response_model=TokenPair)
async def get_token(data: OAuth2Schema):
    await authenticate_user(data)
    pair = create_new_pair()
    await token.create(pair.refresh)
    return pair


@router.put("/", response_model=TokenPair)
async def update_token(schema: TokenBase):
    verify_token(schema.value, TokenType.refresh)
    pair = create_new_pair()
    await token.update(schema.value, pair.refresh)
    return pair
