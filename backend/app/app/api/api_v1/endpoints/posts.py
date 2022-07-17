from enum import Enum
from typing import List

from api.deps import check_root_user
from core.errors import Errors
from core.file_manager import delete_files, save_files, update_files
from crud.crud_post import post
from fastapi import APIRouter, Depends, UploadFile, status
from schemas.post import CreatePost, DeletePost, PostBase, PostType, UpdatePost


class Post(Enum):
    case = "cases"
    article = "articles"


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


@router.post("/{post_type}/{id}/file/", status_code=status.HTTP_201_CREATED)
async def upload_files(
    id: int, post_type: Post, files: List[UploadFile], _=Depends(check_root_user)
):
    match post_type:
        case Post.case:
            await save_files(files, post_type.case.value, id)
        case Post.article:
            await save_files(files, post_type.article.value, id)
        case _:
            raise Errors.bad_req
    return {"success": True}


@router.put("/{post_type}/{id}/file/")
async def change_files(
    id: int,
    post_type: Post,
    indexes: str,
    files: List[UploadFile],
    _=Depends(check_root_user),
):
    match post_type:
        case Post.case:
            await update_files(files, post_type.case.value, id, indexes)
        case Post.article:
            await update_files(files, post_type.article.value, id, indexes)
        case _:
            raise Errors.bad_req
    return {"success": True}


@router.delete("/{post_type}/{id}/file/")
def remove_files(post_type: Post, id: int, _=Depends(check_root_user)):
    match post_type:
        case Post.case:
            delete_files(post_type.case.value, id)
        case Post.article:
            delete_files(post_type.article.value, id)
        case _:
            raise Errors.bad_req
    return {"success": True}
