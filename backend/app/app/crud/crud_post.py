from typing import List, NamedTuple

from core.errors import Errors
from crud.base import CRUDBase
from models.articles import Article, GetArticle
from models.cases import Case, GetCase
from schemas.post import CreatePost, DeletePost, PostBase, PostType, UpdatePost
from tortoise.exceptions import DoesNotExist


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

    async def create(self, post_type: PostType, schema: CreatePost) -> PostBase:
        model: PostTool = self._get_model(post_type)
        model_obj = await model.post_model.create(**schema.dict()["value"])
        return PostBase(value=await model.get_post_model.from_tortoise_orm(model_obj))

    async def get_all(self, post_type: PostType) -> List[PostBase]:
        model: PostTool = self._get_model(post_type)
        model_objs = await model.post_model.all()
        return [
            PostBase(value=await model.get_post_model.from_tortoise_orm(model_obj))
            for model_obj in model_objs
        ]

    async def get_by_id(self, post_type: PostType, id: int) -> PostBase:
        model: PostTool = self._get_model(post_type)
        try:
            model_obj = await model.post_model.get(id=id)
            return PostBase(
                value=await model.get_post_model.from_tortoise_orm(model_obj)
            )
        except DoesNotExist:
            raise Errors.not_found

    async def update(
        self, post_type: PostType, id: int, schema: UpdatePost
    ) -> PostBase:
        model: PostTool = self._get_model(post_type)
        await model.post_model.filter(id=id).update(**schema.dict()["value"])
        return await self.get_by_id(post_type, id)

    async def delete(self, post_type: PostType, id: int) -> DeletePost:
        model: PostTool = self._get_model(post_type)
        await model.post_model.filter(id=id).delete()
        return DeletePost(success=True)


post = CRUDPost()
