from http import HTTPStatus

import pytest
from crud.crud_questions_services import question_service
from httpx import AsyncClient
from schemas.questions_services import CreateQuestionService


@pytest.mark.anyio
async def test_get_all(
    client: AsyncClient, get_question_service: CreateQuestionService
):
    obj = await question_service.create(get_question_service)
    response = await client.get("/api/v1/questions-services/")
    assert response.status_code == int(HTTPStatus.OK)
    assert obj.id in [album["id"] for album in response.json()]


@pytest.mark.anyio
async def test_get_one(
    client: AsyncClient, get_question_service: CreateQuestionService
):
    obj = await question_service.create(get_question_service)
    response = await client.get(f"/api/v1/questions-services/{obj.id}/")
    assert response.status_code == int(HTTPStatus.OK)
    assert response.json()["id"] == obj.id
