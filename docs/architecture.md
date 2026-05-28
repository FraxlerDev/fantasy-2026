# Architecture Notes

Fantasy 2026 UA starts as a modular monorepo:

- Next.js owns the desktop-first user experience and editorial onboarding.
- NestJS owns API boundaries, admin workflows, scoring orchestration, and future auth.
- PostgreSQL is the source of truth for users, fantasy teams, rosters, fixtures, stats, scoring, leagues, complaints, and audit logs.
- Redis is reserved for hot leaderboards, server-side locks, rate limits, and later background job coordination.

The MVP intentionally avoids live provider ingestion. Match statistics are entered by one admin after a match and become official immediately. Admins can still correct results in two ways: direct point adjustments with an audit reason, or edited match statistics followed by recalculation.

The first production release deliberately excludes automatic substitutions and chips. That keeps the scoring and transfer domain smaller while still supporting the core game loop: build a team, set captain/vice-captain, manage transfers, compete in private and global leaderboards, and read admin-managed guides.
