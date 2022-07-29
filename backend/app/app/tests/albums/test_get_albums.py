from http import HTTPStatus

import pytest
from crud.crud_album import album
from fastapi.testclient import TestClient
from httpx import AsyncClient
from schemas.album import CreateAlbum
from schemas.token import TokenPair


@pytest.mark.anyio
async def test_get_all(
    client: AsyncClient,
    get_album_data: CreateAlbum,
    create_auth_pair: TokenPair,
    sync_client: TestClient,
    path: str,
):
    album_obj = await album.create(get_album_data)

    tokens = create_auth_pair
    file_response = sync_client.post(
        f"/api/v1/albums/{album_obj.id}/file/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert file_response.status_code == HTTPStatus.CREATED
    assert file_response.json() == {"success": True}

    response = await client.get("/api/v1/albums/")
    assert response.status_code == int(HTTPStatus.OK)
    assert album_obj.id in [album["id"] for album in response.json()]


@pytest.mark.anyio
async def test_get_one(
    client: AsyncClient,
    get_album_data: CreateAlbum,
    create_auth_pair: TokenPair,
    sync_client: TestClient,
    path: str,
):
    album_obj = await album.create(get_album_data)

    tokens = create_auth_pair
    file_response = sync_client.post(
        f"/api/v1/albums/{album_obj.id}/file/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert file_response.status_code == HTTPStatus.CREATED
    assert file_response.json() == {"success": True}

    response = await client.get(f"/api/v1/albums/{album_obj.id}/")
    assert response.status_code == int(HTTPStatus.OK)
    assert {**dict(album_obj), "files_quantity": 1} == dict(response.json())
