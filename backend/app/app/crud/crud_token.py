from core.errors import Errors
from crud.base import CRUDBase
from models.tokens import GetToken, Token
from schemas.token import TokenBase
from tortoise.exceptions import DoesNotExist, ValidationError


class CRUDtoken(CRUDBase):
    def __init__(self, model: Token) -> None:
        self.model = model

    async def create(self, owner: str, value: str) -> TokenBase:
        try:
            await self.model.filter(owner=owner).delete()
            token = await self.model.create(owner=owner, value=value)
            return await GetToken.from_tortoise_orm(token)
        except ValidationError:
            raise Errors.valid_error

    async def update(self, value: str, new_value: str) -> TokenBase:
        try:
            await self.model.get(value=value)
            await self.model.filter(value=value).update(value=new_value)
            return TokenBase(value=new_value)
        except DoesNotExist:
            raise Errors.out_token

    async def delete(self, value: str) -> TokenBase:
        token = await self.model.filter(value=value).delete()
        return await GetToken.from_tortoise_orm(token)


token = CRUDtoken(Token)
