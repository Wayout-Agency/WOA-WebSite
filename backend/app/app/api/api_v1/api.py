from fastapi import APIRouter

from .endpoints import albums, lead, posts, questions_services, tokens

api_router = APIRouter()
api_router.include_router(tokens.router, prefix="/token", tags=["token"])
api_router.include_router(lead.router, prefix="/lead-catch", tags=["lead_catch"])
api_router.include_router(albums.router, prefix="/albums", tags=["albums"])
api_router.include_router(posts.router, prefix="/posts", tags=["post"])
api_router.include_router(
    questions_services.router, prefix="/questions-services", tags=["questions_services"]
)
