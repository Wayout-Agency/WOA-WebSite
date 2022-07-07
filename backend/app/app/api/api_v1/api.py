from fastapi import APIRouter

from .endpoints import albums

api_router = APIRouter()
api_router.include_router(albums.router, prefix="/albums", tags=["albums"])
