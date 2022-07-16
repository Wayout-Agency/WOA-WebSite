from copy import copy
from operator import le
from typing import List

from api.deps import check_root_user
from core.file_manager import delete_files, save_files, update_files
from crud.crud_album import album
from fastapi import APIRouter, Depends, UploadFile, status
from schemas.album import AlbumBase, CreateAlbum, DeleteAlbum, UpdateAlbum

router = APIRouter()


@router.get("/", response_model=List[AlbumBase])
async def get_all():
    return await album.get_all()


@router.post("/", response_model=AlbumBase, status_code=status.HTTP_201_CREATED)
async def create_album(schema: CreateAlbum, _=Depends(check_root_user)):
    return await album.create(schema)


@router.get("/{id}/", response_model=AlbumBase)
async def get_album(id: int):
    return await album.get_by_id(id)


@router.put("/{id}/", response_model=AlbumBase)
async def update_album(id: int, schema: UpdateAlbum, _=Depends(check_root_user)):
    return await album.update(id, schema)


@router.delete("/{id}/", response_model=DeleteAlbum, status_code=status.HTTP_200_OK)
async def delete_album(id: int, _=Depends(check_root_user)):
    return await album.delete(id)


@router.post("/{id}/file/", status_code=status.HTTP_201_CREATED)
async def upload_files(id: int, files: List[UploadFile], _=Depends(check_root_user)):
    await save_files(files, "albums", id)
    return {"success": True}


@router.put("/{id}/file/")
async def change_files(
    id: int, indexes: str, files: List[UploadFile], _=Depends(check_root_user)
):
    await update_files(files, "albums", id, indexes)
    return {"success": True}


@router.delete("/{id}/file/")
def remove_files(id: int, _=Depends(check_root_user)):
    delete_files("albums", id)
    return {"success": True}
