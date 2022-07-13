from models.questions_services import QSType
from pydantic import BaseModel


class QuestionService(BaseModel):
    title: str
    text: str
    type: QSType


class QuestionServiceBase(QuestionService):
    id: int


class CreateQuestionService(QuestionService):
    pass


class UpdateQuestionService(QuestionService):
    pass


class DeleteQuestionService(BaseModel):
    success: bool
