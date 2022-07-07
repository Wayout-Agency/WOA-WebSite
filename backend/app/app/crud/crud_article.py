from typing import List

from crud.base import CRUDBase
from models.articles import Article, GetArticle
from schemas.article import ArticleBase, CreateArticle, DeleteArticle, UpdateArticle


class CRUDarticle(CRUDBase):
    def __init__(self, model: Article) -> None:
        self.model = model

    async def create(self, schema: CreateArticle) -> ArticleBase:
        article = await self.model.create(**schema)
        return await GetArticle.from_tortoise_orm(article)

    async def get_all(self) -> List[ArticleBase]:
        articles = await self.model.all()
        return [await GetArticle.from_tortoise_orm(article) for article in articles]

    async def get_by_id(self, id: int) -> ArticleBase:
        article = await self.model.get_or_none(id=id)
        return await GetArticle.from_tortoise_orm(article)

    async def update(self, id: int, schema: UpdateArticle) -> ArticleBase:
        album = await self.model.filter(id=id).update(**schema.dict())
        return await GetArticle.from_tortoise_orm(album)

    async def delete(self, id: int) -> ArticleBase:
        await self.model.delete(id=id)
        return DeleteArticle(succces=True)


article = CRUDarticle(Article)
