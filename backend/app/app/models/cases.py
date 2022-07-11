from concurrent.futures import process
from datetime import datetime

from tortoise import fields
from tortoise.models import Model


class Case(Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=300)
    description = fields.CharField(max_length=200)
    created_at = fields.DateField(default=datetime.now().date())
    time_to_read = fields.SmallIntField()
    link = fields.CharField(max_length=200)
    task = fields.CharField(max_length=500)
    process = fields.CharField(max_length=500)
