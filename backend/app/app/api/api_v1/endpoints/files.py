from enum import Enum
from typing import List

from api.deps import check_root_user
from core.config import get_settings
from core.file_manager import delete_files, get_filename, save_files, update_files
from fastapi import APIRouter, Depends, UploadFile, status
from fastapi.responses import FileResponse

settings = get_settings()
router = APIRouter()


class FileType(Enum):
    albums = "albums"
    cases = "cases"
    articles = "articles"


@router.get("/{file_type}/{id}/{file_id}/")
async def get_file(file_type: FileType, id: int, file_id: int):
    return FileResponse(
        (settings.UPLOAD_DIRECTORY / file_type.value / str(id) / get_filename(file_type.value, id, file_id))
    )


@router.post("/{file_type}/{id}/", status_code=status.HTTP_201_CREATED)
async def upload_files(file_type: FileType, id: int, files: List[UploadFile], _=Depends(check_root_user)):
    await save_files(files, file_type.value, id)
    return {"success": True}


@router.put("/{file_type}/{id}/")
async def change_files(
    file_type: FileType,
    id: int,
    indexes: str,
    files: List[UploadFile],
    separation: int = 0,
    _=Depends(check_root_user),
):
    await update_files(files, file_type.value, id, indexes, separation)
    return {"success": True}


@router.delete("/{file_type}/{id}/")
def remove_files(file_type: FileType, id: int, indexes: str | None = None, _=Depends(check_root_user)):
    delete_files(file_type.value, id, indexes)
    return {"success": True}
