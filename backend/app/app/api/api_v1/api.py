from fastapi import APIRouter

from .endpoints import albums, posts, tokens

api_router = APIRouter()
api_router.include_router(albums.router, prefix="/albums", tags=["albums"])
api_router.include_router(tokens.router, prefix="/token", tags=["token"])
api_router.include_router(posts.router, prefix="/posts", tags=["post"])
