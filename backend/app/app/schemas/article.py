from datetime import date

from pydantic import BaseModel


class Article(BaseModel):
    title: str
    author: str
    created_at: date
    time_to_read: int
    slug: str
    introduction: str
    blocks: str


class ArticleBaseData(Article):
    id: int


class ArticleBaseFull(ArticleBaseData):
    files_quantity: int


class CreateArticle(Article):
    pass


class UpdateArticle(Article):
    pass
