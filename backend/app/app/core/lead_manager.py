import json
import os
from pathlib import Path

import aiofiles

STATIC_DIR = os.path.join(Path(__file__).resolve().parent.parent, "static/lead.json")


async def get_lead_catch() -> str:
    async with aiofiles.open(STATIC_DIR, "r", encoding="utf-8") as f:
        data = await f.read()
    return json.loads(data)["lead_catch"]


async def update_lead_catch(new_lead: str) -> str:
    async with aiofiles.open(STATIC_DIR, "w", encoding="utf-8") as f:
        await f.write(json.dumps({"lead_catch": new_lead}))
    return await get_lead_catch()
