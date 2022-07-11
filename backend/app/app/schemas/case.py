from datetime import date

from pydantic import BaseModel


class Case(BaseModel):
    title: str
    description: str
    created_at: date
    time_to_read: int
    slug: str
    task: str
    process: str


class CaseBase(Case):
    id: int


class CreateCase(Case):
    pass


class UpdateCase(Case):
    pass
