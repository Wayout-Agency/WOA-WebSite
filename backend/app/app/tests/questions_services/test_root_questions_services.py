from http import HTTPStatus

import pytest
from crud.crud_questions_services import question_service
from httpx import AsyncClient
from schemas.questions_services import CreateQuestionService
from schemas.token import TokenPair


@pytest.mark.anyio
async def test_create_question_service(
    client: AsyncClient,
    get_question_service: CreateQuestionService,
    create_auth_pair: TokenPair,
):
    tokens, obj = create_auth_pair, get_question_service
    response = await client.post(
        "/api/v1/questions-services/",
        json=dict(get_question_service),
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == int(HTTPStatus.CREATED)
    assert response.json()["title"] == obj.title


@pytest.mark.anyio
async def test_update_question_service(
    client: AsyncClient,
    get_question_service: CreateQuestionService,
    create_auth_pair: TokenPair,
):
    tokens: TokenPair = create_auth_pair
    obj = await question_service.create(get_question_service)
    response = await client.put(
        f"/api/v1/questions-services/{obj.id}/",
        json=dict(get_question_service),
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == int(HTTPStatus.OK)
    assert response.json() == dict(obj)


@pytest.mark.anyio
async def test_delete_question_service(
    client: AsyncClient,
    get_question_service: CreateQuestionService,
    create_auth_pair: TokenPair,
):
    tokens: TokenPair = create_auth_pair
    obj = await question_service.create(get_question_service)
    response = await client.delete(
        f"/api/v1/questions-services/{obj.id}/",
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == int(HTTPStatus.OK)


@pytest.mark.anyio
async def test_create_question_service_without_token(
    client: AsyncClient, get_question_service: CreateQuestionService
):
    response = await client.post("/api/v1/questions-services/", json=dict(get_question_service))
    assert response.status_code == int(HTTPStatus.FORBIDDEN)


@pytest.mark.anyio
async def test_update_question_service_without_token(
    client: AsyncClient, get_question_service: CreateQuestionService
):
    obj = await question_service.create(get_question_service)
    response = await client.put(f"/api/v1/questions-services/{obj.id}/", json=dict(obj))
    assert response.status_code == int(HTTPStatus.FORBIDDEN)


@pytest.mark.anyio
async def test_delete_question_service_without_token(
    client: AsyncClient, get_question_service: CreateQuestionService
):
    obj = await question_service.create(get_question_service)
    response = await client.delete(f"/api/v1/questions-services/{obj.id}/")
    assert response.status_code == int(HTTPStatus.FORBIDDEN)
