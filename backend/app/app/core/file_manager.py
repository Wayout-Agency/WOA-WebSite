import os
import shutil
from pathlib import Path
from typing import List
import glob

import aiofiles
from fastapi import UploadFile

from .config import get_settings
from .errors import Errors

settings = get_settings()


def init_media():
    try:
        Path(settings.UPLOAD_DIRECTORY).mkdir(parents=True, exist_ok=True)
        for directory in ("albums", "cases", "articles"):
            Path(settings.UPLOAD_DIRECTORY / directory).mkdir(parents=True, exist_ok=True)
    except FileExistsError:
        pass


async def _save_file(file: UploadFile, file_path: str, filename):
    try:
        files = sorted(os.listdir(file_path))
        if int(filename[0]) <= len(files) - 1:
            _, ext1 = os.path.splitext(files[int(filename[0])])
            _, ext2 = os.path.splitext(filename)
            if ext1 != ext2:
                os.remove(file_path / files[int(filename[0])])
        async with aiofiles.open(file_path / filename, "wb") as out_file:
            await out_file.write(await file.read())
    except FileNotFoundError:
        raise Errors.bad_req


def _rename_files(files: List[UploadFile], indexes: str) -> List[UploadFile]:
    list_indexes = list(map(lambda i: int(i), indexes))
    for i in range(len(files)):
        file_data = files[i].filename.split(".")
        file_data[0] = f"{list_indexes[i]}"
        files[i].filename = ".".join(file_data)
    return files


def get_files_info(dy_type: str, id: int) -> int:
    try:
        return len(os.listdir(settings.UPLOAD_DIRECTORY / dy_type / str(id)))
    except FileNotFoundError:
        return 0


def get_filename(dy_type: str, id: int, file_id: int) -> str:
    try:
        file = glob.glob(settings.UPLOAD_DIRECTORY / dy_type / f"{id}" / f"{file_id}.*")
        if file:
            return file[0]
        raise FileNotFoundError
    except (FileNotFoundError, IndexError):
        raise Errors.bad_req


async def save_files(files: List[UploadFile], dy_type: str, id: int):
    try:
        os.mkdir(settings.UPLOAD_DIRECTORY / dy_type / str(id))
        files = _rename_files(files, range(len(files)))
        for file in files:
            file_path = settings.UPLOAD_DIRECTORY / dy_type / str(id)
            await _save_file(file, file_path, file.filename)
    except FileExistsError:
        raise Errors.bad_req


async def update_files(files: List[UploadFile], dy_type: str, id: int, indexes: str, separation: int = 0):
    try:
        renamed_files = _rename_files(files, indexes)
        files_path = settings.UPLOAD_DIRECTORY / dy_type / str(id)
        if separation:
            current_files = sorted(os.listdir(settings.UPLOAD_DIRECTORY / dy_type / str(id)))[separation:]
            for file in current_files[::-1]:
                _, extension = os.path.splitext(file)
                os.rename(
                    files_path / file,
                    files_path / f"{int(file[0]) + 1}{extension}",
                )
        for file in renamed_files:
            await _save_file(file, files_path, file.filename)
    except FileExistsError:
        raise Errors.bad_req


def _update_file_order_after_delete(dy_type: str, id: int):
    files = sorted(os.listdir(settings.UPLOAD_DIRECTORY / dy_type / str(id)))
    files_dir = settings.UPLOAD_DIRECTORY / dy_type / str(id)
    for i in range(len(files)):
        _, extension = os.path.splitext(files[i])
        os.rename(files_dir / files[i], files_dir / f"{i}{extension}")


def delete_file(dy_type: str, id: int, indexes: str | None):
    if indexes:
        file = get_filename(dy_type, id, int(indexes))
        os.remove(settings.UPLOAD_DIRECTORY / dy_type / str(id) / file)
        _update_file_order_after_delete(dy_type, id)
    else:
        try:
            shutil.rmtree(settings.UPLOAD_DIRECTORY / dy_type / str(id))
        except FileNotFoundError:
            raise Errors.bad_req
