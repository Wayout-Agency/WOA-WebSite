from tortoise import Tortoise

from .config import get_settings

settings = get_settings()
DB_URL = "postgres://{}:{}@{}:{}/{}".format(
    settings.POSTGRES_USER,
    settings.POSTGRES_PASSWORD,
    settings.DB_HOST,
    settings.DB_PORT,
    settings.POSTGRES_DB,
)


async def init_db():
    await Tortoise.init(
        db_url=DB_URL,
        modules={
            "models": [
                "models.albums",
                "models.users",
                "models.tokens",
                "models.articles",
                "models.cases",
                "models.questions_services",
            ]
        },
    )
    await Tortoise.generate_schemas()


TORTOISE_ORM = {
    "connections": {"default": DB_URL},
    "apps": {
        "models": {
            "models": [
                "models.articles",
                "models.cases",
                "models.albums",
                "models.users",
                "models.tokens",
                "models.questions_services",
                "aerich.models",
            ],
            "default_connection": "default",
        },
    },
}
