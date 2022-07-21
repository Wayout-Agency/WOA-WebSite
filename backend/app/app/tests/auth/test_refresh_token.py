from http import HTTPStatus

import pytest
from httpx import AsyncClient
from schemas.token import TokenBase, TokenPair


@pytest.mark.anyio
async def test_verify_token(client: AsyncClient, create_auth_pair: TokenPair):
    tokens = create_auth_pair
    response = await client.get(
        "/api/v1/token/", headers={"Authorization": f"Bearer {tokens.access}"}
    )
    assert response.status_code == int(HTTPStatus.OK)


@pytest.mark.anyio
async def test_update_token(client: AsyncClient, create_auth_pair: TokenPair):
    tokens = create_auth_pair
    response = await client.post(
        "/api/v1/token/refresh/", json={"value": tokens.refresh}
    )
    assert response.status_code == int(HTTPStatus.OK)


@pytest.mark.anyio
async def test_out_token(client: AsyncClient, create_out_refresh_token: TokenBase):
    out_token = create_out_refresh_token
    response = await client.post("/api/v1/token/refresh/", json=dict(out_token))
    assert response.status_code == int(HTTPStatus.UNAUTHORIZED)
    assert response.json() == {"detail": "Outdated token"}


@pytest.mark.anyio
async def test_not_in_db_token(
    client: AsyncClient, create_not_in_db_refresh_token: TokenBase
):
    inv_token = create_not_in_db_refresh_token
    response = await client.post("/api/v1/token/refresh/", json=dict(inv_token))
    assert response.status_code == int(HTTPStatus.UNAUTHORIZED)
    assert response.json() == {"detail": "Outdated token"}
