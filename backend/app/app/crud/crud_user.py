from crud.base import CRUDBase
from models.users import GetUser, User
from schemas.user import CreateUser, DeleteUser, UserBase


class CRUDUser(CRUDBase):
    def __init__(self, model: User) -> None:
        self.model = model

    async def create(self, schema: CreateUser) -> UserBase:
        user = await self.model.create(**schema.dict())
        return await GetUser.from_tortoise_orm(user)

    async def get_by_login(self, login: str) -> UserBase:
        user = await self.model.get_or_none(login=login)
        return await GetUser.from_tortoise_orm(user)

    async def get_all(self) -> UserBase:
        users = await self.model.all()
        return [await GetUser.from_tortoise_orm(user) for user in users]

    async def delete(self, login: str) -> DeleteUser:
        await self.model.filter(login=login).delete()
        return DeleteUser(succces=True)


user = CRUDUser(User)
