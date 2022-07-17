import random
from string import ascii_lowercase

import pytest
from core.security import TokenPair, create_new_pair, get_password_hash
from crud.crud_token import token
from crud.crud_user import user
from schemas.user import CreateUser


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
