from tortoise import fields
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model


class User(Model):
    id = fields.IntField(pk=True)
    login = fields.CharField(max_length=100, unique=True)
    password = fields.CharField(max_length=300)


GetUser = pydantic_model_creator(User, name="GetUser")
