from tortoise.models import Model
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise import fields


class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=100)
    password = fields.CharField(max_length=300)


GetUser = pydantic_model_creator(User, name="GetUser")
