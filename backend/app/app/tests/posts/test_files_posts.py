from http import HTTPStatus

import pytest
from core.file_manager import init_media
from fastapi.testclient import TestClient
from schemas.post import PostType
from schemas.token import TokenPair

"""Tests cases"""


@pytest.mark.anyio
async def test_upload_case_file(
    sync_client: TestClient, path: str, create_auth_pair: TokenPair
):
    init_media()
    tokens = create_auth_pair
    response = sync_client.post(
        f"/api/v1/posts/{PostType.case.value}/7878/file/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == HTTPStatus.CREATED
    assert response.json() == {"success": True}


@pytest.mark.anyio
async def test_change_case_file(
    sync_client: TestClient, path: str, create_auth_pair: TokenPair
):
    tokens = create_auth_pair
    response = sync_client.put(
        f"/api/v1/posts/{PostType.case.value}/7878/file/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
        params={"indexes": 0},
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == HTTPStatus.OK
    assert response.json() == {"success": True}


@pytest.mark.anyio
async def test_delete_case_file(sync_client: TestClient, create_auth_pair: TokenPair):
    tokens = create_auth_pair
    response = sync_client.delete(
        f"/api/v1/posts/{PostType.case.value}/7878/file/",
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == HTTPStatus.OK
    assert response.json() == {"success": True}


"""Tests artciles"""


@pytest.mark.anyio
async def test_upload_article_file(
    sync_client: TestClient, path: str, create_auth_pair: TokenPair
):
    init_media()
    tokens = create_auth_pair
    response = sync_client.post(
        f"/api/v1/posts/{PostType.article.value}/7878/file/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == HTTPStatus.CREATED
    assert response.json() == {"success": True}


@pytest.mark.anyio
async def test_change_article_file(
    sync_client: TestClient, path: str, create_auth_pair: TokenPair
):
    tokens = create_auth_pair
    response = sync_client.put(
        f"/api/v1/posts/{PostType.article.value}/7878/file/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
        params={"indexes": 0},
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == HTTPStatus.OK
    assert response.json() == {"success": True}


@pytest.mark.anyio
async def test_delete_article_file(
    sync_client: TestClient, create_auth_pair: TokenPair
):
    tokens = create_auth_pair
    response = sync_client.delete(
        f"/api/v1/posts/{PostType.article.value}/7878/file/",
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == HTTPStatus.OK
    assert response.json() == {"success": True}


"""Tests cases without access token"""


@pytest.mark.anyio
async def test_upload_case_file_without_token(sync_client: TestClient, path: str):
    response = sync_client.post(
        f"/api/v1/posts/{PostType.case.value}/7878/file/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
    )
    assert response.status_code == HTTPStatus.FORBIDDEN


@pytest.mark.anyio
async def test_change_case_file_without_token(sync_client: TestClient, path: str):
    response = sync_client.put(
        f"/api/v1/posts/{PostType.case.value}/7878/file/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
        params={"indexes": 0},
    )
    assert response.status_code == HTTPStatus.FORBIDDEN


@pytest.mark.anyio
async def test_delete_case_file_without_token(sync_client: TestClient):
    response = sync_client.delete(
        f"/api/v1/posts/{PostType.case.value}/7878/file/",
    )
    assert response.status_code == HTTPStatus.FORBIDDEN


"""Tests articles without token"""


@pytest.mark.anyio
async def test_upload_article_file_without_token(sync_client: TestClient, path: str):
    response = sync_client.post(
        f"/api/v1/posts/{PostType.article.value}/7878/file/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
    )
    assert response.status_code == HTTPStatus.FORBIDDEN


@pytest.mark.anyio
async def test_change_article_file_without_token(sync_client: TestClient, path: str):
    response = sync_client.put(
        f"/api/v1/posts/{PostType.article.value}/7878/file/",
        files={"files": ("file.jpg", open(path, "rb"), "image/jpg")},
        params={"indexes": 0},
    )
    assert response.status_code == HTTPStatus.FORBIDDEN


@pytest.mark.anyio
async def test_delete_article_file_without_token(sync_client: TestClient):
    response = sync_client.delete(
        f"/api/v1/posts/{PostType.article.value}/7878/file/",
    )
    assert response.status_code == HTTPStatus.FORBIDDEN
