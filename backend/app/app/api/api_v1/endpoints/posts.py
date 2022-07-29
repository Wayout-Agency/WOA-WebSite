from enum import Enum
from typing import List

from api.deps import check_root_user
from core.config import get_settings
from core.file_manager import (
    delete_files,
    get_filename,
    get_files_info,
    save_files,
    update_files,
)
from crud.crud_post import post
from fastapi import APIRouter, Depends, UploadFile, status
from fastapi.responses import FileResponse
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


@router.get("/{post_type}/{id}/file/{file_id}")
async def get_file(id: int, post_type: Post, file_id: int):
    return FileResponse(
        (
            settings.UPLOAD_DIRECTORY
            / post_type.value
            / str(id)
            / get_filename(post_type.value, id, file_id)
        )
    )


@router.post("/{post_type}/{id}/file/", status_code=status.HTTP_201_CREATED)
async def upload_files(
    id: int, post_type: Post, files: List[UploadFile], _=Depends(check_root_user)
):
    await save_files(files, post_type.value, id)
    return {"success": True}


@router.put("/{post_type}/{id}/file/")
async def change_files(
    id: int,
    post_type: Post,
    indexes: str,
    files: List[UploadFile],
    _=Depends(check_root_user),
):
    await update_files(files, post_type.value, id, indexes)
    return {"success": True}


@router.delete("/{post_type}/{id}/file/")
def remove_files(
    post_type: Post, id: int, indexes: str | None = None, _=Depends(check_root_user)
):
    delete_files(post_type.value, id, indexes)
    return {"success": True}
