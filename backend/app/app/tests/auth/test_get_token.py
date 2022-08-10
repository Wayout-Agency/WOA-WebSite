from http import HTTPStatus

import pytest
from crud.crud_user import user
from httpx import AsyncClient
from tests.auth.conftest import UserTestModel


@pytest.mark.anyio
async def test_login(client: AsyncClient, user_data: UserTestModel):
    await user.create(user_data.user_in_db)
    response = await client.post("/api/v1/token/", json=dict(user_data.user_in_request))
    assert response.status_code == int(HTTPStatus.OK)


@pytest.mark.anyio
async def test_login_invalid_creditionals(client: AsyncClient, user_data: UserTestModel):
    await user.create(user_data.user_in_db)
    user_data.user_in_request.password = "Invalid password"
    response = await client.post("/api/v1/token/", json=dict(user_data.user_in_request))
    assert response.status_code == int(HTTPStatus.UNAUTHORIZED)
