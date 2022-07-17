from http import HTTPStatus

import pytest
from httpx import AsyncClient
from schemas.album import CreateAlbum


@pytest.mark.anyio
async def test_get(client: AsyncClient):
    response = await client.get("/api/v1/lead-catch/")
    assert response.status_code == int(HTTPStatus.OK)
    assert response.json()["value"] != ""


@pytest.mark.anyio
async def test_update(client: AsyncClient):
    response = await client.put(
        f"/api/v1/lead-catch/", json={"new_value": "Update value"}
    )
    assert response.status_code == int(HTTPStatus.OK)
    assert response.json()["value"] == "Update value"
