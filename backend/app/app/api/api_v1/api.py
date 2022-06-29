from fastapi import APIRouter
from api.api_v1.endpoints import test

api_router = APIRouter()
api_router.include_router(test.router, tags=["test"])
