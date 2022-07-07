from datetime import datetime

from tortoise import fields
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model


class Article(Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=300)
    autor = fields.CharField(max_length=200)
    created_at = fields.DateField(default=datetime.now().date())
    time_to_read = fields.SmallIntField()
    link = fields.CharField(max_length=200)
    text = fields.TextField()

    def __str__(self) -> str:
        return self.title


GetArticle = pydantic_model_creator(Article, name="GetArticle")
