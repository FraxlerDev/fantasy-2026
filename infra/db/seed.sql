insert into national_teams (code, name_uk, group_key) values
  ('UKR', 'Україна', 'A'),
  ('FRA', 'Франція', 'A'),
  ('ENG', 'Англія', 'B'),
  ('GER', 'Німеччина', 'B')
on conflict (code) do nothing;

insert into stages (key, name_uk, unlimited_transfers, free_transfers, max_players_per_nation) values
  ('GROUP_MD1', 'Груповий етап, тур 1', true, null, 2),
  ('GROUP_MD2', 'Груповий етап, тур 2', false, 2, 2),
  ('GROUP_MD3', 'Груповий етап, тур 3', false, 2, 2),
  ('ROUND_OF_32', '1/16 фіналу', false, 4, 3),
  ('ROUND_OF_16', '1/8 фіналу', false, 4, 4),
  ('QUARTER_FINALS', 'Чвертьфінали', false, 5, 4),
  ('SEMI_FINALS', 'Півфінали', false, 5, 5),
  ('FINALS', 'Фінальна стадія', false, 6, 8)
on conflict (key) do nothing;

insert into users (email, username, role) values
  ('admin@fantasy.test', 'admin', 'SUPER_ADMIN'),
  ('oleg@fantasy.test', 'oleg', 'USER')
on conflict (email) do nothing;
