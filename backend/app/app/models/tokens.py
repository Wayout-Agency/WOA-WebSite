from tortoise.models import Model
from tortoise import fields


class Token(Model):
    id = fields.IntField(pk=True)
    value = fields.CharField(max_length=600)
