from typing import List, NamedTuple

from core.errors import Errors
from crud.base import CRUDBase
from models.articles import Article, GetArticle
from models.cases import Case, GetCase
from schemas.post import CreatePost, DeletePost, PostBaseData, PostType, UpdatePost
from tortoise.exceptions import DoesNotExist, IntegrityError, ValidationError


class PostTool(NamedTuple):
    post_model: Article | Case
    get_post_model: GetArticle | GetCase


class CRUDPost(CRUDBase):
    def _get_model(self, post_type: PostType) -> PostTool:
        match post_type:
            case PostType.case:
                return PostTool(post_model=Case, get_post_model=GetCase)
            case PostType.article:
                return PostTool(post_model=Article, get_post_model=GetArticle)
            case _:
                raise Errors.not_found

    async def create(self, post_type: PostType, schema: CreatePost) -> PostBaseData:
        model: PostTool = self._get_model(post_type)
        try:
            model_obj = await model.post_model.create(**schema.dict()["value"])
            return PostBaseData(
                value=await model.get_post_model.from_tortoise_orm(model_obj)
            )
        except (ValidationError, IntegrityError):
            raise Errors.valid_error

    async def get_all(self, post_type: PostType) -> List[PostBaseData]:
        model: PostTool = self._get_model(post_type)
        model_objs = await model.post_model.all().order_by('-created_at')
        return [
            PostBaseData(value=await model.get_post_model.from_tortoise_orm(model_obj))
            for model_obj in model_objs
        ]

    async def get(self, post_type: PostType, get_type: str) -> PostBaseData:
        model: PostTool = self._get_model(post_type)
        try:   
            if get_type.isdigit():
                model_obj = await model.post_model.get(id=int(get_type))
            else:
                model_obj = await model.post_model.get(slug=get_type)
            return PostBaseData(
                value=await model.get_post_model.from_tortoise_orm(model_obj)
            )
        except DoesNotExist:
            raise Errors.not_found

    async def update(
        self, post_type: PostType, id: int, schema: UpdatePost
    ) -> PostBaseData:
        model: PostTool = self._get_model(post_type)
        await model.post_model.filter(id=id).update(**schema.dict()["value"])
        return await self.get(post_type, str(id))

    async def delete(self, post_type: PostType, id: int) -> DeletePost:
        model: PostTool = self._get_model(post_type)
        await model.post_model.filter(id=id).delete()
        return DeletePost(success=True)


post = CRUDPost()
