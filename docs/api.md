# API Contract Draft

Base URL: `/v1`

## Public/User

- `GET /health`
- `GET /tournament/stages`
- `GET /tournament/rules`
- `GET /players?position=&nation=&q=`
- `GET /fantasy-team/me`
- `POST /fantasy-team`
- `POST /leagues`
- `POST /leagues/join`
- `GET /leagues/:id/leaderboard`
- `POST /scoring/preview`

## Admin

- `GET /admin/queue`
- `POST /admin/fixtures/:fixtureId/stats`
- `POST /admin/fixtures/:fixtureId/settle`

All admin mutations must eventually write `audit_logs`. Score corrections must require a human-readable reason.
