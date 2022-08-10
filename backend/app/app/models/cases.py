from tortoise import fields
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model


class Case(Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=300)
    description = fields.CharField(max_length=200)
    created_at = fields.DateField()
    time_to_read = fields.SmallIntField()
    slug = fields.CharField(max_length=200, unique=True)
    task = fields.CharField(max_length=500)
    process = fields.CharField(max_length=500)

    def __str__(self) -> str:
        return self.title


GetCase = pydantic_model_creator(Case, name="GetCase")
