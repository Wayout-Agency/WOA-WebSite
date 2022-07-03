from tortoise import Tortoise
from .config import get_settings


async def init_db():
    settings = get_settings()
    await Tortoise.init(
        db_url=f"postgres://{settings.POSTGRES_DB}:{settings.POSTGRES_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.POSTGRES_USER}",
        modules={
            "models": [
                "models.albums",
            ]
        },
    )
    await Tortoise.generate_schemas()
