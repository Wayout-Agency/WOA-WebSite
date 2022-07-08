from typing import Protocol, TypeVar

from pydantic import BaseModel
from tortoise.models import Model

ModelType = TypeVar("ModelType", bound=Model)
OutSchemaType = TypeVar("OutSchemaType", bound=BaseModel)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Protocol):
    def __init__(self, model: ModelType) -> None:
        raise NotImplementedError

    async def create(self, schema: CreateSchemaType) -> OutSchemaType:
        raise NotImplementedError

    async def read(self, id: int) -> OutSchemaType:
        raise NotImplementedError

    async def update(self, schema: UpdateSchemaType) -> OutSchemaType:
        raise NotImplementedError

    async def delete(self, id: int) -> bool:
        raise NotImplementedError
