# Database Setup

The app uses Prisma with PostgreSQL.

## Local With Docker

```powershell
npm.cmd run db:up
npm.cmd run db:generate -w apps/web
npm.cmd run db:push -w apps/web
npm.cmd run db:seed -w apps/web
```

In the current Windows session, Docker was not available, so these database commands could not be completed here.

## Local Without Docker

Install PostgreSQL locally, create a database and user:

```sql
create user fantasy with password 'fantasy';
create database fantasy_2026_ua owner fantasy;
```

Then use:

```env
DATABASE_URL=postgresql://fantasy:fantasy@localhost:5432/fantasy_2026_ua
```

## Ubuntu 24.04 Server Target

Install PostgreSQL on Ubuntu, create the same database/user, copy the project, install dependencies, set `.env`, then run:

```bash
npm install
npm run db:generate -w apps/web
npm run db:push -w apps/web
npm run db:seed -w apps/web
npm run build
```

Nginx should proxy the Next.js web app on port `3000` and the NestJS API on port `4000` if both are deployed.
