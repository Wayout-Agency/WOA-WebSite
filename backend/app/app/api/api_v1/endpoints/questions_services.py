from typing import List

from api.deps import check_root_user
from crud.crud_questions_services import question_service
from fastapi import APIRouter, Depends, status
from schemas.questions_services import (
    CreateQuestionService,
    DeleteQuestionService,
    QSType,
    QuestionServiceBase,
    UpdateQuestionService,
)

router = APIRouter()


@router.get("/", response_model=List[QuestionServiceBase])
async def get_all():
    return await question_service.get_all()


@router.post(
    "/", response_model=QuestionServiceBase, status_code=status.HTTP_201_CREATED
)
async def create_question_service(
    schema: CreateQuestionService, _=Depends(check_root_user)
):
    return await question_service.create(schema)


@router.get("/{id}/", response_model=QuestionServiceBase)
async def get_question_service(id: int):
    return await question_service.get_by_id(id)


@router.put("/{id}/", response_model=QuestionServiceBase)
async def update_question_service(
    id: int, schema: UpdateQuestionService, _=Depends(check_root_user)
):
    return await question_service.update(id, schema)


@router.delete(
    "/{id}/", response_model=DeleteQuestionService, status_code=status.HTTP_200_OK
)
async def delete_question_service(id: int, _=Depends(check_root_user)):
    return await question_service.delete(id)
