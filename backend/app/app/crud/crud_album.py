from typing import List

from core.errors import Errors
from crud.base import CRUDBase
from models.albums import Album, GetAlbum
from schemas.album import AlbumBase, CreateAlbum, DeleteAlbum, UpdateAlbum
from tortoise.exceptions import DoesNotExist


class CRUDAlbum(CRUDBase):
    def __init__(self, model: Album) -> None:
        self.model = model

    async def create(self, schema: CreateAlbum) -> AlbumBase:
        album = await self.model.create(**schema.dict())
        return await GetAlbum.from_tortoise_orm(album)

    async def get_all(self) -> List[AlbumBase]:
        albums = await self.model.all()
        return [await GetAlbum.from_tortoise_orm(album) for album in albums]

    async def get_by_id(self, id: int) -> AlbumBase:
        try:
            album = await self.model.get(id=id)
            return await GetAlbum.from_tortoise_orm(album)
        except DoesNotExist:
            raise Errors.not_found

    async def update(self, id: int, schema: UpdateAlbum) -> AlbumBase:
        await self.model.filter(id=id).update(**schema.dict())
        return await self.get_by_id(id)

    async def delete(self, id: int) -> DeleteAlbum:
        await self.model.filter(id=id).delete()
        return DeleteAlbum(success=True)


album = CRUDAlbum(Album)
