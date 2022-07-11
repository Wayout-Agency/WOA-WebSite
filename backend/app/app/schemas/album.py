from pydantic import BaseModel


class Album(BaseModel):
    title: str
    description: str
    new_price: int
    old_price: int
    sale_text: str
    slug: str
    price_include: str
    model_description: str


class AlbumBase(Album):
    id: int


class CreateAlbum(Album):
    pass


class UpdateAlbum(Album):
    pass


class DeleteAlbum(BaseModel):
    success: bool


class AlbumTestData(BaseModel):
    value: CreateAlbum
