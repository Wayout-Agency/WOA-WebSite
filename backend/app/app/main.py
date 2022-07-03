from fastapi import FastAPI
from api.api_v1.api import api_router
from core.database import init_db
from core.config import get_settings

settings = get_settings()
app = FastAPI()


@app.on_event("startup")
async def db_load():
    await init_db()


app.include_router(api_router, prefix=settings.API_V1_STR)
