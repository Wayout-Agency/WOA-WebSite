from tortoise import fields
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model


class Token(Model):
    id = fields.IntField(pk=True)
    value = fields.CharField(max_length=600)


GetToken = pydantic_model_creator(Token, name="GetToken")
