from pydantic import BaseModel


class User(BaseModel):
    login: str
    password: str


class UserBase(User):
    id: int


class CreateUser(User):
    pass


class DeleteUser(BaseModel):
    succces: bool
