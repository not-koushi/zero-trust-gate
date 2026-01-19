# 🔐 ZeroTrustGate  
**A Context-Aware Zero Trust API Gateway with Observability**

ZeroTrustGate is a production-style Zero Trust gateway that enforces **per-request authentication, authorization, and context validation**, while providing **real-time security observability** through Prometheus and Grafana.

The project demonstrates how Zero Trust principles work **in practice**, including token replay protection, context binding, and measurable security signals — all orchestrated with Docker Compose.

---

## 🚀 Key Features

### 🔒 Zero Trust Enforcement
- No implicit trust after authentication
- Every request must present a valid JWT
- Role-based authorization at the gateway
- Explicit failure paths (401 / 403)

### 🧠 Context-Aware Security
- JWTs are bound to **User-Agent context**
- Token replay attempts from different clients are blocked
- Designed to work correctly in containerized / proxy environments

### 📊 Security Observability
- Prometheus metrics exposed via `/metrics`
- Accurate counters for:
  - Total gateway requests
  - Authentication failures
  - Expired token rejections
- Grafana dashboards for real-time visibility

### 🐳 Infrastructure-Ready
- Dockerfiles for all services
- Docker Compose orchestration
- Persistent volumes for Prometheus and Grafana
- One-command startup and shutdown

---

## 🧱 Architecture Overview

```
Browser / Client
       |
       v
+-------------------+
|   Auth Service    |  (FastAPI)
|  Issues JWTs      |
+-------------------+
       |
       v
+-------------------+
|  API Gateway      |  (Node.js / Fastify)
|  - Auth Check     |
|  - Authorization  |
|  - Context Check  |
+-------------------+
       |
       v
+-------------------+
| Protected APIs    |
+-------------------+

Gateway Metrics → Prometheus → Grafana
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-----|-----------|
| Auth Service | Python, FastAPI |
| API Gateway | Node.js, Fastify |
| Frontend | Next.js (minimal demo client) |
| Metrics | Prometheus |
| Dashboards | Grafana |
| Orchestration | Docker Compose |

---

## 📁 Repository Structure

```
zero-trust-gate/
├── auth-service/
├── gateway/
├── frontend/
├── prometheus/
├── docker-compose.yml
└── README.md
```

---

## ▶️ Running the Project

```bash
docker compose up --build
```

---

## 📈 Project Status

✔ Feature complete  
✔ Demo ready  
✔ Dockerized  
✔ Observable  
✔ Interview-defensible  

---

## 🧑‍💻 Author

_**Koushik Panchadarla**_
Built as a security-focused backend infrastructure project to demonstrate **Zero Trust principles in real systems**.
