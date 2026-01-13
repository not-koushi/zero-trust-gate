# ZeroTrustGate

A Zero Trust API Gateway that enforces continuous authentication and authorization
for every request, even after login.

## Architecture Overview

ZeroTrustGate follows a strict Zero Trust model:
- No request is trusted by default
- Every request is verified at the gateway
- Authorization is delegated to a dedicated Auth Service
- Metrics are collected for observability

### Components

- **API Gateway (Node.js)**
  - Entry point for all requests
  - Performs token presence and freshness checks
  - Enforces context validation
  - Exposes Prometheus metrics

- **Auth Service (FastAPI)**
  - Issues JWTs
  - Verifies JWT signatures and claims
  - Applies role-based access policies

- **Frontend (Next.js)**
  - Demonstrates login
  - Displays security metrics

- **Monitoring (Prometheus)**
  - Scrapes gateway metrics
  - Tracks authentication failures

## Trust Model

No internal service trusts another service blindly.
Every decision is explicit and verifiable.

---

## 🔐 Authentication Flow (Current)
1. A client authenticates via the Auth Service and receives a signed JWT.
2. All client requests pass through the API Gateway.
3. The API Gateway:
- Requires a JWT on every request
- Rejects expired or malformed tokens
4. The API Gateway delegates authorization to the Auth Service.
5. Access is granted only if all checks pass.

##🧱 Components Implemented
#### 🟦 Auth Service (FastAPI)
- Issues JWTs with a fixed, documented structure
- Verifies JWT signatures and required claims
- Decides allow/deny for each request
- Exposes OpenAPI/Swagger documentation

#### 🟩 API Gateway (Node.js + Fastify)
- Acts as the single entry point
- Enforces token presence
- Enforces token expiration
- Delegates authorization decisions
- Does not trust token payloads blindly

#### 📜 JWT Claims (Enforced)

Each token includes:
- `sub` — user identifier
- `role` — authorization role
- `iat` — issued-at timestamp
- `exp` — expiration timestamp
- `ip_hash` — hashed client IP
- `ua_hash` — hashed User-Agent
Token lifetime is fixed to 15 minutes.


## 🚫 What Is Intentionally Not Implemented Yet
To maintain clarity and scope discipline, the following are deliberately deferred:
- IP / User-Agent context verification
- - Metrics and observability 
- Frontend dashboard (later phase)
This ensures each security layer is added intentionally and correctly.


## 🏁 Current Status
- Zero Trust authentication flow: Implemented
- Service-to-service contracts: Locked
- Token misuse and expiration: Handled
- System ready for hardening: Yes
