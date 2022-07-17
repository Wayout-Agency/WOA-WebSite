from core.lead_manager import get_lead_catch, update_lead_catch
from fastapi import APIRouter
from schemas.lead_catch import Lead, UpdateLead

router = APIRouter()


@router.get("/", response_model=Lead)
async def get_token():
    lead_catch = await get_lead_catch()
    return Lead(value=lead_catch)


@router.put("/", response_model=Lead)
async def update_token(schema: UpdateLead):
    lead_catch = await update_lead_catch(schema.new_value)
    return Lead(value=lead_catch)
