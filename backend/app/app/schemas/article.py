from pydantic import BaseModel


class Article(BaseModel):
    title: str
    autor: str
    created_at: int
    time_to_read: int
    link: str
    text: str


class ArticleBase(Article):
    id: int


class CreateArticle(Article):
    pass


class UpdateArticle(Article):
    pass


class DeleteArticle(BaseModel):
    succces: bool
