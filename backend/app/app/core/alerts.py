from aiogram import Bot

from .config import get_settings

settings = get_settings()


async def alert(message):
    operator = Bot(settings.BOT_TOKEN)
    for id in settings.USER_IDS:
      await operator.send_message(id, message)
