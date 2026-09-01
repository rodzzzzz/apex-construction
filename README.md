# Apex Construction

Premium construction company website: services catalog with a quote builder, custom homes program, project gallery, consultations, and lead management.

## Stack

- Next.js 16 (App Router)
- Payload CMS 3 with Postgres
- Tailwind CSS 4
- shadcn/ui
- Resend

## Getting started

```bash
docker compose up -d
cp .env.example .env
npm install
npx payload migrate
npm run seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and [http://localhost:3000/admin](http://localhost:3000/admin).

Seeded team login: `team@apexconstruction.com` / `apex-admin`.
