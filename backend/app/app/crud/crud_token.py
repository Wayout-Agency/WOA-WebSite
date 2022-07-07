from typing import Optional

from crud.base import CRUDBase
from models.tokens import GetToken, Token
from schemas.token import Token


class CRUDtoken(CRUDBase):
    def __init__(self, model: Token) -> None:
        self.model = model

    async def create_or_update(self, value: str, new_value: Optional[str]) -> Token:
        try:
            token = await self.model.filter(value=value).update(value=new_value)
        except:
            token = await self.model.create(value)
        return await GetToken.from_tortoise_orm(token)


token = CRUDtoken(Token)
