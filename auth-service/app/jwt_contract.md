# JWT Contract

All authentication tokens must follow this structure.

## Header
- alg: HS256
- typ: JWT

## Payload Claims

| Claim | Description |
|-----|------------|
| sub | User ID |
| role | User role (admin/user) |
| iat | Issued at (unix) |
| exp | Expiration time (unix) |
| ip_hash | Hash of client IP |
| ua_hash | Hash of User-Agent |

## Rules
- Tokens expire in 15 minutes
- Any missing claim results in denial
- Gateway enforces freshness
- Auth Service enforces validity