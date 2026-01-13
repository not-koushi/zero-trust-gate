from fastapi import APIRouter, Request, HTTPException
from app.jwt_utils import create_token, verify_token
from app.models import LoginRequest, VerifyRequest

router = APIRouter()

@router.post("/login")
async def login(data: LoginRequest, request: Request):
    ip = request.client.host
    user_agent = request.headers.get("user-agent", "")

    token = create_token(
        user_id=data.user_id,
        role=data.role,
        ip=ip,
        user_agent=user_agent
    )

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