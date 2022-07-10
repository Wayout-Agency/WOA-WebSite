from http import HTTPStatus

import pytest
from httpx import AsyncClient


@pytest.mark.anyio
async def test_update_token(client: AsyncClient, create_auth_pair):
    tokens = create_auth_pair
    print(tokens.refresh)
    response = await client.put("/api/v1/token/", json={"value": tokens.refresh})
    assert response.status_code == int(HTTPStatus.OK)


@pytest.mark.anyio
async def test_out_token(client: AsyncClient, create_out_refresh_token):
    out_token = create_out_refresh_token
    response = await client.put("/api/v1/token/", json=dict(out_token))
    assert response.status_code == int(HTTPStatus.UNAUTHORIZED)
    assert response.json() == {"detail": "Outdated token"}


@pytest.mark.anyio
async def test_not_in_db_token(client: AsyncClient, create_not_in_db_refresh_token):
    inv_token = create_not_in_db_refresh_token
    response = await client.put("/api/v1/token/", json=dict(inv_token))
    assert response.status_code == int(HTTPStatus.UNAUTHORIZED)
    assert response.json() == {"detail": "Outdated token"}
