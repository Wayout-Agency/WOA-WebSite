from api.api_v1.api import api_router
from core.config import get_settings
from core.database import init_db
from core.file_manager import init_media
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from starlette.requests import Request
from starlette.responses import Response
from tortoise import Tortoise

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
settings = get_settings()


async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as ex:
        print(ex)
        return Response(content="Something went wrong", status_code=400)

app.middleware("http")(catch_exceptions_middleware)



@app.on_event("startup")
async def db_load():
    init_media()
    await init_db()


@app.on_event("shutdown")
async def db_close():
    await Tortoise.close_connections()


app.include_router(api_router, prefix=settings.API_V1_STR)
