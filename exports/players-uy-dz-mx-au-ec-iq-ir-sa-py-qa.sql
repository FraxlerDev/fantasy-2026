-- Update only Uruguay, Algeria, Mexico, Australia, Ecuador, Iraq, Iran, Saudi Arabia, Paraguay and Qatar players
-- Includes player data, prices and photoUrl. Does not touch users, squads, leagues, chats or petitions.
BEGIN;

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdm1006qlbbwq3w5y8s7', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Меттью Раян', NULL, 'GK', 'Леванте', 'Леванте', '/player-photos/cmpvkzdm1006qlbbwq3w5y8s7.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:07:42.889Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdmi006ulbbwjsdhgy2v', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Патрік Біч', NULL, 'GK', 'Мельбурн Сіті', 'Мельбурн Сіті', '/player-photos/cmpvkzdmi006ulbbwjsdhgy2v.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:07:42.906Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdmd006slbbw9eofx74w', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Пол Іццо', NULL, 'GK', 'Раннерс', 'Раннерс', '/player-photos/cmpvkzdmd006slbbw9eofx74w.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:07:42.902Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdmn006wlbbw5l111a56', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Азіз Бехіч', NULL, 'DEF', 'Мельбурн Сіті', 'Мельбурн Сіті', '/player-photos/cmpvkzdmn006wlbbw5l111a56.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:07:42.911Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdnf0078lbbwmdu507m2', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Алессандро Чиркаті', NULL, 'DEF', 'Парма', 'Парма', '/player-photos/cmpvkzdnf0078lbbwmdu507m2.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:07:42.939Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdmx0070lbbw796fjc6v', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Гаррі Сауттар', NULL, 'DEF', 'Лестер Сіті', 'Лестер Сіті', '/player-photos/cmpvkzdmx0070lbbw796fjc6v.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:07:42.922Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdno007clbbwot8m83v5', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Джейкоб Італьяно', NULL, 'DEF', 'Грассер АК', 'Грассер АК', '/player-photos/cmpvkzdno007clbbwot8m83v5.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:07:42.948Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdnb0076lbbw383guy4x', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Джейсон Герія', NULL, 'DEF', 'Альбірекс Ніїгата', 'Альбірекс Ніїгата', NULL, NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:07:42.935Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdn10072lbbwl8yrh7qk', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Джордан Бос', NULL, 'DEF', 'Феєнорд', 'Феєнорд', '/player-photos/cmpvkzdn10072lbbwl8yrh7qk.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T19:07:42.926Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdnj007albbwo2tr6ull', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Кай Тревін', NULL, 'DEF', 'Нью-Йорк Сіті', 'Нью-Йорк Сіті', '/player-photos/cmpvkzdnj007albbwo2tr6ull.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:07:42.944Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdn60074lbbwgnyzo5ue', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Кемерон Берджесс', NULL, 'DEF', 'Свонсі Сіті', 'Свонсі Сіті', '/player-photos/cmpvkzdn60074lbbwgnyzo5ue.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:07:42.930Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdnt007elbbwwoeteaq5', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Лукас Геррінгтон', NULL, 'DEF', 'Колорадо Репідс', 'Колорадо Репідс', '/player-photos/cmpvkzdnt007elbbwwoeteaq5.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:07:42.953Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdms006ylbbwheg0utzw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Мілош Дегенек', NULL, 'DEF', 'АПОЕЛ', 'АПОЕЛ', '/player-photos/cmpvkzdms006ylbbwheg0utzw.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:07:42.917Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdos007ulbbwwomr7dvp', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Авер Мабіл', NULL, 'MID', 'Кастельйон', 'Кастельйон', '/player-photos/cmpvkzdos007ulbbwwomr7dvp.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:07:42.989Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdo2007ilbbwms5axztg', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Айдін Грустіч', NULL, 'MID', 'Гераклес Алмело', 'Гераклес Алмело', '/player-photos/cmpvkzdo2007ilbbwms5axztg.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:07:42.962Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdny007glbbwlajsifae', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Джексон Ірвайн', NULL, 'MID', 'Санкт-Паулі', 'Санкт-Паулі', '/player-photos/cmpvkzdny007glbbwlajsifae.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:07:42.958Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdo7007klbbwivb08ibt', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Коннор Меткалф', NULL, 'MID', 'Санкт-Паулі', 'Санкт-Паулі', '/player-photos/cmpvkzdo7007klbbwivb08ibt.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:07:42.967Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdob007mlbbwxd6kuwzq', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Ейден О''Нілл', NULL, 'FWD', 'Нью-Йорк Сіті', 'Нью-Йорк Сіті', '/player-photos/cmpvkzdob007mlbbwxd6kuwzq.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:07:42.971Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdok007qlbbww5u8fuly', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Кеммі Девлін', NULL, 'FWD', 'Гартс', 'Гартс', '/player-photos/cmpvkzdok007qlbbww5u8fuly.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:07:42.980Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdpb0082lbbwbw3kbsiu', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Крістіан Вольпато', NULL, 'FWD', 'Сассуоло', 'Сассуоло', '/player-photos/cmpvkzdpb0082lbbwbw3kbsiu.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T19:07:43.008Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdop007slbbw8xw2aw6e', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Меттью Лекі', NULL, 'FWD', 'Мельбурн Сіті', 'Мельбурн Сіті', '/player-photos/cmpvkzdop007slbbw8xw2aw6e.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:07:42.985Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdp2007ylbbwg5oyuyyz', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Мохамед Туре', NULL, 'FWD', 'Норвіч Сіті', 'Норвіч Сіті', '/player-photos/cmpvkzdp2007ylbbwg5oyuyyz.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:07:42.998Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdox007wlbbwgir9l2li', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Несторі Іранкунда', NULL, 'FWD', 'Вотфорд', 'Вотфорд', '/player-photos/cmpvkzdox007wlbbwgir9l2li.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T19:07:42.993Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdp70080lbbwn0izkuqb', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Нішан Велупіллай', NULL, 'FWD', 'Мельбурн Вікторі', 'Мельбурн Вікторі', '/player-photos/cmpvkzdp70080lbbwn0izkuqb.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:07:43.003Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdof007olbbwd7rs3bql', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Пол Окон-Енгстлер', NULL, 'FWD', 'Сідней', 'Сідней', '/player-photos/cmpvkzdof007olbbwd7rs3bql.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:07:42.975Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkzdpg0084lbbwyy2cozgf', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AU' LIMIT 1), 'Тете Енгі', NULL, 'FWD', 'Мачіда Зельвія', 'Мачіда Зельвія', NULL, NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:07:43.012Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yup002albbw2blzaw9f', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Люка Зідан', NULL, 'GK', 'Гранада', 'Гранада', '/player-photos/cmpvk7yup002albbw2blzaw9f.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:46:24.048Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yv4002elbbwzo6twv6f', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Мелвін Мастіль', NULL, 'GK', 'Стад Ньонне', 'Стад Ньонне', '/player-photos/cmpvk7yv4002elbbwzo6twv6f.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T18:46:24.065Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yv1002clbbwq1yf3l72', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Усама Бенбот', NULL, 'GK', 'УСМ Алжир', 'УСМ Алжир', '/player-photos/cmpvk7yv1002clbbwq1yf3l72.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T18:46:24.061Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yv8002glbbwywh8hanq', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Айса Манді', NULL, 'DEF', 'Лілль', 'Лілль', '/player-photos/cmpvk7yv8002glbbwywh8hanq.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:46:24.068Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yw5002ulbbwu9i8qlhj', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Ашреф Абада', NULL, 'DEF', 'УСМ Алжир', 'УСМ Алжир', '/player-photos/cmpvk7yw5002ulbbwu9i8qlhj.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T18:46:24.101Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yvp002olbbwomtnz81o', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Жауен Хаджам', NULL, 'DEF', 'Янг Бойз', 'Янг Бойз', '/player-photos/cmpvk7yvp002olbbwomtnz81o.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T18:46:24.086Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yvy002slbbwpm1nrrkv', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Зінеддін Белаїд', NULL, 'DEF', 'ЖС Кабілі', 'ЖС Кабілі', '/player-photos/cmpvk7yvy002slbbwpm1nrrkv.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T18:46:24.095Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yvh002klbbwkc1vd9d9', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Мохамед Амін Тугай', NULL, 'DEF', 'Есперанс', 'Есперанс', '/player-photos/cmpvk7yvh002klbbwkc1vd9d9.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T18:46:24.077Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yvc002ilbbwvji31ddz', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Рамі Бенсебаїні', NULL, 'DEF', 'Боруссія Дортмунд', 'Боруссія Дортмунд', '/player-photos/cmpvk7yvc002ilbbwvji31ddz.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T18:46:24.072Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yvu002qlbbwtantz56t', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Рафік Бельгалі', NULL, 'DEF', 'Верона', 'Верона', '/player-photos/cmpvk7yvu002qlbbwtantz56t.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T18:46:24.090Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yvl002mlbbwe9k5uoib', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Раян Айт-Нурі', NULL, 'DEF', 'Манчестер Сіті', 'Манчестер Сіті', '/player-photos/cmpvk7yvl002mlbbwe9k5uoib.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T18:46:24.082Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yw9002wlbbw155hvk94', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Самір Шергі', NULL, 'DEF', 'Париж', 'Париж', '/player-photos/cmpvk7yw9002wlbbw155hvk94.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T18:46:24.105Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yxr003klbbw7bbie5rd', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Аділь Бульбіна', NULL, 'MID', 'Аль-Духаїль', 'Аль-Духаїль', '/player-photos/cmpvk7yxr003klbbw7bbie5rd.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:46:24.160Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7ywz0038lbbwxiscrsz8', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Ібрагім Маза', NULL, 'MID', 'Баер Леверкузен', 'Баер Леверкузен', '/player-photos/cmpvk7ywz0038lbbwxiscrsz8.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T18:46:24.131Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7ywd002ylbbwed25eoec', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Набіль Бенталеб', NULL, 'MID', 'Лілль', 'Лілль', '/player-photos/cmpvk7ywd002ylbbwed25eoec.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T18:46:24.110Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7ywh0030lbbwqx68yrlp', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Раміз Зеррукі', NULL, 'MID', 'Твенте', 'Твенте', '/player-photos/cmpvk7ywh0030lbbwqx68yrlp.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T18:46:24.114Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7ywr0034lbbwz9b8wk8t', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Фарес Шаїбі', NULL, 'MID', 'Айнтрахт Франкфурт', 'Айнтрахт Франкфурт', '/player-photos/cmpvk7ywr0034lbbwz9b8wk8t.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T18:46:24.123Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7ywm0032lbbwb95u9e8t', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Хішам Будауї', NULL, 'MID', 'Ніцца', 'Ніцца', '/player-photos/cmpvk7ywm0032lbbwb95u9e8t.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T18:46:24.118Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7ywv0036lbbwecexx3gl', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Хуссем Ауар', NULL, 'MID', 'Аль-Іттіхад', 'Аль-Іттіхад', '/player-photos/cmpvk7ywv0036lbbwecexx3gl.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T18:46:24.127Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yx3003albbwx29h2pp2', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Ясін Тітрауї', NULL, 'MID', 'Шарлеруа', 'Шарлеруа', '/player-photos/cmpvk7yx3003albbwx29h2pp2.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T18:46:24.136Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yxi003glbbwnr28qjpz', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Амін Гуїрі', NULL, 'FWD', 'Марсель', 'Марсель', '/player-photos/cmpvk7yxi003glbbwnr28qjpz.webp', NULL, 'FINAL', 7.0, 'AVAILABLE', '2026-06-01T18:46:24.150Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yxm003ilbbwyr74mdqm', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Аніс Хадж Мусса', NULL, 'FWD', 'Феєнорд', 'Феєнорд', '/player-photos/cmpvk7yxm003ilbbwyr74mdqm.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T18:46:24.155Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yxd003elbbwwjgf1pzw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Мохамед Амура', NULL, 'FWD', 'Вольфсбург', 'Вольфсбург', '/player-photos/cmpvk7yxd003elbbwwjgf1pzw.webp', NULL, 'FINAL', 7.0, 'AVAILABLE', '2026-06-01T18:46:24.145Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yxv003mlbbw1au0dfkw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Надір Бенбуалі', NULL, 'FWD', 'Дьйор', 'Дьйор', '/player-photos/cmpvk7yxv003mlbbw1au0dfkw.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:46:24.163Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yx9003clbbwq8qrsma0', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Ріяд Марез', NULL, 'FWD', 'Аль-Ахлі', 'Аль-Ахлі', '/player-photos/cmpvk7yx9003clbbwq8qrsma0.webp', NULL, 'FINAL', 7.5, 'AVAILABLE', '2026-06-01T18:46:24.141Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvk7yy0003olbbw8plxrkbe', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'DZ' LIMIT 1), 'Фарес Геджеміс', NULL, 'FWD', 'Фрозіноне', 'Фрозіноне', '/player-photos/cmpvk7yy0003olbbw8plxrkbe.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:46:24.168Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji2z008vlbbw240yo4fp', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Гонсало Вальє', NULL, 'GK', 'ЛДУ Кіто', 'ЛДУ Кіто', '/player-photos/cmpvlji2z008vlbbw240yo4fp.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:23:21.803Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji2g008rlbbw29l4001a', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Ернан Галіндес', NULL, 'GK', 'Гуракан', 'Гуракан', '/player-photos/cmpvlji2g008rlbbw29l4001a.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:23:21.782Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji2u008tlbbwhfe08bpz', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Мойсес Рамірес', NULL, 'GK', 'Кіфісія', 'Кіфісія', '/player-photos/cmpvlji2u008tlbbwhfe08bpz.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:23:21.798Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji3q0097lbbwpg4ealyd', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Анхело Пресіадо', NULL, 'DEF', 'Атлетіко Мінейро', 'Атлетіко Мінейро', '/player-photos/cmpvlji3q0097lbbwpg4ealyd.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:23:21.830Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji3h0093lbbw7qq5zotn', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Вільян Пачо', NULL, 'DEF', 'ПСЖ', 'ПСЖ', '/player-photos/cmpvlji3h0093lbbw7qq5zotn.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T19:23:21.822Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji3t0099lbbwzzcppd8b', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Джейсон Поросо', NULL, 'DEF', 'Тіхуана', 'Тіхуана', '/player-photos/cmpvlji3t0099lbbwzzcppd8b.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:23:21.833Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji37008zlbbwcxhklwai', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'П''єро Інкап''є', NULL, 'DEF', 'Арсенал', 'Арсенал', '/player-photos/cmpvlji37008zlbbwcxhklwai.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T19:23:21.812Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji3l0095lbbw5ucnzm2t', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Первіс Еступіньян', NULL, 'DEF', 'Мілан', 'Мілан', '/player-photos/cmpvlji3l0095lbbw5ucnzm2t.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T19:23:21.826Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji33008xlbbw7emzrl8v', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Фелікс Торрес', NULL, 'DEF', 'Інтернасьйонал', 'Інтернасьйонал', '/player-photos/cmpvlji33008xlbbw7emzrl8v.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:23:21.807Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji3c0091lbbw9qvz5s4e', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Хоель Ордоньєс', NULL, 'DEF', 'Брюгге', 'Брюгге', '/player-photos/cmpvlji3c0091lbbw9qvz5s4e.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T19:23:21.817Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji4f009jlbbwzsk96xg2', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Алан Мінда', NULL, 'MID', 'Атлетіко Мінейро', 'Атлетіко Мінейро', '/player-photos/cmpvlji4f009jlbbwzsk96xg2.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T19:23:21.856Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji4s009plbbw29cu3uz8', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Алан Франко', NULL, 'MID', 'Атлетіко Мінейро', 'Атлетіко Мінейро', '/player-photos/cmpvlji4s009plbbw29cu3uz8.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:23:21.869Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji4o009nlbbwacgvorsw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Гонсало Плата', NULL, 'MID', 'Фламенго', 'Фламенго', '/player-photos/cmpvlji4o009nlbbwacgvorsw.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T19:23:21.864Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji43009dlbbwojs2pyo4', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Деніль Кастільйо', NULL, 'MID', 'Мідтьюлланн', 'Мідтьюлланн', '/player-photos/cmpvlji43009dlbbwojs2pyo4.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:23:21.843Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji46009flbbwg4o9luhw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Джон Єбоа', NULL, 'MID', 'Венеція', 'Венеція', '/player-photos/cmpvlji46009flbbwg4o9luhw.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T19:23:21.847Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji4b009hlbbwykgfu72b', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Кендрі Паес', NULL, 'MID', 'Рівер Плейт', 'Рівер Плейт', '/player-photos/cmpvlji4b009hlbbwykgfu72b.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T19:23:21.851Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji4x009rlbbwwg611sm8', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Мойсес Кайседо', NULL, 'MID', 'Челсі', 'Челсі', '/player-photos/cmpvlji4x009rlbbwwg611sm8.webp', NULL, 'FINAL', 8.5, 'AVAILABLE', '2026-06-01T19:23:21.873Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji4k009llbbw18j3yy8l', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Педро Віте', NULL, 'MID', 'УНАМ Пумас', 'УНАМ Пумас', '/player-photos/cmpvlji4k009llbbw18j3yy8l.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:23:21.860Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji3y009blbbw0ban0o5e', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Хорді Альсівар', NULL, 'MID', 'Індепендьєнте дель Вальє', 'Індепендьєнте дель Вальє', '/player-photos/cmpvlji3y009blbbw0ban0o5e.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:23:21.838Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji51009tlbbwpy6g10wg', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Яймар Медіна', NULL, 'MID', 'Генк', 'Генк', '/player-photos/cmpvlji51009tlbbwpy6g10wg.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:23:21.877Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji6400a5lbbwrf66za4f', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Джеремі Аревало', NULL, 'FWD', 'Штутгарт', 'Штутгарт', '/player-photos/cmpvlji6400a5lbbwrf66za4f.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:23:21.916Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji5b009xlbbw0wm3670u', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Еннер Валенсія', NULL, 'FWD', 'Пачука', 'Пачука', '/player-photos/cmpvlji5b009xlbbw0wm3670u.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T19:23:21.887Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji5f009zlbbwmly7ts9g', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Ентоні Валенсія', NULL, 'FWD', 'Антверпен', 'Антверпен', '/player-photos/cmpvlji5f009zlbbwmly7ts9g.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:23:21.891Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji56009vlbbwli1xxhpb', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Кевін Родрігес', NULL, 'FWD', 'Юніон Сент-Жілуаз', 'Юніон Сент-Жілуаз', '/player-photos/cmpvlji56009vlbbwli1xxhpb.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:23:21.882Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji5z00a3lbbwg3ca9zlb', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Нільсон Ангуло', NULL, 'FWD', 'Сандерленд', 'Сандерленд', '/player-photos/cmpvlji5z00a3lbbwg3ca9zlb.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:23:21.912Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvlji5i00a1lbbwt7jluk2t', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EC' LIMIT 1), 'Хорді Кайседо', NULL, 'FWD', 'Хуракан', 'Хуракан', '/player-photos/cmpvlji5i00a1lbbwt7jluk2t.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:23:21.895Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluiko00awlbbwovi5q8m0', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Ахмед Басіль', NULL, 'GK', 'Аль-Шорта', 'Аль-Шорта', '/player-photos/cmpvluiko00awlbbwovi5q8m0.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:31:55.656Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluik400aslbbwliy0yypw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Джалал Хассан', NULL, 'GK', 'Аль-Завра', 'Аль-Завра', '/player-photos/cmpvluik400aslbbwliy0yypw.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:31:55.636Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluiki00aulbbwuq487ozf', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Фахад Таліб', NULL, 'GK', 'Аль-Талаба', 'Аль-Талаба', '/player-photos/cmpvluiki00aulbbwuq487ozf.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:31:55.651Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluim100belbbws5y0kw76', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Акам Хашим', NULL, 'DEF', 'Аль-Завра', 'Аль-Завра', '/player-photos/cmpvluim100belbbws5y0kw76.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:31:55.705Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluilq00balbbwzvl59p3b', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Ахмед Ях''я', NULL, 'DEF', 'Аль-Шорта', 'Аль-Шорта', '/player-photos/cmpvluilq00balbbwzvl59p3b.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:31:55.695Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluilg00b6lbbwfq2vbppz', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Заїд Тахсін', NULL, 'DEF', 'Пахтакор', 'Пахтакор', '/player-photos/cmpvluilg00b6lbbwfq2vbppz.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:31:55.684Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluikx00b0lbbwyjrxvj2r', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Манаф Юніс', NULL, 'DEF', 'Аль-Шорта', 'Аль-Шорта', '/player-photos/cmpvluikx00b0lbbwyjrxvj2r.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:31:55.666Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluil600b2lbbwweq6qtk7', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Мерхас Доскі', NULL, 'DEF', 'Вікторія Пльзень', 'Вікторія Пльзень', '/player-photos/cmpvluil600b2lbbwweq6qtk7.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:31:55.674Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluilv00bclbbwdwz5zhek', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Мустафа Саадун', NULL, 'DEF', 'Аль-Шорта', 'Аль-Шорта', '/player-photos/cmpvluilv00bclbbwdwz5zhek.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:31:55.699Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluikt00aylbbwjw1pkl8t', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Ребін Сулака', NULL, 'DEF', 'Порт', 'Порт', '/player-photos/cmpvluikt00aylbbwjw1pkl8t.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:31:55.661Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluill00b8lbbwy3mls1ii', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Франс Путрос', NULL, 'DEF', 'Персіб Бандунг', 'Персіб Бандунг', '/player-photos/cmpvluill00b8lbbwy3mls1ii.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:31:55.689Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluilb00b4lbbwwcu5zko0', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Хусейн Алі', NULL, 'DEF', 'Погонь Щецин', 'Погонь Щецин', '/player-photos/cmpvluilb00b4lbbwwcu5zko0.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:31:55.680Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluin500bulbbwytz04761', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Аймар Шер', NULL, 'MID', 'Сарпсборг 08', 'Сарпсборг 08', '/player-photos/cmpvluin500bulbbwytz04761.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:31:55.745Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluimg00bklbbwaytfl8rx', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Алі Джасім', NULL, 'MID', 'Аль-Наджма', 'Аль-Наджма', '/player-photos/cmpvluimg00bklbbwaytfl8rx.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T19:31:55.720Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluimb00bilbbwgpukc9km', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Амір Аль-Аммарі', NULL, 'MID', 'Краковія', 'Краковія', '/player-photos/cmpvluimb00bilbbwgpukc9km.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:31:55.716Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluinf00bylbbwc23xcd35', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Ахмед Касем', NULL, 'MID', 'Нешвілл', 'Нешвілл', '/player-photos/cmpvluinf00bylbbwc23xcd35.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:31:55.755Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluin900bwlbbw9crq54vd', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Заїд Ісмаїл', NULL, 'MID', 'Аль-Талаба', 'Аль-Талаба', '/player-photos/cmpvluin900bwlbbw9crq54vd.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:31:55.750Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluimq00bolbbwsfnkhfhp', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Зідан Ікбал', NULL, 'MID', 'Утрехт', 'Утрехт', '/player-photos/cmpvluimq00bolbbwsfnkhfhp.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T19:31:55.731Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluim600bglbbwzlmeicod', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Ібрагім Баеш', NULL, 'MID', 'Аль-Дхафра', 'Аль-Дхафра', '/player-photos/cmpvluim600bglbbwzlmeicod.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:31:55.710Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluin000bslbbwug7he1dw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Кевін Якоб', NULL, 'MID', 'АГФ', 'АГФ', '/player-photos/cmpvluin000bslbbwug7he1dw.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:31:55.740Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluimv00bqlbbw8qcyz87v', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Марко Фарджі', NULL, 'MID', 'Венеція', 'Венеція', '/player-photos/cmpvluimv00bqlbbw8qcyz87v.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:31:55.735Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluimm00bmlbbwrdr3wbi8', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Юссеф Амін', NULL, 'MID', 'АЕК Ларнака', 'АЕК Ларнака', '/player-photos/cmpvluimm00bmlbbwrdr3wbi8.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:31:55.726Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluink00c0lbbw0t0cs53j', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Аймен Хусейн', NULL, 'FWD', 'Аль-Карма', 'Аль-Карма', '/player-photos/cmpvluink00c0lbbw0t0cs53j.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T19:31:55.761Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluint00c4lbbwpnuf83m5', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Алі Аль-Хамаді', NULL, 'FWD', 'Лутон Таун', 'Лутон Таун', '/player-photos/cmpvluint00c4lbbwpnuf83m5.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:31:55.770Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluinz00c6lbbwotkk7060', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Алі Юсіф', NULL, 'FWD', 'Аль-Талаба', 'Аль-Талаба', '/player-photos/cmpvluinz00c6lbbwotkk7060.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:31:55.775Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvluinp00c2lbbw9mlaucq2', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IQ' LIMIT 1), 'Моханад Алі', NULL, 'FWD', 'Дібба', 'Дібба', '/player-photos/cmpvluinp00c2lbbw9mlaucq2.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:31:55.765Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qdi00ctlbbwc0lksaml', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Аліреза Бейранванд', NULL, 'GK', 'Трактор', 'Трактор', '/player-photos/cmpvm7qdi00ctlbbwc0lksaml.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:42:12.293Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qdv00cvlbbwqed5kkv3', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Паям Ніязманд', NULL, 'GK', 'Персеполіс', 'Персеполіс', '/player-photos/cmpvm7qdv00cvlbbwqed5kkv3.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:42:12.308Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qe100cxlbbwcrugawfg', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Хоссейн Хоссейні', NULL, 'GK', 'Сепахан', 'Сепахан', '/player-photos/cmpvm7qe100cxlbbwcrugawfg.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:42:12.313Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qez00dblbbw9fiz8tz6', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Алі Немати', NULL, 'DEF', 'Фулад', 'Фулад', '/player-photos/cmpvm7qez00dblbbw9fiz8tz6.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:42:12.347Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qf400ddlbbwdvozop4q', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Даніал Ейрі', NULL, 'DEF', 'Малаван', 'Малаван', '/player-photos/cmpvm7qf400ddlbbwdvozop4q.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:42:12.353Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qe500czlbbwqph11dej', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Ехсан Хаджсафі', NULL, 'DEF', 'Сепахан', 'Сепахан', '/player-photos/cmpvm7qe500czlbbwqph11dej.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:42:12.318Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qeb00d1lbbwp835cx38', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Мілад Мохаммаді', NULL, 'DEF', 'Персеполіс', 'Персеполіс', '/player-photos/cmpvm7qeb00d1lbbwp835cx38.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:42:12.324Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qeg00d3lbbwd7iuqstc', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Рамін Резаеян', NULL, 'DEF', 'Фулад', 'Фулад', '/player-photos/cmpvm7qeg00d3lbbwd7iuqstc.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:42:12.329Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qeu00d9lbbwe5lm48rc', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Салех Хардані', NULL, 'DEF', 'Естеглал', 'Естеглал', '/player-photos/cmpvm7qeu00d9lbbwe5lm48rc.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:42:12.342Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qel00d5lbbwfx1rkbjv', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Хоссейн Канаанізадеган', NULL, 'DEF', 'Персеполіс', 'Персеполіс', '/player-photos/cmpvm7qel00d5lbbwfx1rkbjv.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:42:12.334Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qeq00d7lbbwznhm313p', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Шоджа Халілзаде', NULL, 'DEF', 'Трактор', 'Трактор', '/player-photos/cmpvm7qeq00d7lbbwznhm313p.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:42:12.338Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qf900dflbbwnbwi8gwp', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Аліреза Джаханбахш', NULL, 'MID', 'Дендер', 'Дендер', '/player-photos/cmpvm7qf900dflbbwnbwi8gwp.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T19:42:12.358Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qgk00dxlbbwm5zti2e3', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Амірмохаммад Раззагінія', NULL, 'MID', 'Естеглал', 'Естеглал', '/player-photos/cmpvm7qgk00dxlbbwm5zti2e3.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:42:12.405Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qgf00dvlbbwrvvzh0kc', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Арія Юсефі', NULL, 'MID', 'Сепахан', 'Сепахан', '/player-photos/cmpvm7qgf00dvlbbwrvvzh0kc.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:42:12.400Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qg400drlbbwx0s3dy6z', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Мехді Гаєді', NULL, 'MID', 'Аль-Наср', 'Аль-Наср', '/player-photos/cmpvm7qg400drlbbwx0s3dy6z.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T19:42:12.388Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qfo00dllbbw9zg5v2z9', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Мехді Торабі', NULL, 'MID', 'Трактор', 'Трактор', '/player-photos/cmpvm7qfo00dllbbw9zg5v2z9.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:42:12.372Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qga00dtlbbw919z8tcy', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Мохаммад Горбані', NULL, 'MID', 'Аль-Вахда', 'Аль-Вахда', '/player-photos/cmpvm7qga00dtlbbw919z8tcy.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:42:12.394Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qfs00dnlbbw127tcgh4', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Рузбех Чешмі', NULL, 'MID', 'Естеглал', 'Естеглал', '/player-photos/cmpvm7qfs00dnlbbw127tcgh4.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:42:12.377Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qfe00dhlbbwamiskvi9', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Саїд Езатоллахі', NULL, 'MID', 'Шабаб Аль-Аглі', 'Шабаб Аль-Аглі', '/player-photos/cmpvm7qfe00dhlbbwamiskvi9.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:42:12.362Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qfj00djlbbwoanmf4fd', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Саман Годдос', NULL, 'MID', 'Кальба', 'Кальба', '/player-photos/cmpvm7qfj00djlbbwoanmf4fd.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T19:42:12.367Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qh200e5lbbwi8srxkeh', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Алі Аліпур', NULL, 'FWD', 'Персеполіс', 'Персеполіс', '/player-photos/cmpvm7qh200e5lbbwi8srxkeh.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:42:12.423Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qgy00e3lbbwrz4556hs', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Амірхоссейн Хоссейнзаде', NULL, 'FWD', 'Трактор', 'Трактор', '/player-photos/cmpvm7qgy00e3lbbwrz4556hs.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:42:12.419Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qh700e7lbbwkxsmzyne', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Денніс Еккерт', NULL, 'FWD', 'Стандард Льєж', 'Стандард Льєж', '/player-photos/cmpvm7qh700e7lbbwkxsmzyne.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:42:12.428Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qgp00dzlbbw42bb9eam', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Мехді Таремі', NULL, 'FWD', 'Олімпіакос', 'Олімпіакос', '/player-photos/cmpvm7qgp00dzlbbw42bb9eam.webp', NULL, 'FINAL', 7.0, 'AVAILABLE', '2026-06-01T19:42:12.410Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvm7qgu00e1lbbw4qgb90az', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'IR' LIMIT 1), 'Шахріяр Моганлу', NULL, 'FWD', 'Кальба', 'Кальба', '/player-photos/cmpvm7qgu00e1lbbw4qgb90az.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:42:12.414Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm590004flbbw75voogwq', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Гільєрмо Очоа', NULL, 'GK', 'АЕЛ Лімасол', 'АЕЛ Лімасол', '/player-photos/cmpvkm590004flbbw75voogwq.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:57:25.525Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm58v004dlbbwoqovt8ki', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Карлос Асеведо', NULL, 'GK', 'Сантос Лагуна', 'Сантос Лагуна', '/player-photos/cmpvkm58v004dlbbwoqovt8ki.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T18:57:25.520Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm58a004blbbwwwgfykxj', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Рауль Рангель', NULL, 'GK', 'Гвадалахара', 'Гвадалахара', '/player-photos/cmpvkm58a004blbbwwwgfykxj.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T18:57:25.495Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm59m004nlbbwi1w34g6y', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Ісраель Рейес', NULL, 'DEF', 'Америка', 'Америка', '/player-photos/cmpvkm59m004nlbbwi1w34g6y.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T18:57:25.547Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm59q004plbbw60p33evp', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Матео Чавес', NULL, 'DEF', 'АЗ', 'АЗ', '/player-photos/cmpvkm59q004plbbw60p33evp.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T18:57:25.550Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm59u004rlbbwhziqqua6', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Хесус Гальярдо', NULL, 'DEF', 'Толука', 'Толука', '/player-photos/cmpvkm59u004rlbbwhziqqua6.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T18:57:25.555Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm59h004llbbwna9qr7qz', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Хоан Васкес', NULL, 'DEF', 'Дженоа', 'Дженоа', '/player-photos/cmpvkm59h004llbbwna9qr7qz.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T18:57:25.542Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm596004hlbbwyowfxrwk', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Хорхе Санчес', NULL, 'DEF', 'ПАОК', 'ПАОК', '/player-photos/cmpvkm596004hlbbwyowfxrwk.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T18:57:25.530Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm5ac004zlbbw54ffulfw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Альваро Фідальго', NULL, 'MID', 'Реал Бетіс', 'Реал Бетіс', '/player-photos/cmpvkm5ac004zlbbw54ffulfw.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T18:57:25.572Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm5b4005blbbw8395t975', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Браян Гутьєррес', NULL, 'MID', 'Гвадалахара', 'Гвадалахара', '/player-photos/cmpvkm5b4005blbbw8395t975.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:57:25.601Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm5ap0055lbbw2131kip0', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Гільберто Мора', NULL, 'MID', 'Тіхуана', 'Тіхуана', '/player-photos/cmpvkm5ap0055lbbw2131kip0.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T18:57:25.586Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm59z004tlbbwrzprhx8g', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Едсон Альварес', NULL, 'MID', 'Фенербахче', 'Фенербахче', '/player-photos/cmpvkm59z004tlbbwrzprhx8g.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T18:57:25.559Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm5a4004vlbbwxd0c6w5v', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Ерік Ліра', NULL, 'MID', 'Крус Асуль', 'Крус Асуль', '/player-photos/cmpvkm5a4004vlbbwxd0c6w5v.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:57:25.564Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm5a7004xlbbw8bc7okzq', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Луїс Ромо', NULL, 'MID', 'Гвадалахара', 'Гвадалахара', '/player-photos/cmpvkm5a7004xlbbw8bc7okzq.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:57:25.568Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm5al0053lbbw1xdxkh9i', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Обед Варгас', NULL, 'MID', 'Атлетіко Мадрид', 'Атлетіко Мадрид', '/player-photos/cmpvkm5al0053lbbw1xdxkh9i.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:57:25.582Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm5ag0051lbbwny0ppice', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Орбелін Пінеда', NULL, 'MID', 'АЕК Афіни', 'АЕК Афіни', '/player-photos/cmpvkm5ag0051lbbwny0ppice.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T18:57:25.577Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm5bd005flbbw8g8yep9a', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Алексіс Вега', NULL, 'FWD', 'Толука', 'Толука', '/player-photos/cmpvkm5bd005flbbw8g8yep9a.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T18:57:25.609Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm5bm005jlbbwm6h1rgla', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Армандо Гонсалес', NULL, 'FWD', 'Гвадалахара', 'Гвадалахара', '/player-photos/cmpvkm5bm005jlbbwm6h1rgla.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:57:25.619Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm5c1005plbbwjrf6z85b', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Гільєрмо Мартінес', NULL, 'FWD', 'УНАМ Пумас', 'УНАМ Пумас', '/player-photos/cmpvkm5c1005plbbwjrf6z85b.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:57:25.634Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm5b8005dlbbw7m9m8lq5', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Рауль Хіменес', NULL, 'FWD', 'Фулгем', 'Фулгем', '/player-photos/cmpvkm5b8005dlbbw7m9m8lq5.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T18:57:25.605Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm5b00059lbbwhqc50isl', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Роберто Альварадо', NULL, 'FWD', 'Гвадалахара', 'Гвадалахара', '/player-photos/cmpvkm5b00059lbbwhqc50isl.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T18:57:25.597Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm5bj005hlbbw5m6j9x3j', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Сантьяго Хіменес', NULL, 'FWD', 'Мілан', 'Мілан', '/player-photos/cmpvkm5bj005hlbbw5m6j9x3j.webp', NULL, 'FINAL', 8.0, 'AVAILABLE', '2026-06-01T18:57:25.615Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm5bx005nlbbwzii93w3v', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Сесар Уерта', NULL, 'FWD', 'Андерлехт', 'Андерлехт', '/player-photos/cmpvkm5bx005nlbbwzii93w3v.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T18:57:25.630Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvkm5br005llbbwhhrw9dwb', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'MX' LIMIT 1), 'Хуліан Кіньйонес', NULL, 'FWD', 'Аль-Кадісія', 'Аль-Кадісія', '/player-photos/cmpvkm5br005llbbwhhrw9dwb.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T18:57:25.624Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tb300h6lbbwxx53zctj', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Гастон Ольвейра', NULL, 'GK', 'Олімпія', 'Олімпія', '/player-photos/cmpvn0tb300h6lbbwxx53zctj.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T20:04:49.120Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tak00h2lbbwl4bq7o2y', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Гатіто Фернандес', NULL, 'GK', 'Серро Портеньйо', 'Серро Портеньйо', '/player-photos/cmpvn0tak00h2lbbwl4bq7o2y.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T20:04:49.099Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tay00h4lbbw4xp45c8d', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Орландо Гіль', NULL, 'GK', 'Сан-Лоренсо', 'Сан-Лоренсо', '/player-photos/cmpvn0tay00h4lbbw4xp45c8d.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T20:04:49.114Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tc900hmlbbwivst7nne', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Александро Майдана', NULL, 'DEF', 'Тальєрес', 'Тальєрес', '/player-photos/cmpvn0tc900hmlbbwivst7nne.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T20:04:49.161Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tbz00hilbbwzef121xm', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Густаво Веласкес', NULL, 'DEF', 'Серро Портеньйо', 'Серро Портеньйо', '/player-photos/cmpvn0tbz00hilbbwzef121xm.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T20:04:49.152Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tb900h8lbbwexhpav56', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Густаво Гомес', NULL, 'DEF', 'Палмейрас', 'Палмейрас', '/player-photos/cmpvn0tb900h8lbbwexhpav56.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T20:04:49.125Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tbp00helbbwxvg3s4o8', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Омар Альдерете', NULL, 'DEF', 'Сандерленд', 'Сандерленд', '/player-photos/cmpvn0tbp00helbbwxvg3s4o8.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T20:04:49.142Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tbj00hclbbw0ig3oho2', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Фабіан Бальбуена', NULL, 'DEF', 'Греміо', 'Греміо', '/player-photos/cmpvn0tbj00hclbbw0ig3oho2.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T20:04:49.135Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tc400hklbbwbu05td7l', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Хосе Канале', NULL, 'DEF', 'Ланус', 'Ланус', '/player-photos/cmpvn0tc400hklbbwbu05td7l.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T20:04:49.157Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tbe00halbbw71bkfnwa', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Хуніор Алонсо', NULL, 'DEF', 'Атлетіко Мінейро', 'Атлетіко Мінейро', '/player-photos/cmpvn0tbe00halbbw71bkfnwa.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T20:04:49.130Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tcn00hslbbw1jh2v79x', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Андрес Кубас', NULL, 'MID', 'Ванкувер Вайткепс', 'Ванкувер Вайткепс', '/player-photos/cmpvn0tcn00hslbbw1jh2v79x.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T20:04:49.176Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0td700i0lbbwvxje4ta8', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Браян Охеда', NULL, 'MID', 'Орландо Сіті', 'Орландо Сіті', '/player-photos/cmpvn0td700i0lbbwvxje4ta8.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T20:04:49.196Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0td200hylbbwnkp8f0ff', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Даміан Бобаділья', NULL, 'MID', 'Сан-Паулу', 'Сан-Паулу', '/player-photos/cmpvn0td200hylbbwnkp8f0ff.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T20:04:49.190Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tcx00hwlbbw4cga9nqu', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Дієго Гомес', NULL, 'MID', 'Брайтон енд Гоув Альбіон', 'Брайтон енд Гоув Альбіон', '/player-photos/cmpvn0tcx00hwlbbw4cga9nqu.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T20:04:49.186Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tci00hqlbbwbeqdvpnb', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Каку', NULL, 'MID', 'Аль-Айн', 'Аль-Айн', '/player-photos/cmpvn0tci00hqlbbwbeqdvpnb.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T20:04:49.171Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tdd00i2lbbwuppxpfpy', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Матіас Галарса', NULL, 'MID', 'Атланта Юнайтед', 'Атланта Юнайтед', '/player-photos/cmpvn0tdd00i2lbbwuppxpfpy.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T20:04:49.202Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tdi00i4lbbwuzu4sq47', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Маурісіо', NULL, 'MID', 'Палмейрас', 'Палмейрас', '/player-photos/cmpvn0tdi00i4lbbwuzu4sq47.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T20:04:49.206Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tce00holbbwl7u5iw0d', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Мігель Альмірон', NULL, 'MID', 'Атланта Юнайтед', 'Атланта Юнайтед', '/player-photos/cmpvn0tce00holbbwl7u5iw0d.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T20:04:49.166Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tct00hulbbwya0l7ju0', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Рамон Соса', NULL, 'MID', 'Палмейрас', 'Палмейрас', '/player-photos/cmpvn0tct00hulbbwya0l7ju0.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T20:04:49.181Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0te400iclbbw9czqnjl6', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Алекс Арсе', NULL, 'FWD', 'Індепендьєнте Рівадавія', 'Індепендьєнте Рівадавія', '/player-photos/cmpvn0te400iclbbw9czqnjl6.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T20:04:49.229Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tdn00i6lbbwxa3k690r', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Антоніо Санабрія', NULL, 'FWD', 'Кремонезе', 'Кремонезе', '/player-photos/cmpvn0tdn00i6lbbwxa3k690r.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T20:04:49.212Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0te000ialbbw5p2o6ifl', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Габріель Авалос', NULL, 'FWD', 'Індепендьєнте', 'Індепендьєнте', '/player-photos/cmpvn0te000ialbbw5p2o6ifl.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T20:04:49.224Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0ted00iglbbwh6hwf5c2', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Густаво Кабальєро', NULL, 'FWD', 'Портсмут', 'Портсмут', '/player-photos/cmpvn0ted00iglbbwh6hwf5c2.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T20:04:49.237Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0te900ielbbwrwftbmrd', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Ісідро Пітта', NULL, 'FWD', 'Ред Булл Брагантіно', 'Ред Булл Брагантіно', '/player-photos/cmpvn0te900ielbbwrwftbmrd.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T20:04:49.233Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvn0tds00i8lbbw2kkqyl1m', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'PY' LIMIT 1), 'Хуліо Енсісо', NULL, 'FWD', 'Страсбург', 'Страсбург', '/player-photos/cmpvn0tds00i8lbbw2kkqyl1m.webp', NULL, 'FINAL', 7.5, 'AVAILABLE', '2026-06-01T20:04:49.217Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8kw00jalbbwafwpbo74', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Махмуд Абунода', NULL, 'GK', 'Аль-Райян', 'Аль-Райян', '/player-photos/cmpvnh8kw00jalbbwafwpbo74.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T20:17:35.405Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8li00jelbbwr27ov4n1', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Мішааль Баршам', NULL, 'GK', 'Аль-Садд', 'Аль-Садд', '/player-photos/cmpvnh8li00jelbbwr27ov4n1.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T20:17:35.430Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8lc00jclbbww43wu994', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Салах Закарія', NULL, 'GK', 'Аль-Духаїль', 'Аль-Духаїль', '/player-photos/cmpvnh8lc00jclbbww43wu994.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T20:17:35.424Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8m800jmlbbwhriaqd2e', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Айюб Аль-Уі', NULL, 'DEF', 'Аль-Гарафа', 'Аль-Гарафа', '/player-photos/cmpvnh8m800jmlbbwhriaqd2e.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T20:17:35.456Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8mw00julbbwkax12k29', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Аль-Хашмі Аль-Хуссейн', NULL, 'DEF', 'Аль-Арабі', 'Аль-Арабі', '/player-photos/cmpvnh8mw00julbbwkax12k29.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T20:17:35.480Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8ml00jqlbbw8w2qezjh', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Буалем Хухі', NULL, 'DEF', 'Аль-Садд', 'Аль-Садд', '/player-photos/cmpvnh8ml00jqlbbw8w2qezjh.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T20:17:35.469Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8m300jklbbw5feid2kd', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Ісса Лайє', NULL, 'DEF', 'Аль-Арабі', 'Аль-Арабі', '/player-photos/cmpvnh8m300jklbbw5feid2kd.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T20:17:35.451Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8lv00jilbbwjsg7axcl', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Лукас Мендес', NULL, 'DEF', 'Аль-Вакра', 'Аль-Вакра', '/player-photos/cmpvnh8lv00jilbbwjsg7axcl.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T20:17:35.443Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8lo00jglbbwplfocws5', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Педро Мігель', NULL, 'DEF', 'Аль-Садд', 'Аль-Садд', '/player-photos/cmpvnh8lo00jglbbwplfocws5.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T20:17:35.436Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8mq00jslbbw2ohn4nwv', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Султан Аль-Брак', NULL, 'DEF', 'Аль-Духаїль', 'Аль-Духаїль', '/player-photos/cmpvnh8mq00jslbbw2ohn4nwv.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T20:17:35.475Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8mf00jolbbwmqov57hm', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Хомам Ахмед', NULL, 'DEF', 'Культураль Леонеса', 'Культураль Леонеса', '/player-photos/cmpvnh8mf00jolbbwmqov57hm.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T20:17:35.463Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8n500jylbbwlpy8s1c2', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Абдулазіз Хатем', NULL, 'MID', 'Аль-Райян', 'Аль-Райян', '/player-photos/cmpvnh8n500jylbbwlpy8s1c2.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T20:17:35.489Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8ni00k4lbbwwz05801x', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Асім Мадібо', NULL, 'MID', 'Аль-Вакра', 'Аль-Вакра', '/player-photos/cmpvnh8ni00k4lbbwwz05801x.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T20:17:35.503Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8ne00k2lbbwuexqchiv', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Ахмед Фатхі', NULL, 'MID', 'Аль-Арабі', 'Аль-Арабі', '/player-photos/cmpvnh8ne00k2lbbwuexqchiv.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T20:17:35.499Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8n100jwlbbwdxqnfadw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Джассем Габер', NULL, 'MID', 'Аль-Райян', 'Аль-Райян', '/player-photos/cmpvnh8n100jwlbbwdxqnfadw.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T20:17:35.486Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8na00k0lbbwuy39cb87', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Карім Будіаф', NULL, 'MID', 'Аль-Духаїль', 'Аль-Духаїль', '/player-photos/cmpvnh8na00k0lbbwuy39cb87.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T20:17:35.494Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8nn00k6lbbw8y00b09f', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Мохамед Аль-Маннаї', NULL, 'MID', 'Аль-Шамаль', 'Аль-Шамаль', '/player-photos/cmpvnh8nn00k6lbbw8y00b09f.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T20:17:35.507Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8od00kglbbw3tdgmu6r', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Акрам Афіф', NULL, 'FWD', 'Аль-Садд', 'Аль-Садд', '/player-photos/cmpvnh8od00kglbbw3tdgmu6r.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T20:17:35.534Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8or00kmlbbw9xp8d38s', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Альмоез Алі', NULL, 'FWD', 'Аль-Духаїль', 'Аль-Духаїль', '/player-photos/cmpvnh8or00kmlbbw9xp8d38s.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T20:17:35.547Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8ns00k8lbbw7635h01c', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Ахмед Алаеддін', NULL, 'FWD', 'Аль-Райян', 'Аль-Райян', '/player-photos/cmpvnh8ns00k8lbbw7635h01c.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T20:17:35.513Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8om00kklbbw9r3tv23g', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Ахмед Аль-Ганехі', NULL, 'FWD', 'Аль-Гарафа', 'Аль-Гарафа', '/player-photos/cmpvnh8om00kklbbw9r3tv23g.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T20:17:35.542Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8nx00kalbbw305jgb70', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Едмілсон Жуніор', NULL, 'FWD', 'Аль-Духаїль', 'Аль-Духаїль', '/player-photos/cmpvnh8nx00kalbbw305jgb70.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T20:17:35.518Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8o300kclbbwmgkxak45', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Мохаммед Мунтарі', NULL, 'FWD', 'Аль-Гарафа', 'Аль-Гарафа', '/player-photos/cmpvnh8o300kclbbwmgkxak45.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T20:17:35.523Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8ov00kolbbw7s84fp9d', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Тахсін Джамшид', NULL, 'FWD', 'Аль-Духаїль', 'Аль-Духаїль', '/player-photos/cmpvnh8ov00kolbbw7s84fp9d.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T20:17:35.552Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8o900kelbbwsjfa69df', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Хассан Аль-Хайдос', NULL, 'FWD', 'Аль-Садд', 'Аль-Садд', '/player-photos/cmpvnh8o900kelbbwsjfa69df.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T20:17:35.529Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvnh8oh00kilbbwcrojr4ef', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'QA' LIMIT 1), 'Юсуф Абдурасаг', NULL, 'FWD', 'Аль-Вакра', 'Аль-Вакра', '/player-photos/cmpvnh8oh00kilbbwcrojr4ef.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T20:17:35.538Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2gw00f5lbbw3i3uv6c7', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Ахмед Аль-Кассар', NULL, 'GK', 'Аль-Кадісія', 'Аль-Кадісія', '/player-photos/cmpvmm2gw00f5lbbw3i3uv6c7.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:53:21.152Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2g800f1lbbwypnxyiy9', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Мохаммед Аль-Овайс', NULL, 'GK', 'Аль-Ула', 'Аль-Ула', '/player-photos/cmpvmm2g800f1lbbwypnxyiy9.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:53:21.126Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2gr00f3lbbw0qr67sfo', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Наваф Аль-Акіді', NULL, 'GK', 'Ан-Наср', 'Ан-Наср', '/player-photos/cmpvmm2gr00f3lbbw0qr67sfo.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:53:21.148Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2he00fblbbwosn3crm9', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Абдулела Аль-Амрі', NULL, 'DEF', 'Ан-Наср', 'Ан-Наср', '/player-photos/cmpvmm2he00fblbbwosn3crm9.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:53:21.170Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2ho00fflbbwf8wclryz', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Алі Ладжамі', NULL, 'DEF', 'Аль-Хіляль', 'Аль-Хіляль', '/player-photos/cmpvmm2ho00fflbbwf8wclryz.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:53:21.180Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2ht00fhlbbwj2f5pmct', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Алі Маджраші', NULL, 'DEF', 'Аль-Ахлі', 'Аль-Ахлі', '/player-photos/cmpvmm2ht00fhlbbwj2f5pmct.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:53:21.185Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2ia00fnlbbwc46w4lfk', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Джехад Такрі', NULL, 'DEF', 'Аль-Кадісія', 'Аль-Кадісія', '/player-photos/cmpvmm2ia00fnlbbwc46w4lfk.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:53:21.202Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2i300fllbbwi44u87ey', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Мотеб Аль-Харбі', NULL, 'DEF', 'Аль-Хіляль', 'Аль-Хіляль', '/player-photos/cmpvmm2i300fllbbwi44u87ey.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:53:21.196Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2ie00fplbbweqx750ru', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Мохаммед Абу Аль-Шамат', NULL, 'DEF', 'Аль-Кадісія', 'Аль-Кадісія', '/player-photos/cmpvmm2ie00fplbbweqx750ru.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:53:21.206Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2hj00fdlbbwl83occrm', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Наваф Бушаль', NULL, 'DEF', 'Ан-Наср', 'Ан-Наср', '/player-photos/cmpvmm2hj00fdlbbwl83occrm.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:53:21.175Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2h000f7lbbwnx83h916', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Сауд Абдулхамід', NULL, 'DEF', 'Ланс', 'Ланс', '/player-photos/cmpvmm2h000f7lbbwnx83h916.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T19:53:21.157Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2h800f9lbbwlvittmkz', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Хассан Аль-Тамбакті', NULL, 'DEF', 'Аль-Хіляль', 'Аль-Хіляль', '/player-photos/cmpvmm2h800f9lbbwlvittmkz.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:53:21.164Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2hy00fjlbbwe39bzt5n', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Хассан Кадеш', NULL, 'DEF', 'Аль-Іттіхад', 'Аль-Іттіхад', '/player-photos/cmpvmm2hy00fjlbbwe39bzt5n.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T19:53:21.190Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2iy00fxlbbw54k3ka10', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Абдулла Аль-Хайбарі', NULL, 'MID', 'Ан-Наср', 'Ан-Наср', '/player-photos/cmpvmm2iy00fxlbbw54k3ka10.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:53:21.226Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2j900g1lbbwonkpjw3q', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Айман Ях''я', NULL, 'MID', 'Ан-Наср', 'Ан-Наср', '/player-photos/cmpvmm2j900g1lbbwonkpjw3q.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:53:21.237Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2jn00g7lbbwpax1o8i0', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Алаа Аль-Хеджі', NULL, 'MID', 'Неом', 'Неом', '/player-photos/cmpvmm2jn00g7lbbwpax1o8i0.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:53:21.252Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2jd00g3lbbw8deebbt4', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Зіяд Аль-Джохані', NULL, 'MID', 'Аль-Ахлі', 'Аль-Ахлі', '/player-photos/cmpvmm2jd00g3lbbw8deebbt4.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:53:21.242Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2io00ftlbbwhzdy7bhl', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Мохамед Канно', NULL, 'MID', 'Аль-Хіляль', 'Аль-Хіляль', '/player-photos/cmpvmm2io00ftlbbwhzdy7bhl.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T19:53:21.216Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2j300fzlbbwv0s0onym', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Мусаб Аль-Джувайр', NULL, 'MID', 'Аль-Кадісія', 'Аль-Кадісія', '/player-photos/cmpvmm2j300fzlbbwv0s0onym.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:53:21.231Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2it00fvlbbwa3w4n2ou', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Нассер Аль-Даусарі', NULL, 'MID', 'Аль-Хіляль', 'Аль-Хіляль', '/player-photos/cmpvmm2it00fvlbbwa3w4n2ou.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:53:21.221Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2ij00frlbbwkli4198q', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Салем Аль-Даусарі', NULL, 'MID', 'Аль-Хіляль', 'Аль-Хіляль', '/player-photos/cmpvmm2ij00frlbbwkli4198q.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T19:53:21.211Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2jh00g5lbbw604vbzt5', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Султан Мандаш', NULL, 'MID', 'Аль-Хіляль', 'Аль-Хіляль', '/player-photos/cmpvmm2jh00g5lbbw604vbzt5.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:53:21.246Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2k300gdlbbwgkx4arli', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Абдулла Аль-Хамдан', NULL, 'FWD', 'Аль-Наср', 'Аль-Наср', '/player-photos/cmpvmm2k300gdlbbwgkx4arli.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:53:21.267Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2jy00gblbbwv10pjj34', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Салех Аль-Шехрі', NULL, 'FWD', 'Аль-Іттіхад', 'Аль-Іттіхад', '/player-photos/cmpvmm2jy00gblbbwv10pjj34.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T19:53:21.262Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2js00g9lbbwvexke18f', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Фірас Аль-Бурайкан', NULL, 'FWD', 'Аль-Ахлі', 'Аль-Ахлі', '/player-photos/cmpvmm2js00g9lbbwvexke18f.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T19:53:21.256Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvmm2k800gflbbwdfis8gg6', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SA' LIMIT 1), 'Халід Аль-Ганнам', NULL, 'FWD', 'Аль-Іттіфак', 'Аль-Іттіфак', '/player-photos/cmpvmm2k800gflbbwdfis8gg6.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T19:53:21.272Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8t5000dlbbw9ylwd9sh', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Сантьяго Меле', NULL, 'GK', 'Монтеррей', 'Монтеррей', '/player-photos/cmpvjp8t5000dlbbw9ylwd9sh.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T18:31:50.489Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8sz000blbbwe403iaef', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Серхіо Рочет', NULL, 'GK', 'Інтернасьйонал', 'Інтернасьйонал', '/player-photos/cmpvjp8sz000blbbwe403iaef.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:31:50.484Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8sc0009lbbw53l0dyox', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Фернандо Муслера', NULL, 'GK', 'Естудіантес', 'Естудіантес', '/player-photos/cmpvjp8sc0009lbbw53l0dyox.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:31:50.460Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8tp000llbbwyp35nage', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Гільєрмо Варела', NULL, 'DEF', 'Фламенго', 'Фламенго', '/player-photos/cmpvjp8tp000llbbwyp35nage.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T18:31:50.509Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8tf000hlbbw7y9nq9pr', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Матіас Вінья', NULL, 'DEF', 'Рівер Плейт', 'Рівер Плейт', '/player-photos/cmpvjp8tf000hlbbw7y9nq9pr.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T18:31:50.500Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8tk000jlbbwcpeepwpg', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Матіас Олівера', NULL, 'DEF', 'Наполі', 'Наполі', '/player-photos/cmpvjp8tk000jlbbwcpeepwpg.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T18:31:50.504Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8tu000nlbbwkw7fjo1t', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Рональд Араухо', NULL, 'DEF', 'Барселона', 'Барселона', '/player-photos/cmpvjp8tu000nlbbwkw7fjo1t.webp', NULL, 'FINAL', 7.0, 'AVAILABLE', '2026-06-01T18:31:50.514Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8u9000tlbbws2iem89q', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Сантьяго Буено', NULL, 'DEF', 'Вулвергемптон', 'Вулвергемптон', '/player-photos/cmpvjp8u9000tlbbws2iem89q.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:31:50.529Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8tz000plbbw5hhk0yq7', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Себастьян Касерес', NULL, 'DEF', 'Америка', 'Америка', '/player-photos/cmpvjp8tz000plbbw5hhk0yq7.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T18:31:50.519Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8u5000rlbbwigj6txgw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Хоакін Пікерес', NULL, 'DEF', 'Палмейрас', 'Палмейрас', '/player-photos/cmpvjp8u5000rlbbwigj6txgw.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T18:31:50.525Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8ta000flbbwkdona0od', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Хосе Марія Хіменес', NULL, 'DEF', 'Атлетіко Мадрид', 'Атлетіко Мадрид', '/player-photos/cmpvjp8ta000flbbwkdona0od.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T18:31:50.495Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8v70017lbbwdpw4qa37', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Браян Родрігес', NULL, 'MID', 'Америка', 'Америка', '/player-photos/cmpvjp8v70017lbbwdpw4qa37.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:31:50.563Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8up000zlbbwrfbwa9i5', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Джорджіан де Арраскаета', NULL, 'MID', 'Фламенго', 'Фламенго', '/player-photos/cmpvjp8up000zlbbwrfbwa9i5.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T18:31:50.545Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8vl001dlbbw5tysxvrl', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Еміліано Мартінес', NULL, 'MID', 'Палмейрас', 'Палмейрас', '/player-photos/cmpvjp8vl001dlbbw5tysxvrl.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:31:50.577Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8vb0019lbbwgf07xk82', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Максиміліано Араухо', NULL, 'MID', 'Спортінг', 'Спортінг', '/player-photos/cmpvjp8vb0019lbbwgf07xk82.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T18:31:50.568Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8uy0013lbbw5f377xcf', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Мануель Угарте', NULL, 'MID', 'Манчестер Юнайтед', 'Манчестер Юнайтед', '/player-photos/cmpvjp8uy0013lbbw5f377xcf.webp', NULL, 'FINAL', 7.5, 'AVAILABLE', '2026-06-01T18:31:50.555Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8v30015lbbwq77cm06x', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Ніколас де ла Крус', NULL, 'MID', 'Фламенго', 'Фламенго', '/player-photos/cmpvjp8v30015lbbwq77cm06x.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T18:31:50.559Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8ue000vlbbwpu7ye3uu', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Родріго Бентанкур', NULL, 'MID', 'Тоттенгем Готспур', 'Тоттенгем Готспур', '/player-photos/cmpvjp8ue000vlbbwpu7ye3uu.webp', NULL, 'FINAL', 7.0, 'AVAILABLE', '2026-06-01T18:31:50.535Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8vp001flbbwjvih5dox', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Родріго Саласар', NULL, 'MID', 'Брага', 'Брага', '/player-photos/cmpvjp8vp001flbbwjvih5dox.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:31:50.581Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8ut0011lbbw7f83in38', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Факундо Пельїстрі', NULL, 'MID', 'Панатінаїкос', 'Панатінаїкос', '/player-photos/cmpvjp8ut0011lbbw7f83in38.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T18:31:50.550Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8uk000xlbbwhjgfd0sw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Федеріко Вальверде', NULL, 'MID', 'Реал Мадрид', 'Реал Мадрид', '/player-photos/cmpvjp8uk000xlbbwhjgfd0sw.webp', NULL, 'FINAL', 9.5, 'AVAILABLE', '2026-06-01T18:31:50.541Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8vt001hlbbwqy1o51p8', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Хуан Мануель Санабрія', NULL, 'MID', 'Реал Солт-Лейк', 'Реал Солт-Лейк', '/player-photos/cmpvjp8vt001hlbbwqy1o51p8.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T18:31:50.586Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8vh001blbbw41fnyuqq', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Агустін Каноббіо', NULL, 'FWD', 'Флуміненсе', 'Флуміненсе', '/player-photos/cmpvjp8vh001blbbw41fnyuqq.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T18:31:50.573Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8vy001jlbbw9ik067fm', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Дарвін Нуньєс', NULL, 'FWD', 'Аль-Хіляль', 'Аль-Хіляль', '/player-photos/cmpvjp8vy001jlbbw9ik067fm.webp', NULL, 'FINAL', 9.0, 'AVAILABLE', '2026-06-01T18:31:50.591Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8w7001nlbbwiuqqa2kd', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Родріго Агірре', NULL, 'FWD', 'УАНЛ Тігрес', 'УАНЛ Тігрес', '/player-photos/cmpvjp8w7001nlbbwiuqqa2kd.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T18:31:50.599Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpvjp8w2001llbbwl8jkps46', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UY' LIMIT 1), 'Федеріко Віньяс', NULL, 'FWD', 'Ов''єдо', 'Ов''єдо', '/player-photos/cmpvjp8w2001llbbwl8jkps46.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T18:31:50.595Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

COMMIT;
