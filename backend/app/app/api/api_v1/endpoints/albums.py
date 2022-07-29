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
from crud.crud_album import album
from fastapi import APIRouter, Depends, UploadFile, status
from fastapi.responses import FileResponse
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


@router.get("/{id}/", response_model=AlbumBaseFull)
async def get_album(id: int):
    obj = await album.get_by_id(id)
    return {**dict(obj), "files_quantity": get_files_info("albums", obj.id)}


@router.put("/{id}/", response_model=AlbumBaseData)
async def update_album(id: int, schema: UpdateAlbum, _=Depends(check_root_user)):
    return await album.update(id, schema)


@router.delete("/{id}/", response_model=DeleteAlbum, status_code=status.HTTP_200_OK)
async def delete_album(id: int, _=Depends(check_root_user)):
    return await album.delete(id)


@router.get("/{id}/file/{file_id}/")
async def get_file(id: int, file_id: int):
    return FileResponse(
        (
            settings.UPLOAD_DIRECTORY
            / "albums"
            / str(id)
            / get_filename("albums", id, file_id)
        )
    )


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
def remove_files(id: int, indexes: str | None = None, _=Depends(check_root_user)):
    delete_files("albums", id, indexes)
    return {"success": True}
