from functools import lru_cache
from pathlib import Path

from dotenv import dotenv_values
from pydantic import BaseSettings

BASEDIR = Path(__file__).resolve().parent.parent.parent.parent.parent

# Generate SECRET_KEY by secrets.token_urlsafe(32)


class Settings(BaseSettings):
    API_V1_STR = "/api/v1"
    SECRET_KEY: str
    ALGORITHM = "HS256"
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 8
    # 60 minutes * 2 hours = 2 hours
    REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 2
    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str

    DB_HOST: str
    DB_PORT: int


@lru_cache()
def get_settings() -> Settings:
    return Settings(**dotenv_values(BASEDIR / "config" / ".env"))
