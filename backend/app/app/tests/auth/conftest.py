import random
from string import ascii_lowercase
from time import time
from typing import NamedTuple

import pytest
from core.security import (
    TokenPair,
    TokenType,
    create_new_pair,
    create_token,
    get_password_hash,
)
from crud.crud_token import token
from crud.crud_user import user
from schemas.auth import OAuth2Schema
from schemas.token import TokenBase
from schemas.user import CreateUser, User


class UserTestModel(NamedTuple):
    user_in_db: CreateUser
    user_in_request: User


@pytest.fixture()
async def user_data() -> UserTestModel:
    rand_login = "".join(random.choice(ascii_lowercase) for _ in range(5))
    return UserTestModel(
        CreateUser(
            login=rand_login,
            password=get_password_hash("Test123456"),
        ),
        User(login=rand_login, password="Test123456"),
    )


@pytest.fixture()
def auth_data() -> OAuth2Schema:
    return OAuth2Schema(login="Test user", password="Test123456")


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


@pytest.fixture()
async def create_out_access_token() -> TokenBase:
    out_token = create_token(TokenType.access, time() - 100000 * 10000)
    return TokenBase(value=out_token)


@pytest.fixture()
async def create_out_refresh_token() -> TokenBase:
    out_token = create_token(TokenType.refresh, time() - 100000 * 10000)
    return TokenBase(value=out_token)


@pytest.fixture()
async def create_not_in_db_refresh_token() -> TokenBase:
    inv_token = create_token(TokenType.refresh)
    return TokenBase(value=inv_token)
