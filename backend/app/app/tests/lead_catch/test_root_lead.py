from http import HTTPStatus

import pytest
from httpx import AsyncClient
from schemas.token import TokenPair


@pytest.mark.anyio
async def test_get(client: AsyncClient):
    response = await client.get("/api/v1/lead-catch/")
    assert response.status_code == int(HTTPStatus.OK)
    assert response.json()["value"] != ""


@pytest.mark.anyio
async def test_update(client: AsyncClient, create_auth_pair: TokenPair):
    tokens = create_auth_pair
    response = await client.put(
        f"/api/v1/lead-catch/",
        json={"new_value": "Update value"},
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == int(HTTPStatus.OK)
    assert response.json()["value"] == "Update value"


@pytest.mark.anyio
async def test_update_without_token(client: AsyncClient, create_auth_pair: TokenPair):
    tokens = create_auth_pair
    response = await client.put(
        f"/api/v1/lead-catch/",
        json={"new_value": "Update value"},
    )
    assert response.status_code == int(HTTPStatus.FORBIDDEN)
