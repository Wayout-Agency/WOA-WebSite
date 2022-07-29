from tortoise import fields
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model


class Album(Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=300)
    description = fields.TextField()
    new_price = fields.IntField()
    old_price = fields.IntField()
    sale_text = fields.CharField(max_length=300)
    slug = fields.CharField(max_length=200)
    price_include = fields.CharField(max_length=500)
    model_description = fields.CharField(max_length=500)
    separation = fields.SmallIntField()

    def __str__(self):
        return self.title


GetAlbum = pydantic_model_creator(Album, name="GetAlbum")
