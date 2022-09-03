from typing import List

from core.errors import Errors
from crud.base import CRUDBase
from models.albums import Album, GetAlbum
from schemas.album import AlbumBaseData, CreateAlbum, DeleteAlbum, UpdateAlbum
from tortoise.exceptions import DoesNotExist, IntegrityError, ValidationError


class CRUDAlbum(CRUDBase):
    def __init__(self, model: Album) -> None:
        self.model = model

    async def create(self, schema: CreateAlbum) -> AlbumBaseData:
        try:
            album = await self.model.create(**schema.dict())
            return await GetAlbum.from_tortoise_orm(album)
        except (ValidationError, IntegrityError):
            raise Errors.valid_error

    async def get_all(self) -> List[AlbumBaseData]:
        albums = await self.model.all()
        return [await GetAlbum.from_tortoise_orm(album) for album in albums]

    async def get(self, get_type: str) -> AlbumBaseData:
        try:
            if get_type.isdigit():
                album = await self.model.get(id=int(get_type))
            else:
                album = await self.model.get(slug=get_type)
            return await GetAlbum.from_tortoise_orm(album)
        except DoesNotExist:
            raise Errors.not_found

    async def update(self, id: int, schema: UpdateAlbum) -> AlbumBaseData:
        try:
            await self.model.filter(id=id).update(**schema.dict())
            return await self.get(str(id))
        except ValidationError:
            raise Errors.valid_error

    async def delete(self, id: int) -> DeleteAlbum:
        await self.model.filter(id=id).delete()
        return DeleteAlbum(success=True)


album = CRUDAlbum(Album)
