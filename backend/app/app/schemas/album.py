from pydantic import BaseModel
from this import d


class Album(BaseModel):
    title: str
    description: str
    new_price: int
    old_price: int
    sale_text: str
    slug: str
    price_include: str
    model_description: str
    separation: int


class AlbumBaseData(Album):
    id: int


class AlbumBaseFull(AlbumBaseData):
    files_quantity: int


class CreateAlbum(Album):
    pass


class UpdateAlbum(Album):
    pass


class DeleteAlbum(BaseModel):
    success: bool


class AlbumTestData(BaseModel):
    value: CreateAlbum
