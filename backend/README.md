# Downbot Backend

JavaScript Express authentication backend with MongoDB.

## Run

```bash
cp .env.example .env
npm install
npm run dev
```

The API is at `/api/v1/auth`.

## Endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

Success response:

```json
{"success":true,"message":"Login successful","data":{}}
```

Failure response:

```json
{"success":false,"message":"Validation failed","errors":[{"field":"email","message":"Enter a valid email address"}]}
```
