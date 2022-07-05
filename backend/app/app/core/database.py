from tortoise import Tortoise
from .config import get_settings


async def init_db():
    settings = get_settings()
    await Tortoise.init(
        db_url=f"postgres://{settings.POSTGRES_DB}:{settings.POSTGRES_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.POSTGRES_USER}",
        modules={
            "models": [
                "models.albums",
                "models.users",
                "models.tokens",
                "models.articles",
            ]
        },
    )


settings = get_settings(False)
TORTOISE_ORM = {
    "connections": {
        "default": f"postgres://{settings.POSTGRES_DB}:{settings.POSTGRES_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.POSTGRES_USER}"
    },
    "apps": {
        "models": {
            "models": [
                "app.models.articles",
                "app.models.albums",
                "app.models.users",
                "app.models.tokens",
                "aerich.models",
            ],
            "default_connection": "default",
        },
    },
}
