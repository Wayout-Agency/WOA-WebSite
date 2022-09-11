from pydantic import BaseModel


class FeedbackSchema(BaseModel):
    name: str
    phone: str


class FeedbackOrderSchema(BaseModel):
    name: str
    phone: str
    offer: str


class OfferSchema(BaseModel):
    quantity: int
    name: str
    phone: str
    description: str


class EmailSchema(BaseModel):
    email: FeedbackSchema | FeedbackOrderSchema | OfferSchema
