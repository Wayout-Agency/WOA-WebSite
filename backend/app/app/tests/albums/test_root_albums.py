from http import HTTPStatus

import pytest
from crud.crud_album import album
from httpx import AsyncClient
from schemas.album import CreateAlbum
from schemas.token import TokenPair


@pytest.mark.anyio
async def test_update_album(client: AsyncClient, get_album_data: CreateAlbum, create_auth_pair: TokenPair):
    tokens: TokenPair = create_auth_pair
    album_obj = await album.create(get_album_data)
    album_obj.title = "Updated test title"
    response = await client.put(
        f"/api/v1/albums/{album_obj.id}/",
        json=dict(album_obj),
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == int(HTTPStatus.OK)
    assert response.json()["title"] == album_obj.title


@pytest.mark.anyio
async def test_create_album(client: AsyncClient, get_album_data: CreateAlbum, create_auth_pair: TokenPair):
    tokens = create_auth_pair
    album_obj = get_album_data
    response = await client.post(
        "/api/v1/albums/",
        json=dict(album_obj),
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == int(HTTPStatus.CREATED)
    assert response.json()["title"] == album_obj.title


@pytest.mark.anyio
async def test_delete_album(client: AsyncClient, get_album_data: CreateAlbum, create_auth_pair: TokenPair):
    tokens: TokenPair = create_auth_pair
    album_obj = await album.create(get_album_data)
    response = await client.delete(
        f"/api/v1/albums/{album_obj.id}/",
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == int(HTTPStatus.OK)


@pytest.mark.anyio
async def test_create_album_without_token(client: AsyncClient, get_album_data: CreateAlbum):
    response = await client.post("/api/v1/albums/", json=dict(get_album_data))
    assert response.status_code == int(HTTPStatus.FORBIDDEN)


@pytest.mark.anyio
async def test_update_album_without_token(client: AsyncClient, get_album_data: CreateAlbum):
    album_obj = await album.create(get_album_data)
    response = await client.put(f"/api/v1/albums/{album_obj.id}/", json=dict(album_obj))
    assert response.status_code == int(HTTPStatus.FORBIDDEN)


@pytest.mark.anyio
async def test_delete_album_without_token(client: AsyncClient, get_album_data: CreateAlbum):
    album_obj = await album.create(get_album_data)
    response = await client.delete(f"/api/v1/albums/{album_obj.id}/")
    assert response.status_code == int(HTTPStatus.FORBIDDEN)
