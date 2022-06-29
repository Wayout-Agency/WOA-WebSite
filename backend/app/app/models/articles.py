from tortoise.models import Model
from tortoise import fields
from datetime import datetime


class Article(Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=300)
    autor = fields.CharField(max_length=200)
    created_at = fields.DateField(default=datetime.now().date())
    time_to_read = fields.SmallIntField()
    link = fields.CharField(max_length=200)


class ArticleText(Model):
    id = fields.IntField(pk=True)
    text = fields.TextField()
    article_id: fields.ForeignKeyRelation[Article] = fields.ForeignKeyField(
        model_name="models.Article", related_name="article_texts"
    )
