from enum import Enum
from typing import List

from api.deps import check_root_user
from core.config import get_settings
from core.file_manager import get_files_info
from crud.crud_post import post
from fastapi import APIRouter, Depends, status
from schemas.post import (
    CreatePost,
    DeletePost,
    PostBaseData,
    PostBaseFull,
    PostType,
    UpdatePost,
)


class Post(Enum):
    case = "cases"
    article = "articles"


settings = get_settings()
router = APIRouter()


@router.get("/{post_type}/", response_model=List[PostBaseFull])
async def get_all(post_type: PostType):
    objs = await post.get_all(post_type)
    return list(
        map(
            lambda obj: {
                "value": {
                    **dict(obj.value),
                    "files_quantity": get_files_info(post_type.value, obj.value.id),
                }
            },
            objs,
        )
    )


@router.post(
    "/{post_type}/", response_model=PostBaseData, status_code=status.HTTP_201_CREATED
)
async def create_post(
    schema: CreatePost, post_type: PostType, _=Depends(check_root_user)
):
    return await post.create(post_type, schema)


@router.get("/{post_type}/{id}/", response_model=PostBaseFull)
async def get_post(id: int, post_type: PostType):
    obj = await post.get_by_id(post_type, id)
    return {
        "value": {
            **dict(obj.value),
            "files_quantity": get_files_info(post_type.value, obj.value.id),
        }
    }


@router.put("/{post_type}/{id}/", response_model=PostBaseData)
async def update_post(
    id: int, schema: UpdatePost, post_type: PostType, _=Depends(check_root_user)
):
    return await post.update(post_type, id, schema)


@router.delete("/{post_type}/{id}/", response_model=DeletePost)
async def delete_post(id: int, post_type: PostType, _=Depends(check_root_user)):
    return await post.delete(post_type, id)
