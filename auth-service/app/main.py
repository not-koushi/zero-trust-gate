from fastapi import FastAPI
from app.auth import router as auth_router

app = FastAPI(title="ZeroTrustGate Auth Service")

app.include_router(auth_router)