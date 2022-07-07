from core.security import authenticate_user, create_new_pair, verify_token
from crud.crud_token import token
from fastapi import APIRouter
from schemas.token import Token, TokenPair
from schemas.user import User

router = APIRouter()


@router.post("/", response_model=TokenPair)
async def get_token(schema: User):
    await authenticate_user(schema)
    pair = create_new_pair()
    token.create_or_update(pair.refresh)
    return pair


@router.put("/", response_model=TokenPair)
async def update_token(schema: Token):
    verify_token(schema.value)
    pair = create_new_pair()
    token.create_or_update(schema.value, pair.refresh)
    return pair
