import sys
from pathlib import Path
from typing import Generator

import pytest
from httpx import AsyncClient
from tortoise import Tortoise

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from core.config import get_test_settings
from main import app
from models.albums import Album
from models.articles import Article
from models.tokens import Token
from models.users import User


async def init_db() -> Generator:
    test_settings = get_test_settings()

    TEST_DB_URL = "postgres://{}:{}@{}:{}/{}".format(
        test_settings.POSTGRES_USER,
        test_settings.POSTGRES_PASSWORD,
        test_settings.DB_HOST,
        test_settings.DB_PORT,
        test_settings.POSTGRES_DB,
    )

    await Tortoise.init(
        db_url=TEST_DB_URL,
        modules={
            "models": [
                "models.albums",
                "models.articles",
                "models.cases",
                "models.users",
                "models.tokens",
            ]
        },
    )
    await Tortoise.generate_schemas()


async def clean_test_data():
    for table in (Album, Token, User, Article):
        await table.all().delete()


@pytest.fixture(scope="session")
async def client():
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client


@pytest.fixture(scope="session", autouse=True)
async def initialize_tests():
    await init_db()
    yield
    await clean_test_data()


@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"
