from typing import Protocol, TypeVar

from pydantic import BaseModel
from tortoise.models import Model

ModelType = TypeVar("ModelType", bound=Model)
OutShemaType = TypeVar("OutShemaType", bound=BaseModel)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Protocol):
    def __init__(self, model: ModelType) -> None:
        raise NotImplementedError

    async def create(self, shema: CreateSchemaType) -> OutShemaType:
        raise NotImplementedError

    async def read(self, id: int) -> OutShemaType:
        raise NotImplementedError

    async def update(self, shema: UpdateSchemaType) -> OutShemaType:
        raise NotImplementedError

    async def delete(self, id: int) -> bool:
        raise NotImplementedError
