create extension if not exists pgcrypto;

create type user_role as enum ('USER', 'ADMIN', 'SUPER_ADMIN');
create type player_position as enum ('GK', 'DEF', 'MID', 'FWD');
create type player_status as enum ('AVAILABLE', 'DOUBTFUL', 'OUT', 'ELIMINATED');
create type fixture_status as enum ('SCHEDULED', 'LOCKED', 'PLAYED', 'SETTLED');
create type league_visibility as enum ('PRIVATE', 'PUBLIC');
create type complaint_status as enum ('OPEN', 'REVIEW', 'RESOLVED', 'REJECTED');

create table users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  username text not null unique,
  role user_role not null default 'USER',
  locale text not null default 'uk',
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now()
);

create table national_teams (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name_uk text not null,
  group_key text,
  status text not null default 'ACTIVE'
);

create table players (
  id uuid primary key default gen_random_uuid(),
  national_team_id uuid not null references national_teams(id),
  name text not null,
  position player_position not null,
  price numeric(5, 1) not null check (price > 0),
  status player_status not null default 'AVAILABLE',
  created_at timestamptz not null default now()
);

create table stages (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name_uk text not null,
  deadline_at timestamptz,
  free_transfers integer,
  unlimited_transfers boolean not null default false,
  max_players_per_nation integer not null
);

create table fixtures (
  id uuid primary key default gen_random_uuid(),
  stage_id uuid not null references stages(id),
  home_team_id uuid not null references national_teams(id),
  away_team_id uuid not null references national_teams(id),
  kickoff_at timestamptz not null,
  status fixture_status not null default 'SCHEDULED',
  settled_at timestamptz
);

create table fantasy_teams (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id),
  name text not null,
  budget numeric(5, 1) not null default 100.0,
  total_points integer not null default 0,
  created_at timestamptz not null default now()
);

create table roster_entries (
  fantasy_team_id uuid not null references fantasy_teams(id),
  stage_id uuid not null references stages(id),
  player_id uuid not null references players(id),
  purchase_price numeric(5, 1) not null,
  primary key (fantasy_team_id, stage_id, player_id)
);

create table lineup_versions (
  id uuid primary key default gen_random_uuid(),
  fantasy_team_id uuid not null references fantasy_teams(id),
  stage_id uuid not null references stages(id),
  starters uuid[] not null,
  bench uuid[] not null,
  captain_id uuid not null references players(id),
  vice_captain_id uuid not null references players(id),
  saved_at timestamptz not null default now()
);

create table transfers (
  id uuid primary key default gen_random_uuid(),
  fantasy_team_id uuid not null references fantasy_teams(id),
  stage_id uuid not null references stages(id),
  out_player_id uuid references players(id),
  in_player_id uuid references players(id),
  hit_cost integer not null default 0,
  created_at timestamptz not null default now()
);

create table leagues (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references users(id),
  name text not null,
  invite_code text not null unique,
  visibility league_visibility not null default 'PRIVATE',
  created_at timestamptz not null default now()
);

create table league_members (
  league_id uuid not null references leagues(id),
  fantasy_team_id uuid not null references fantasy_teams(id),
  joined_at timestamptz not null default now(),
  primary key (league_id, fantasy_team_id)
);

create table match_player_stats (
  fixture_id uuid not null references fixtures(id),
  player_id uuid not null references players(id),
  minutes integer not null default 0,
  goals integer not null default 0,
  assists integer not null default 0,
  team_goals_conceded integer not null default 0,
  clean_sheet boolean not null default false,
  saves integer not null default 0,
  penalties_saved integer not null default 0,
  penalties_missed integer not null default 0,
  yellow_cards integer not null default 0,
  red_cards integer not null default 0,
  own_goals integer not null default 0,
  player_of_the_match boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (fixture_id, player_id)
);

create table score_entries (
  id uuid primary key default gen_random_uuid(),
  fantasy_team_id uuid not null references fantasy_teams(id),
  fixture_id uuid not null references fixtures(id),
  player_id uuid not null references players(id),
  points integer not null,
  status text not null default 'OFFICIAL',
  breakdown_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table score_adjustments (
  id uuid primary key default gen_random_uuid(),
  score_entry_id uuid references score_entries(id),
  fantasy_team_id uuid not null references fantasy_teams(id),
  points_delta integer not null,
  reason text not null,
  actor_user_id uuid not null references users(id),
  created_at timestamptz not null default now()
);

create table complaints (
  id uuid primary key default gen_random_uuid(),
  reporter_user_id uuid not null references users(id),
  entity_type text not null,
  entity_id uuid not null,
  reason text not null,
  status complaint_status not null default 'OPEN',
  created_at timestamptz not null default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_json jsonb,
  after_json jsonb,
  created_at timestamptz not null default now()
);

create index idx_players_position on players(position);
create index idx_players_team on players(national_team_id);
create index idx_fixtures_stage on fixtures(stage_id);
create index idx_score_entries_team on score_entries(fantasy_team_id);
create index idx_league_members_team on league_members(fantasy_team_id);
