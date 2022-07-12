import random
from string import ascii_lowercase

import pytest
from core.security import TokenPair, create_new_pair, get_password_hash
from crud.crud_token import token
from crud.crud_user import user
from schemas.article import CreateArticle
from schemas.case import CreateCase
from schemas.post import CreatePost
from schemas.user import CreateUser


@pytest.fixture()
def json_сase_data():
    return {
        "value": {
            "title": "Case test title",
            "description": "Case test description",
            "created_at": "2022-07-14",
            "time_to_read": 10,
            "slug": "Article test slug",
            "task": "Case test task",
            "process": "Case test process",
        }
    }


@pytest.fixture()
def db_case_data() -> CreatePost:
    return CreatePost(
        value=CreateCase(
            title="Case test title",
            description="Case test description",
            created_at="2022-07-14",
            time_to_read=10,
            slug="Case test slug",
            task="Case test task",
            process="Case test process",
        )
    )


@pytest.fixture()
def json_article_data():
    return {
        "value": {
            "title": "Article test title",
            "author": "Article test author",
            "created_at": "2022-07-14",
            "time_to_read": 10,
            "slug": "Article test slug",
            "text": "Article test text",
        }
    }


@pytest.fixture()
def db_article_data() -> CreatePost:
    return CreatePost(
        value=CreateArticle(
            title="Article test title",
            author="Article test author",
            created_at="2022-07-14",
            time_to_read=10,
            slug="Article test slug",
            text="Article test text",
        )
    )


@pytest.fixture()
async def create_auth_pair() -> TokenPair:
    rand_login = "".join(random.choice(ascii_lowercase) for _ in range(5))
    await user.create(
        CreateUser(
            login=rand_login,
            password=get_password_hash("Test123456"),
        )
    )
    tokens = create_new_pair()
    await token.create(rand_login, tokens.refresh)
    return tokens
