import os
import shutil
from typing import List

import aiofiles
from fastapi import UploadFile

from .config import get_settings
from .errors import Errors

settings = get_settings()


def init_media():
    try:
        os.mkdir(settings.UPLOAD_DIRECTORY)
        for directory in ("albums", "cases", "articles"):
            os.mkdir(settings.UPLOAD_DIRECTORY / directory)
    except FileExistsError:
        pass


async def _save_file(file: UploadFile, file_path: str):
    try:
        async with aiofiles.open(file_path, "wb") as out_file:
            await out_file.write(await file.read())
    except FileNotFoundError:
        raise Errors.bad_req


def _rename_files(files: List[UploadFile], indexes: str) -> List[UploadFile]:
    list_indexes = list(map(lambda i: int(i), indexes))
    for i in range(len(files)):
        file_data = files[i].filename.split(".")
        file_data[0] = f"{list_indexes[i]}_file"
        files[i].filename = ".".join(file_data)
    return files


def get_files_info(dy_type: str, id: int) -> int:
    try:
        return len(os.listdir(settings.UPLOAD_DIRECTORY / dy_type / str(id)))
    except FileNotFoundError:
        return 0


def get_filename(dy_type: str, id: int, file_id: int) -> str:
    try:
        name = sorted(os.listdir(settings.UPLOAD_DIRECTORY / dy_type / str(id)))[
            file_id
        ]
        return name
    except (FileNotFoundError, IndexError):
        raise Errors.bad_req


async def save_files(files: List[UploadFile], dy_type: str, id: int):
    try:
        os.mkdir(settings.UPLOAD_DIRECTORY / dy_type / str(id))
        files = _rename_files(files, range(len(files)))
        for file in files:
            file_path = settings.UPLOAD_DIRECTORY / dy_type / str(id) / file.filename
            await _save_file(file, file_path)
    except FileExistsError:
        raise Errors.bad_req


async def update_files(files: List[UploadFile], dy_type: str, id: int, indexes: str):
    files = _rename_files(files, indexes)
    for file in files:
        file_path = settings.UPLOAD_DIRECTORY / dy_type / str(id)
        await _save_file(file, file_path / file.filename)


def delete_files(dy_type: str, id: int):
    try:
        shutil.rmtree(settings.UPLOAD_DIRECTORY / dy_type / str(id))
    except FileNotFoundError:
        raise Errors.bad_req
