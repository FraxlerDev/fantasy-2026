# Google OAuth Setup

Use this when creating Google login from scratch.

## Google Cloud Console

1. Open Google Cloud Console.
2. Create a new project, for example `Fantasy 2026 UA`.
3. Go to `APIs & Services` -> `OAuth consent screen`.
4. Choose external app while testing.
5. Add app name, support email, and developer email.
6. Add test users while the app is not verified.
7. Go to `Credentials` -> `Create credentials` -> `OAuth client ID`.
8. Choose `Web application`.
9. Add authorized JavaScript origin:
   - `http://localhost:3000`
10. Add authorized redirect URI:
   - `http://localhost:3000/api/auth/callback/google`
11. Copy client ID and client secret.

## Local Env

Put these values into `apps/web/.env`:

```env
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
AUTH_SECRET=generate-a-long-random-secret
AUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://fantasy:fantasy@localhost:5432/fantasy_2026_ua
```

Generate a local secret with:

```powershell
node -e "console.log(crypto.randomBytes(32).toString('base64'))"
```

## Ubuntu/Nginx Later

For production, change:

- `AUTH_URL=https://your-domain.com`
- redirect URI in Google Cloud to `https://your-domain.com/api/auth/callback/google`
- `DATABASE_URL` to the PostgreSQL connection string on the server.
