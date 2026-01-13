from fastapi import APIRouter, Request, HTTPException
from app.jwt_utils import create_token, verify_token
from app.models import VerifyRequest

router = APIRouter()

@router.post("/login")
async def login(request: Request):
    body = await request.json()

    user_id = body.get("user_id")
    role = body.get("role")

    if not user_id or not role:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    ip = request.client.host
    user_agent = request.headers.get("user-agent", "")

    token = create_token(user_id, role, ip, user_agent)

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.post("/verify")
async def verify(data: VerifyRequest):
    try:
        payload = verify_token(data.token)
        return {
            "allowed": True,
            "role": payload.get("role")
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))