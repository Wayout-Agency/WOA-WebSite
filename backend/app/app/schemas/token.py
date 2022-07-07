from pydantic import BaseModel


class Token(BaseModel):
    value: str


class TokenPair(BaseModel):
    access: str
    refresh: str
    expire: int
