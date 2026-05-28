# Product Decisions

This document records confirmed product decisions for the first full production version.

## Access

- Users sign in with Google login.
- Guests can browse public game pages before creating a fantasy team.
- Interface language is Ukrainian only.
- The first launch is public and free-to-play without prizes.

## Game Rules

- One fantasy team for the whole World Cup.
- No automatic substitutions.
- No chips: no Bench Boost, Ultra Captain, Free Hit, or Wildcard in the first production release.
- Player prices are fixed for the whole tournament.
- Captain scores x2.
- Vice-captain scores x2 only if the captain plays 0 minutes.
- Deadlines are 30 minutes before the first match of the gameweek.
- Transfers: maximum 3 transfers in a transfer period.
- No extra transfers and no transfer-point penalties.

## Scoring

- Keep the current Balanced scoring model from `packages/shared/src/rules.ts`.
- Do not add shots on target, key passes, defensive actions, or other advanced stat categories in the first production release.

## Admin And Settlement

- One admin enters match statistics.
- After stats are entered, points become official immediately.
- Admins can correct scoring in two ways:
  - direct point adjustment with a required reason;
  - edit match statistics and recalculate affected scores.
- Guides and tips must be editable from the admin panel.

## Leagues

- A user can create one owned private league.
- A user can also join up to five invited private leagues.
- Invite codes are random and safe enough for public sharing.
- A user can leave invited leagues.
- League owners can rename their league and remove members.
- The first full version needs both private league leaderboards and a global leaderboard.
- Global leaderboard uses 50 rows per page.
- Tied teams share the same rank.
- Leaderboards update only when admin clicks `Оновити рейтинги`.

## Manual Match Points

- The system does not calculate fantasy points automatically in the production flow.
- Admin opens a fixture and sees all players from both national teams.
- Admin enters integer points manually for each player.
- Empty point fields are treated as `0`.
- Admin can edit saved match points later.
- Rankings must be refreshed after point edits.

## Tribuna-Like Structure

- Keep the current visual design, but use a fantasy portal structure inspired by old Tribuna Fantasy.
- Home page is a promo landing with team-name input, optional invite code, and Google login start.
- Rules live at `/rules`.
- Tournament profile lives at `/tournament`.
- Team pages are public at `/teams/[id]`.
- Fantasy pages use a right sidebar for guides, group placeholders, leaders, results, and calendar.
- After login, users go to their public team page if they already have a team; otherwise they continue onboarding/squad creation.
