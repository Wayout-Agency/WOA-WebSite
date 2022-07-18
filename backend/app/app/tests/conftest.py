import sys
from os import environ, path
from pathlib import Path
from typing import Generator

import pytest
from dotenv import load_dotenv
from fastapi.testclient import TestClient
from httpx import AsyncClient
from tortoise import Tortoise

BASEDIR = Path(__file__).resolve().parent.parent.parent.parent.parent

load_dotenv(BASEDIR / "config" / ".env.test")

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from core.config import get_settings
from main import app
from models.albums import Album
from models.articles import Article
from models.tokens import Token
from models.users import User


async def init_db() -> Generator:
    test_settings = get_settings()

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
                "models.questions_services",
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


@pytest.fixture(scope="session")
def sync_client():
    s_client = TestClient(app)
    yield s_client


@pytest.fixture(scope="session", autouse=True)
async def initialize_tests():
    await init_db()
    yield
    await clean_test_data()


@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"
