# Story Spend

An expenses app for authors. Built with [Next.js](https://nextjs.org/).

## Copyright notice and statement

This repository does not offer any license for the code contained within it. All rights are reserved.

Nobody can copy, distribute, or modify the work without being at risk of take-downs, shake-downs, or litigation.

## Requirements

- [Bun](https://bun.sh/)
- A [PostgreSQL](https://www.postgresql.org/) database server running.

## Getting Started

**Install dependencies:**

```bash
bun install
```

**Environment variables:**

```bash
cp .env.example .env.local
```

and update the values in `.env.local`.

**Setup the database (seed it after logging in, having creating a user):**

```bash
bunx prisma migrate dev --skip-seed
```

**Run the development server:**

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and sign in.

**Seed the database:**

```bash
bunx prisma db seed
```
