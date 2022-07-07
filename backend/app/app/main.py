from api.api_v1.api import api_router
from core.config import get_settings
from core.database import init_db
from fastapi import FastAPI
from tortoise import Tortoise

settings = get_settings()
app = FastAPI()


@app.on_event("startup")
async def db_load():
    await init_db()


@app.on_event("shutdown")
async def db_close():
    await Tortoise.close_connections()


app.include_router(api_router, prefix=settings.API_V1_STR)
