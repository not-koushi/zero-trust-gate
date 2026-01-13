# Auth Service API Contract

## POST /login
Issues a JWT after credential validation.

### Response
```json
{
  "access_token": "<jwt>",
  "token_type": "bearer"
}
```

## POST /verify
Validates a JWT and returns an authorization decision.

### Request
```json
{
  "token": "<jwt>"
}
```

### Response 
```json
{
  "allowed": true,
  "role": "user"
}
```

## Rules
- Gateway must block if allowed=false
- Auth Service never forwards requests