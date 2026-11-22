# MyPortfolio – COMP229 (Assignments 1, 2 & 3)

MERN portfolio: React (Vite) client + Express/Mongoose API + JWT auth with user/admin roles.

## Run locally
```bash
npm install && npm install --prefix client
cp .env.example .env      # MONGO_URI empty = in-memory MongoDB (data resets on restart)
npm run dev               # API on :5001, React on http://localhost:5173
```
Production-style (one server): `npm run build && npm start` → http://localhost:5001

## Accounts
- Admin (seeded in the database on startup): `admin@portfolio.com` / `Admin@123` (change in `.env`)
- Anyone can **Sign up** (role `user`: view only).

## API (Assignment 2)
`/api/contacts`, `/api/projects`, `/api/qualifications`, `/api/users`: GET all, GET/:id, POST, PUT/:id, DELETE/:id, DELETE all.
`POST /auth/signin`, `GET /auth/signout` (JWT). Welcome message: `GET /api`.
Permissions: projects/qualifications readable by everyone, writable by admin; contacts POST is public, rest admin; users POST is public sign-up, rest admin.

## Before submitting
1. Put your name/email/text in `client/src/siteConfig.js`, add your photo as `client/public/img/profile.svg|png`, resume as `client/public/resume.pdf`.
2. Create a free MongoDB Atlas cluster, set `MONGO_URI` + a strong `JWT_SECRET` (never commit `.env`).
3. Deploy (Render/Railway): build `npm run build`, start `npm start`, add the env vars.
