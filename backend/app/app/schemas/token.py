from pydantic import BaseModel


class TokenBase(BaseModel):
    value: str


class TokenPair(BaseModel):
    access: str
    refresh: str
    expire: float
