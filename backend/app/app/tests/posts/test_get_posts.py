from http import HTTPStatus

import pytest
from crud.crud_post import post
from httpx import AsyncClient
from schemas.post import CreatePost, PostBaseData, PostType


@pytest.mark.anyio
async def test_get_all_cases(client: AsyncClient, db_case_data: CreatePost):
    obj: PostBaseData = await post.create(PostType.case, db_case_data)
    response = await client.get(f"/api/v1/posts/{PostType.case.value}/")
    assert response.status_code == int(HTTPStatus.OK)
    assert obj.value.id in [case["value"]["id"] for case in response.json()]


@pytest.mark.anyio
async def test_get_all_articles(client: AsyncClient, db_article_data: CreatePost):
    obj: PostBaseData = await post.create(PostType.article, db_article_data)
    response = await client.get(f"/api/v1/posts/{PostType.article.value}/")
    assert response.status_code == int(HTTPStatus.OK)
    assert obj.value.id in [case["value"]["id"] for case in response.json()]


@pytest.mark.anyio
async def test_get_one_case_by_id(client: AsyncClient, db_case_data: CreatePost):
    obj: PostBaseData = await post.create(PostType.case, db_case_data)
    response = await client.get(f"/api/v1/posts/{PostType.case.value}/{obj.value.id}/")
    assert response.status_code == int(HTTPStatus.OK)
    assert obj.value.title == response.json()["value"]["title"]


@pytest.mark.anyio
async def test_get_one_case_by_slug(client: AsyncClient, db_case_data: CreatePost):
    obj: PostBaseData = await post.create(PostType.case, db_case_data)
    response = await client.get(f"/api/v1/posts/{PostType.case.value}/{obj.value.slug}/")
    assert response.status_code == int(HTTPStatus.OK)
    assert obj.value.title == response.json()["value"]["title"]


@pytest.mark.anyio
async def test_get_one_article_by_id(client: AsyncClient, db_article_data: CreatePost):
    obj: PostBaseData = await post.create(PostType.article, db_article_data)
    response = await client.get(f"/api/v1/posts/{PostType.article.value}/{obj.value.id}/")
    assert response.status_code == int(HTTPStatus.OK)
    assert obj.value.title == response.json()["value"]["title"]


@pytest.mark.anyio
async def test_get_one_article_by_slug(client: AsyncClient, db_article_data: CreatePost):
    obj: PostBaseData = await post.create(PostType.article, db_article_data)
    response = await client.get(f"/api/v1/posts/{PostType.article.value}/{obj.value.slug}/")
    assert response.status_code == int(HTTPStatus.OK)
    assert obj.value.title == response.json()["value"]["title"]
