from enum import Enum

from pydantic import BaseModel

from .article import *
from .case import *


class PostType(Enum):
    case = "cases"
    article = "articles"


class Post(BaseModel):
    value: Article | Case


class PostBaseData(BaseModel):
    value: ArticleBaseData | CaseBaseData


class PostBaseFull(BaseModel):
    value: ArticleBaseFull | CaseBaseFull


class UpdatePost(BaseModel):
    value: UpdateArticle | UpdateCase


class CreatePost(BaseModel):
    value: CreateArticle | CreateCase


class DeletePost(BaseModel):
    success: bool
