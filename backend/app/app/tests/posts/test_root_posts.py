from http import HTTPStatus

import pytest
from crud.crud_post import post
from httpx import AsyncClient
from schemas.post import CreatePost, PostBase, PostType
from schemas.token import TokenPair

"""Get requests with access token"""


@pytest.mark.anyio
async def test_create_case_with_token(
    client: AsyncClient, create_auth_pair: TokenPair, json_сase_data
):
    tokens = create_auth_pair
    response = await client.post(
        f"/api/v1/posts/{PostType.case.value}/",
        json=json_сase_data,
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == int(HTTPStatus.CREATED)


@pytest.mark.anyio
async def test_create_article_with_token(
    client: AsyncClient, create_auth_pair: TokenPair, json_article_data
):
    tokens = create_auth_pair
    response = await client.post(
        f"/api/v1/posts/{PostType.article.value}/",
        json=json_article_data,
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == int(HTTPStatus.CREATED)


"""Put requests with access token"""


@pytest.mark.anyio
async def test_update_case_with_token(
    client: AsyncClient,
    db_case_data: CreatePost,
    create_auth_pair: TokenPair,
    json_сase_data,
):
    tokens = create_auth_pair
    obj: PostBase = await post.create(PostType.case, db_case_data)
    new_obj = json_сase_data
    new_obj["value"]["title"] = "Updated case title"
    response = await client.put(
        f"/api/v1/posts/{PostType.case.value}/{obj.value.id}/",
        json=dict(new_obj),
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == int(HTTPStatus.OK)
    assert response.json()["value"]["title"] == new_obj["value"]["title"]


@pytest.mark.anyio
async def test_update_article_with_token(
    client: AsyncClient,
    db_article_data: CreatePost,
    create_auth_pair: TokenPair,
    json_article_data,
):
    tokens = create_auth_pair
    obj: PostBase = await post.create(PostType.article, db_article_data)
    new_obj = json_article_data
    new_obj["value"]["title"] = "Updated case title"
    response = await client.put(
        f"/api/v1/posts/{PostType.article.value}/{obj.value.id}/",
        json=dict(new_obj),
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == int(HTTPStatus.OK)
    assert response.json()["value"]["title"] == new_obj["value"]["title"]


"""Delete requests with access token"""


@pytest.mark.anyio
async def test_update_case_with_token(
    client: AsyncClient, db_case_data: PostBase, create_auth_pair: TokenPair
):
    tokens = create_auth_pair
    obj: PostBase = await post.create(PostType.case, db_case_data)
    response = await client.delete(
        f"/api/v1/posts/{PostType.case.value}/{obj.value.id}/",
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == int(HTTPStatus.OK)


@pytest.mark.anyio
async def test_delete_article_with_token(
    client: AsyncClient, db_article_data: PostBase, create_auth_pair: TokenPair
):
    tokens = create_auth_pair
    obj: PostBase = await post.create(PostType.article, db_article_data)
    response = await client.delete(
        f"/api/v1/posts/{PostType.article.value}/{obj.value.id}/",
        headers={"Authorization": f"Bearer {tokens.access}"},
    )
    assert response.status_code == int(HTTPStatus.OK)


"""Get requests without access token"""


@pytest.mark.anyio
async def test_create_case_without_token(client: AsyncClient, json_сase_data):
    response = await client.post(
        f"/api/v1/posts/{PostType.case.value}/", json=json_сase_data
    )
    assert response.status_code == int(HTTPStatus.FORBIDDEN)


@pytest.mark.anyio
async def test_create_article_without_token(client: AsyncClient, json_article_data):
    response = await client.post(
        f"/api/v1/posts/{PostType.article.value}/", json=json_article_data
    )
    assert response.status_code == int(HTTPStatus.FORBIDDEN)


"""Put requests without access token"""


@pytest.mark.anyio
async def test_update_case_without_token(
    client: AsyncClient, db_case_data: CreatePost, json_сase_data
):
    obj: PostBase = await post.create(PostType.case, db_case_data)
    new_obj = json_сase_data
    new_obj["value"]["title"] = "Updated case title"
    response = await client.put(
        f"/api/v1/posts/{PostType.case.value}/{obj.value.id}/", json=new_obj
    )
    assert response.status_code == int(HTTPStatus.FORBIDDEN)


@pytest.mark.anyio
async def test_update_article_without_token(
    client: AsyncClient, db_article_data: CreatePost, json_article_data
):
    obj: PostBase = await post.create(PostType.article, db_article_data)
    new_obj = json_article_data
    new_obj["value"]["title"] = "Updated case title"
    response = await client.put(
        f"/api/v1/posts/{PostType.article.value}/{obj.value.id}/", json=new_obj
    )
    assert response.status_code == int(HTTPStatus.FORBIDDEN)


"""Delete requests without access token"""


@pytest.mark.anyio
async def test_update_case_without_token(client: AsyncClient, db_case_data: PostBase):
    obj: PostBase = await post.create(PostType.case, db_case_data)
    response = await client.delete(
        f"/api/v1/posts/{PostType.case.value}/{obj.value.id}/"
    )
    assert response.status_code == int(HTTPStatus.FORBIDDEN)


@pytest.mark.anyio
async def test_delete_article_without_token(
    client: AsyncClient, db_article_data: PostBase
):
    obj: PostBase = await post.create(PostType.article, db_article_data)
    response = await client.delete(
        f"/api/v1/posts/{PostType.article.value}/{obj.value.id}/"
    )
    assert response.status_code == int(HTTPStatus.FORBIDDEN)
