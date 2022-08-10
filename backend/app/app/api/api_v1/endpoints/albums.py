from typing import List

from api.deps import check_root_user
from core.config import get_settings
from core.file_manager import get_files_info
from crud.crud_album import album
from fastapi import APIRouter, Depends, status
from schemas.album import (
    AlbumBaseData,
    AlbumBaseFull,
    CreateAlbum,
    DeleteAlbum,
    UpdateAlbum,
)

settings = get_settings()
router = APIRouter()


@router.get("/", response_model=List[AlbumBaseFull])
async def get_all():
    objs = await album.get_all()
    return list(
        map(
            lambda obj: {
                **dict(obj),
                "files_quantity": get_files_info("albums", obj.id),
            },
            objs,
        )
    )


@router.post("/", response_model=AlbumBaseData, status_code=status.HTTP_201_CREATED)
async def create_album(schema: CreateAlbum, _=Depends(check_root_user)):
    return await album.create(schema)


@router.get("/{get_type}/", response_model=AlbumBaseFull)
async def get_album(get_type: str):
    obj = await album.get(get_type)
    return {**dict(obj), "files_quantity": get_files_info("albums", obj.id)}


@router.put("/{id}/", response_model=AlbumBaseData)
async def update_album(id: int, schema: UpdateAlbum, _=Depends(check_root_user)):
    return await album.update(id, schema)


@router.delete("/{id}/", response_model=DeleteAlbum, status_code=status.HTTP_200_OK)
async def delete_album(id: int, _=Depends(check_root_user)):
    return await album.delete(id)
