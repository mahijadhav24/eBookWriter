# Backend (Auth)

This backend provides simple authentication using Express, Mongoose, JWT, and bcrypt.

## Requirements
- Node 18+
- MongoDB Atlas (set `MONGO_URI` in `.env`)
- `JWT_SECRET` set in `.env`

## Setup
1. Copy `.env.example` to `.env` and fill `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies: `npm install`
3. Start server: `npm run dev` (requires `MONGO_URI` to be set)

## Endpoints
- POST `/api/auth/register` { name, email, password }
- POST `/api/auth/login` { email, password }
- GET `/api/auth/me` (requires `Authorization: Bearer <token>`)

Note: The file-based fallback was removed — the app requires a MongoDB connection.
