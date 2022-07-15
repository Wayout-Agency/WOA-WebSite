import os
import shutil
from typing import List

import aiofiles
from core.config import get_settings
from fastapi import UploadFile

settings = get_settings()


def init_media():
    try:
        os.mkdir(settings.UPLOAD_DIRECTORY)
        for directory in ("albums", "cases", "articles"):
            os.mkdir(settings.UPLOAD_DIRECTORY / directory)
    except FileExistsError:
        pass


async def _save_file(file: UploadFile, file_path: str):
    async with aiofiles.open(file_path, "wb") as out_file:
        await out_file.write(await file.read())


async def save_files(files: List[UploadFile], dy_type: str, id: int):
    try:
        os.mkdir(settings.UPLOAD_DIRECTORY / dy_type / str(id))
        for ind in range(len(files)):
            file_path = (
                settings.UPLOAD_DIRECTORY
                / dy_type
                / str(id)
                / "{}_file.{}".format(ind, files[ind].filename.split(".")[1])
            )
            await _save_file(files[ind], file_path)
    except FileExistsError:
        pass


async def update_files(files: List[UploadFile], dy_type: str, id: int):
    for file in files:
        file_path = settings.UPLOAD_DIRECTORY / dy_type / str(id)
        await _save_file(file, file_path / file.filename)


def delete_files(dy_type: str, id: int):
    shutil.rmtree(settings.UPLOAD_DIRECTORY / dy_type / str(id))
