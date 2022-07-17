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


class ArticleBase(Article):
    id: int


class CreateArticle(Article):
    pass


class UpdateArticle(Article):
    pass
