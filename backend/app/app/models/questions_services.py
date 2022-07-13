from enum import Enum

from tortoise import fields
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model


class QSType(str, Enum):
    question = "question"
    service = "service"


class QuestionService(Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=500)
    text = fields.CharField(max_length=500)
    type = fields.CharEnumField(enum_type=QSType)

    def __str__(self) -> str:
        return self.title


# pydantic_model_creator is not generating tortoise.field.CharEnumField as enumeration
# https://github.com/tortoise/tortoise-orm/issues/601
# GetQuestionService = pydantic_model_creator(QuestionService, name="GetQuestionService")
