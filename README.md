# Fantasy 2026 UA

Production-oriented MVP scaffold for a Ukrainian free-to-play fantasy football platform for World Cup 2026.

## Product Frame

- One fantasy team for the whole tournament.
- Ukrainian-only interface.
- Desktop-first web experience.
- Free-to-play, no entry fee and no cash-prize mechanics.
- Manual post-match stat entry through admin tools.
- Balanced scoring rules.
- No automatic substitutions.
- No chips in the first production release.
- Fixed player prices for the whole tournament.
- Private leagues with invite codes and leaderboards.
- Media-led onboarding: guides, tips, and a two-minute quick start.

## Tech Stack

- `apps/web`: Next.js App Router frontend.
- `apps/api`: NestJS backend skeleton.
- `packages/shared`: shared domain types and fantasy rules.
- PostgreSQL: source of truth.
- Redis: leaderboards, locks, and future jobs/cache.

## Start Locally

```bash
npm install
cp .env.example .env
cp apps/web/.env.example apps/web/.env
npm run db:up
npm run db:generate -w apps/web
npm run db:push -w apps/web
npm run db:seed -w apps/web
npm run dev
```

The default local URLs are:

- Web: `http://localhost:3000`
- API: `http://localhost:4000`

## Current Status

This repository is the first implementation scaffold. It includes product-aligned UI screens, shared scoring/validation rules, API modules, SQL schema, seed data, and Docker Compose infrastructure. Google login, persistence wiring through an ORM, admin-managed content, and production deployment should be completed in the next implementation pass.

Milestone 1 work has started: Prisma schema, Auth.js Google login scaffolding, onboarding, and persisted squad saving are in place. Google OAuth credentials and a running PostgreSQL database are required before login and saving work end-to-end.
