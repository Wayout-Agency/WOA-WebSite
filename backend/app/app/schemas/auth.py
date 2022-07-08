from pydantic import BaseModel


class OAuth2Schema(BaseModel):
    login: str
    password: str
