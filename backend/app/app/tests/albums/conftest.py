import random
from string import ascii_lowercase
from typing import NamedTuple

import pytest
from core.security import TokenPair, create_new_pair, get_password_hash
from crud.crud_token import token
from crud.crud_user import user
from schemas.album import CreateAlbum
from schemas.user import CreateUser


@pytest.fixture()
def get_album_data() -> CreateAlbum:
    return CreateAlbum(
        title="Album",
        description="Desc",
        new_price=100,
        old_price=90,
        sale_text="text",
        slug="slug",
        price_include="text",
        model_description="desc",
    )


@pytest.fixture()
async def create_auth_pair() -> TokenPair:
    await user.create(
        CreateUser(
            login="".join(random.choice(ascii_lowercase) for _ in range(5)),
            password=get_password_hash("Test123456"),
        )
    )
    tokens = create_new_pair()
    await token.create(tokens.refresh)
    return tokens
