from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr

router = APIRouter()

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

@router.post('/contact')
async def contact(form: ContactForm):
    # All fields are validated by Pydantic
    # Here you could add logic to save to DB, send email, etc.
    return {"status": "success", "message": "Your message has been received!"} 