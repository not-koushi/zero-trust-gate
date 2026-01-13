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