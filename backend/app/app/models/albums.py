from tortoise.models import Model
from tortoise import fields


class Almbum(Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=300)
    description = fields.TextField()
    new_price = fields.IntField()
    old_price = fields.IntField()
    sale_text = fields.CharField(max_length=300)
    link = fields.CharField(max_length=200)


class PriceInclude(Model):
    id = fields.IntField(pk=True)
    text = fields.CharField(max_length=500)
    album_id: fields.ForeignKeyRelation[Almbum] = fields.ForeignKeyField(
        model_name="models.Album", related_name="price_includes"
    )


class AlbumDeskription(Model):
    id = fields.IntField(pk=True)
    text = fields.CharField(max_length=500)
    album_id: fields.ForeignKeyRelation[Almbum] = fields.ForeignKeyField(
        model_name="models.Album", related_name="album_deskriptions"
    )
