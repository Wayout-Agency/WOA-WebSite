from functools import lru_cache
from os import environ
from pathlib import Path

from pydantic import BaseSettings

BASEDIR = Path(__file__).resolve().parent.parent.parent.parent.parent

# Generate SECRET_KEY by secrets.token_urlsafe(32)


class Settings(BaseSettings):
    API_V1_STR = "/api/v1"
    SECRET_KEY: str = environ["SECRET_KEY"]
    ALGORITHM = "HS256"
    # 4 hours
    ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 60 * 4
    # 4 days
    REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 60 * 24 * 4
    POSTGRES_DB: str = environ["POSTGRES_DB"]
    POSTGRES_USER: str = environ["POSTGRES_USER"]
    POSTGRES_PASSWORD: str = environ["POSTGRES_PASSWORD"]

    DB_HOST: str = environ["DB_HOST"]
    DB_PORT: int = environ["DB_PORT"]

    UPLOAD_DIRECTORY = (
        environ["UPLOAD_DIRECTORY"]
        if environ.get("UPLOAD_DIRECTORY")
        else BASEDIR / "media"
    )


@lru_cache()
def get_settings() -> Settings:
    return Settings()
