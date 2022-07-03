from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str


class UserBase(User):
    id: int


class CreateUser(User):
    pass


class DeleteUser(BaseModel):
    succes: bool
