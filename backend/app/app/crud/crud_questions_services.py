from re import S
from typing import List

from core.errors import Errors
from crud.base import CRUDBase
from models.questions_services import QSType, QuestionService
from schemas.questions_services import (
    CreateQuestionService,
    DeleteQuestionService,
    QuestionServiceBase,
    UpdateQuestionService,
)
from tortoise.exceptions import DoesNotExist


class CRUDQuestionService(CRUDBase):
    def __init__(self, model: QuestionService) -> None:
        self.model = model

    async def get_all(self) -> List[QuestionServiceBase]:
        question_services = await self.model.all()
        return [
            QuestionServiceBase(
                title=question_service.title,
                text=question_service.text,
                type=question_service.type.value,
                id=question_service.id,
            )
            for question_service in question_services
        ]

    async def get_by_id(self, id: int) -> QuestionServiceBase:
        try:
            question_service = await self.model.get(id=id)
            return QuestionServiceBase(
                title=question_service.title,
                text=question_service.text,
                type=question_service.type.value,
                id=question_service.id,
            )
        except DoesNotExist:
            raise Errors.not_found

    async def create(self, schema: CreateQuestionService) -> QuestionServiceBase:
        question_service = await self.model.create(**schema.dict())
        return QuestionServiceBase(
            title=question_service.title,
            text=question_service.text,
            type=question_service.type.value,
            id=question_service.id,
        )

    async def update(
        self, id: int, schema: UpdateQuestionService
    ) -> QuestionServiceBase:
        await self.model.filter(id=id).update(**schema.dict())
        return await self.get_by_id(id)

    async def delete(self, id: int) -> DeleteQuestionService:
        await self.model.filter(id=id).delete()
        return DeleteQuestionService(success=True)


question_service = CRUDQuestionService(QuestionService)
