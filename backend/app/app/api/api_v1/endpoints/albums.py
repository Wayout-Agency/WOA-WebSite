from fastapi import APIRouter
from crud.crud_album import album
from schemas.album import AlbumBase, CreateAlbum, UpdateAlbum, DeleteAlbum
from typing import List

router = APIRouter()


@router.get("/", response_model=List[AlbumBase])
async def get_all():
    return await album.get_all()


@router.post("/", response_model=AlbumBase)
async def create_album(schema: CreateAlbum):
    return await album.create(schema)


@router.get("/{id}", response_model=AlbumBase)
async def get_album(id: int):
    return await album.get_by_id(id)


@router.put("/{id}", response_model=AlbumBase)
async def update_album(id: int, schema: UpdateAlbum):
    return await album.update(id, schema)


@router.delete("/{id}", response_model=DeleteAlbum)
async def delete_album(id: int):
    return await album.delete(id)
