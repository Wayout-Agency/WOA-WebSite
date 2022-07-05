from pydantic import BaseSettings
from functools import lru_cache
import secrets
from dotenv import dotenv_values
from pathlib import Path

BASEDIR = Path(__file__).resolve().parent.parent.parent.parent.parent
AERICH_BASEDIR = Path(__file__).resolve().parent.parent.parent.parent


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8

    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str

    DB_HOST: str
    DB_PORT: int


@lru_cache()
def get_settings(aerich: bool = False) -> Settings:
    config = dotenv_values(BASEDIR / "config" / ".env")
    return Settings(**config)
