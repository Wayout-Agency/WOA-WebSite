from enum import Enum
from typing import List

from api.deps import check_root_user
from crud.crud_post import post
from fastapi import APIRouter, Depends, status
from schemas.post import CreatePost, DeletePost, PostBase, PostType, UpdatePost


class Post(Enum):
    case = "case"
    article = "article"


router = APIRouter()


@router.get("/{post_type}/", response_model=List[PostBase])
async def get_all(post_type: PostType):
    return await post.get_all(post_type)


@router.post(
    "/{post_type}/", response_model=PostBase, status_code=status.HTTP_201_CREATED
)
async def create_post(
    schema: CreatePost, post_type: PostType, _=Depends(check_root_user)
):
    return await post.create(post_type, schema)


@router.get("/{post_type}/{id}/", response_model=PostBase)
async def get_post(id: int, post_type: PostType):
    return await post.get_by_id(post_type, id)


@router.put("/{post_type}/{id}/", response_model=PostBase)
async def update_post(
    id: int, schema: UpdatePost, post_type: PostType, _=Depends(check_root_user)
):
    return await post.update(post_type, id, schema)


@router.delete("/{post_type}/{id}/", response_model=DeletePost)
async def delete_post(id: int, post_type: PostType, _=Depends(check_root_user)):
    return await post.delete(post_type, id)
