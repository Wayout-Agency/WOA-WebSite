from http import HTTPStatus

import pytest
from crud.crud_album import album
from httpx import AsyncClient
from schemas.album import CreateAlbum


@pytest.mark.anyio
async def test_get_all(client: AsyncClient, get_album_data: CreateAlbum):
    album_obj = await album.create(get_album_data)
    response = await client.get("/api/v1/albums/")
    assert response.status_code == int(HTTPStatus.OK)
    assert album_obj.id in [album["id"] for album in response.json()]


@pytest.mark.anyio
async def test_get_one(client: AsyncClient, get_album_data: CreateAlbum):
    album_obj = await album.create(get_album_data)
    response = await client.get(f"/api/v1/albums/{album_obj.id}/")
    assert response.status_code == int(HTTPStatus.OK)
    assert {**dict(album_obj), "files_quantity": 0} == dict(response.json())
