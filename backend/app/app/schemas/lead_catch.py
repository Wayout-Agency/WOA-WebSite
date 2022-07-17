from pydantic import BaseModel


class Lead(BaseModel):
    value: str


class UpdateLead(BaseModel):
    new_value: str
