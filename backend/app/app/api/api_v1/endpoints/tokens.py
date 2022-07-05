from fastapi import APIRouter
from crud.crud_user import user
from schemas.user import User
from schemas.token import Token

router = APIRouter()


@router.post("/", response_model=Token)
async def get_token(schema: User):
    pass
