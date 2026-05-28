# Implementation Backlog

## Completed In Milestone 2-3 Scaffold

- Prisma models for private leagues, league memberships, fixtures, manual player points, and leaderboard snapshots.
- Real private league page: create/rename owned league, join by invite code, leave invited league, owner member removal.
- Global leaderboard with 50-row pagination and shared-rank snapshots.
- Admin page for fixture creation, player price edits, manual integer match points, and explicit ranking refresh.

## Next Pass

1. Add Google login, role-based guards, guest browsing, and session storage.
2. Wire NestJS to PostgreSQL through Prisma or Drizzle.
3. Replace sample arrays with repositories.
4. Implement roster, lineup, maximum-3-transfer, and gameweek deadline transactions.
5. Add fuller admin CRUD for teams and guide content.
6. Add Redis-backed leaderboard cache if PostgreSQL snapshots become slow.
7. Add unit tests for league limits, owner permissions, manual point entry, and ranking refresh.
8. Add Playwright smoke tests for create team, join league, and admin settlement.

## Product Decisions Still Open

- Final product name and visual identity.
- Exact official World Cup 2026 stage deadlines after fixture publication.
- Terms, privacy policy, prize rules, and fraud review policy.

## Product Decisions Confirmed

- Auth: Google login.
- Guests can browse the game before creating a fantasy team.
- Deadlines: 30 minutes before the first match of the gameweek.
- Transfers: maximum 3 transfers in a transfer period; no extra transfers and no point penalties.
- Captain: captain scores x2; vice-captain takes x2 only if captain plays 0 minutes.
- No automatic substitutions.
- No chips in the first production release.
- Player prices are fixed for the whole tournament.
- Scoring: keep the current Balanced scoring rules.
- Admin model: one admin enters match stats.
- Settlement: entered stats become official immediately.
- Corrections: admin can directly adjust points and can also edit match stats and recalculate.
- Leagues: a user can create one owned private league and can also join invited leagues.
- Leaderboards: global and private league leaderboards are both required.
- Guides and tips are managed through the admin panel.
- First production milestone: public launch without prizes.
