from http import HTTPStatus

import pytest
from core.file_manager import init_media
from fastapi.testclient import TestClient
from schemas.token import TokenPair


@pytest.mark.anyio
async def test_upload_file(
    sync_client: TestClient, path: str, create_auth_pair: TokenPair
):
    init_media()
    tokens = create_auth_pair
    response = sync_client.post(
        "/api/v1/files/albums/7878/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == HTTPStatus.CREATED
    assert response.json() == {"success": True}


"""Test get files"""


@pytest.mark.anyio
async def test_get_file(sync_client: TestClient):
    response = sync_client.get("/api/v1/files/albums/7878/0/")
    assert response.status_code == HTTPStatus.OK


@pytest.mark.anyio
async def test_get_nonexistent_file(sync_client: TestClient):
    response = sync_client.get("/api/v1/files/albums/7878/1337/")
    assert response.status_code == HTTPStatus.BAD_REQUEST


"""Test change files"""


@pytest.mark.anyio
async def test_change_file(
    sync_client: TestClient, path: str, create_auth_pair: TokenPair
):
    tokens = create_auth_pair
    response = sync_client.put(
        "/api/v1/files/albums/7878/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
        params={"indexes": 0},
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == HTTPStatus.OK
    assert response.json() == {"success": True}


@pytest.mark.anyio
async def test_delete_file(sync_client: TestClient, create_auth_pair: TokenPair):
    tokens = create_auth_pair
    response = sync_client.delete(
        "/api/v1/files/albums/7878/",
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == HTTPStatus.OK
    assert response.json() == {"success": True}


"""Tests without access token"""


@pytest.mark.anyio
async def test_upload_file_without_token(sync_client: TestClient, path: str):
    response = sync_client.post(
        "/api/v1/files/albums/7878/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
    )
    assert response.status_code == HTTPStatus.FORBIDDEN


@pytest.mark.anyio
async def test_change_file_without_token(sync_client: TestClient, path: str):
    response = sync_client.put(
        "/api/v1/files/albums/7878/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
        params={"indexes": 0},
    )
    assert response.status_code == HTTPStatus.FORBIDDEN


@pytest.mark.anyio
async def test_delete_file_without_token(sync_client: TestClient):
    response = sync_client.delete("/api/v1/files/albums/7878/")
    assert response.status_code == HTTPStatus.FORBIDDEN
