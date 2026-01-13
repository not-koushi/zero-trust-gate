import time
import hashlib
from jose import jwt
from app.config import JWT_SECRET, JWT_ALGORITHM, JWT_EXP_MINUTES

def hash_value(value: str) -> str:
    return hashlib.sha256(value.encode()).hexdigest()

def create_token(user_id: str, role: str, ip: str, user_agent: str) -> str:
    now = int(time.time())
    payload = {
        "sub": user_id,
        "role": role,
        "iat": now,
        "exp": now + (JWT_EXP_MINUTES * 60),
        "ip_hash": hash_value(ip),
        "ua_hash": hash_value(user_agent)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_token(token: str):
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])