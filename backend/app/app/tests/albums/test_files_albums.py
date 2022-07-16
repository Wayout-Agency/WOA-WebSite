from http import HTTPStatus

import pytest
from fastapi.testclient import TestClient
from schemas.token import TokenPair


@pytest.mark.anyio
async def test_upload_file(
    sync_client: TestClient, path: str, create_auth_pair: TokenPair
):
    tokens = create_auth_pair
    response = sync_client.post(
        f"/api/v1/albums/7878/file/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == HTTPStatus.CREATED
    assert response.json() == {"success": True}


@pytest.mark.anyio
async def test_change_file(
    sync_client: TestClient, path: str, create_auth_pair: TokenPair
):
    tokens = create_auth_pair
    response = sync_client.put(
        f"/api/v1/albums/7878/file/",
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
        f"/api/v1/albums/7878/file/",
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == HTTPStatus.OK
    assert response.json() == {"success": True}


"""Tests without access token"""


@pytest.mark.anyio
async def test_upload_file_without_token(sync_client: TestClient, path: str):
    response = sync_client.post(
        f"/api/v1/albums/7878/file/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
    )
    assert response.status_code == HTTPStatus.FORBIDDEN


@pytest.mark.anyio
async def test_change_file_without_token(sync_client: TestClient, path: str):
    response = sync_client.put(
        f"/api/v1/albums/7878/file/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
        params={"indexes": 0},
    )
    assert response.status_code == HTTPStatus.FORBIDDEN


@pytest.mark.anyio
async def test_delete_file_without_token(sync_client: TestClient):
    response = sync_client.delete(f"/api/v1/albums/7878/file/")
    assert response.status_code == HTTPStatus.FORBIDDEN
