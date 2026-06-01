-- Update only Canada, Czechia and Argentina players: data, prices, photos
-- Generated from local PostgreSQL database
BEGIN;

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpve8iaf005mlbhgcovzv7pz', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Вальтер Бенітес', NULL, 'GK', 'Крістал Пелес', 'Крістал Пелес', '/player-photos/cmpve8iaf005mlbhgcovzv7pz.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:58:51.543Z')
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
VALUES ('cmpve8ial005olbhg3t4rqus6', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Еміліано Мартінес', NULL, 'GK', 'Астон Вілла', 'Астон Вілла', '/player-photos/cmpve8ial005olbhg3t4rqus6.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T15:58:51.549Z')
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
VALUES ('cmpve8iaq005qlbhgohxvmnsc', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Херонімо Рульї', NULL, 'GK', 'Марсель', 'Марсель', '/player-photos/cmpve8iaq005qlbhgohxvmnsc.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:58:51.554Z')
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
VALUES ('cmpve8i9k005klbhgm6u0hvvm', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Хуан Муссо', NULL, 'GK', 'Атлетіко', 'Атлетіко', '/player-photos/cmpve8i9k005klbhgm6u0hvvm.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:58:51.509Z')
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
VALUES ('cmpve8ic70066lbhgdssdgzb2', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Гонсало Монтьєль', NULL, 'DEF', 'Рівер Плейт', 'Рівер Плейт', '/player-photos/cmpve8ic70066lbhgdssdgzb2.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:58:51.608Z')
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
VALUES ('cmpve8ic10064lbhgz7vrdih1', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Крістіан Ромеро', NULL, 'DEF', 'Тоттенгем', 'Тоттенгем', '/player-photos/cmpve8ic10064lbhgz7vrdih1.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T15:58:51.601Z')
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
VALUES ('cmpve8ibn0060lbhgo7iiuzf0', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Леонардо Балерді', NULL, 'DEF', 'Марсель', 'Марсель', '/player-photos/cmpve8ibn0060lbhgo7iiuzf0.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T15:58:51.587Z')
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
VALUES ('cmpve8ibg005ylbhgplq3bai1', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Лісандро Мартінес', NULL, 'DEF', 'Манчестер Юнайтед', 'Манчестер Юнайтед', '/player-photos/cmpve8ibg005ylbhgplq3bai1.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T15:58:51.580Z')
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
VALUES ('cmpve8ib3005ulbhgxmhd736g', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Науель Моліна', NULL, 'DEF', 'Атлетіко', 'Атлетіко', '/player-photos/cmpve8ib3005ulbhgxmhd736g.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T15:58:51.567Z')
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
VALUES ('cmpve8iav005slbhgo2du9b0c', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Ніколас Отаменді', NULL, 'DEF', 'Бенфіка', 'Бенфіка', '/player-photos/cmpve8iav005slbhgo2du9b0c.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:58:51.559Z')
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
VALUES ('cmpve8ibu0062lbhgmhgjql8q', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Ніколас Тальяфіко', NULL, 'DEF', 'Ліон', 'Ліон', '/player-photos/cmpve8ibu0062lbhgmhgjql8q.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:58:51.595Z')
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
VALUES ('cmpve8ib9005wlbhgol1j7yos', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Факундо Медіна', NULL, 'DEF', 'Марсель', 'Марсель', '/player-photos/cmpve8ib9005wlbhgol1j7yos.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T15:58:51.574Z')
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
VALUES ('cmpve8id1006clbhgu3k9l8p0', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Алексіс Мак Аллістер', NULL, 'MID', 'Ліверпуль', 'Ліверпуль', '/player-photos/cmpve8id1006clbhgu3k9l8p0.webp', NULL, 'FINAL', 8.5, 'AVAILABLE', '2026-06-01T15:58:51.637Z')
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
VALUES ('cmpve8idb006glbhgptq0fkov', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Валентін Барко', NULL, 'MID', 'Страсбур', 'Страсбур', '/player-photos/cmpve8idb006glbhgptq0fkov.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T15:58:51.647Z')
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
VALUES ('cmpve8icr0068lbhggsxb10m3', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Джованні Ло Чельсо', NULL, 'MID', 'Бетіс', 'Бетіс', '/player-photos/cmpve8icr0068lbhggsxb10m3.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T15:58:51.627Z')
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
VALUES ('cmpve8idv006olbhg0x86v54m', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Енцо Фернандес', NULL, 'MID', 'Челсі', 'Челсі', '/player-photos/cmpve8idv006olbhg0x86v54m.webp', NULL, 'FINAL', 8.0, 'AVAILABLE', '2026-06-01T15:58:51.667Z')
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
VALUES ('cmpve8idg006ilbhgmi7n8q5m', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Есекієль Паласіос', NULL, 'MID', 'Баєр', 'Баєр', '/player-photos/cmpve8idg006ilbhgmi7n8q5m.webp', NULL, 'FINAL', 7.0, 'AVAILABLE', '2026-06-01T15:58:51.652Z')
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
VALUES ('cmpve8icw006albhg5ccpvzxb', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Леандро Паредес', NULL, 'MID', 'Бока Хуніорс', 'Бока Хуніорс', '/player-photos/cmpve8icw006albhg5ccpvzxb.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T15:58:51.632Z')
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
VALUES ('cmpve8id6006elbhg7kchetbh', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Ніко Пас', NULL, 'MID', 'Комо', 'Комо', '/player-photos/cmpve8id6006elbhg7kchetbh.webp', NULL, 'FINAL', 7.0, 'AVAILABLE', '2026-06-01T15:58:51.642Z')
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
VALUES ('cmpve8idp006mlbhg4dkucllj', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Родріго де Поль', NULL, 'MID', 'Інтер Маямі', 'Інтер Маямі', '/player-photos/cmpve8idp006mlbhg4dkucllj.webp', NULL, 'FINAL', 7.0, 'AVAILABLE', '2026-06-01T15:58:51.661Z')
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
VALUES ('cmpve8idk006klbhgej2iloxx', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Тьяго Альмада', NULL, 'MID', 'Атлетіко', 'Атлетіко', '/player-photos/cmpve8idk006klbhgej2iloxx.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T15:58:51.657Z')
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
VALUES ('cmpve8iej006ylbhga815o8md', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Джуліано Сімеоне', NULL, 'FWD', 'Атлетіко', 'Атлетіко', '/player-photos/cmpve8iej006ylbhga815o8md.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T15:58:51.691Z')
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
VALUES ('cmpve8iee006wlbhgbho3k1s0', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Лаутаро Мартінес', NULL, 'FWD', 'Інтер', 'Інтер', '/player-photos/cmpve8iee006wlbhgbho3k1s0.webp', NULL, 'FINAL', 10.0, 'AVAILABLE', '2026-06-01T15:58:51.686Z')
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
VALUES ('cmpve8ie4006slbhg1j0cqbrq', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Ліонель Мессі', NULL, 'FWD', 'Інтер Маямі', 'Інтер Маямі', '/player-photos/cmpve8ie4006slbhg1j0cqbrq.webp', NULL, 'FINAL', 10.5, 'AVAILABLE', '2026-06-01T15:58:51.676Z')
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
VALUES ('cmpve8idz006qlbhgfkc477oe', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Ніколас Гонсалес', NULL, 'FWD', 'Атлетіко', 'Атлетіко', '/player-photos/cmpve8idz006qlbhgfkc477oe.webp', NULL, 'FINAL', 7.0, 'AVAILABLE', '2026-06-01T15:58:51.672Z')
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
VALUES ('cmpve8ieo0070lbhgqxlbpbz7', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Хосе Мануель Лопес', NULL, 'FWD', 'Палмейрас', 'Палмейрас', '/player-photos/cmpve8ieo0070lbhgqxlbpbz7.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T15:58:51.696Z')
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
VALUES ('cmpve8ie9006ulbhgwv4zewz7', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'AR' LIMIT 1), 'Хуліан Альварес', NULL, 'FWD', 'Атлетіко', 'Атлетіко', '/player-photos/cmpve8ie9006ulbhgwv4zewz7.webp', NULL, 'FINAL', 10.0, 'AVAILABLE', '2026-06-01T15:58:51.682Z')
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
VALUES ('cmpvda05o000ulbhgwb2mr0e1', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Дейн Сент-Клер', NULL, 'GK', 'Інтер Маямі', 'Інтер Маямі', '/player-photos/cmpvda05o000ulbhgwb2mr0e1.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:32:01.738Z')
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
VALUES ('cmpvda06h000ylbhg7wes0q6y', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Максім Крепо', NULL, 'GK', 'Орландо Сіті', 'Орландо Сіті', '/player-photos/cmpvda06h000ylbhg7wes0q6y.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:32:01.770Z')
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
VALUES ('cmpvda06c000wlbhglul6nujs', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Оуен Гудмен', NULL, 'GK', 'Барнслі', 'Барнслі', '/player-photos/cmpvda06c000wlbhglul6nujs.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T15:32:01.765Z')
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
VALUES ('cmpvda06m0010lbhgvd4pau7f', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Алістер Джонстон', NULL, 'DEF', 'Селтік', 'Селтік', '/player-photos/cmpvda06m0010lbhgvd4pau7f.webp', 'Травма', 'FINAL', 5.5, 'DOUBTFUL', '2026-06-01T15:32:01.775Z')
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
VALUES ('cmpvda0710016lbhgb6sx5dt4', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Алфі Джонс', NULL, 'DEF', 'Мідлсбро', 'Мідлсбро', '/player-photos/cmpvda0710016lbhgb6sx5dt4.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:32:01.789Z')
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
VALUES ('cmpvda0760018lbhgeza811g6', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Альфонсо Девіс', NULL, 'DEF', 'Баварія', 'Баварія', '/player-photos/cmpvda0760018lbhgeza811g6.webp', 'Травма', 'FINAL', 7.5, 'DOUBTFUL', '2026-06-01T15:32:01.794Z')
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
VALUES ('cmpvda06w0014lbhg59t9p0mk', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Дерек Корнеліус', NULL, 'DEF', 'Рейнджерс', 'Рейнджерс', '/player-photos/cmpvda06w0014lbhg59t9p0mk.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:32:01.785Z')
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
VALUES ('cmpvda06s0012lbhg3ifwrxay', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Джоел Вотермен', NULL, 'DEF', 'Чикаго Файр', 'Чикаго Файр', '/player-photos/cmpvda06s0012lbhg3ifwrxay.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T15:32:01.780Z')
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
VALUES ('cmpvda07f001clbhg9n5jvudt', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Люк де Фужероль', NULL, 'DEF', 'Дендер', 'Дендер', '/player-photos/cmpvda07f001clbhg9n5jvudt.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-01T15:32:01.803Z')
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
VALUES ('cmpvda07k001elbhg18lskhss', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Моїс Бомбіто', NULL, 'DEF', 'Ніцца', 'Ніцца', '/player-photos/cmpvda07k001elbhg18lskhss.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:32:01.808Z')
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
VALUES ('cmpvda07a001albhgjtbmtsmi', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Річі Лареа', NULL, 'DEF', 'Торонто', 'Торонто', '/player-photos/cmpvda07a001albhgjtbmtsmi.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:32:01.799Z')
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
VALUES ('cmpvda08e001qlbhgnlh9dx6e', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Алі Ахмед', NULL, 'MID', 'Норвіч Сіті', 'Норвіч Сіті', '/player-photos/cmpvda08e001qlbhgnlh9dx6e.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:32:01.838Z')
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
VALUES ('cmpvda088001olbhgzcb5pmih', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Джонатан Осоріо', NULL, 'MID', 'Торонто', 'Торонто', '/player-photos/cmpvda088001olbhgzcb5pmih.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:32:01.832Z')
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
VALUES ('cmpvda08i001slbhg4ocboa7i', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Ісмаель Коне', NULL, 'MID', 'Сассуоло', 'Сассуоло', '/player-photos/cmpvda08i001slbhg4ocboa7i.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T15:32:01.843Z')
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
VALUES ('cmpvda08s001wlbhge9ceqzbt', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Марсело Флорес', NULL, 'MID', 'Тигрес', 'Тигрес', '/player-photos/cmpvda08s001wlbhge9ceqzbt.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:32:01.852Z')
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
VALUES ('cmpvda07v001ilbhgs1zxxm1j', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Матьє Шаньєр', NULL, 'MID', 'Лос-Анджелес', 'Лос-Анджелес', '/player-photos/cmpvda07v001ilbhgs1zxxm1j.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:32:01.819Z')
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
VALUES ('cmpvda07p001glbhg4s94j1he', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Натан Саліба', NULL, 'MID', 'Андерлехт', 'Андерлехт', '/player-photos/cmpvda07p001glbhg4s94j1he.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:32:01.814Z')
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
VALUES ('cmpvda08n001ulbhgs7vea09l', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Ніко Сігур', NULL, 'MID', 'Хайдук', 'Хайдук', '/player-photos/cmpvda08n001ulbhgs7vea09l.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:32:01.847Z')
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
VALUES ('cmpvda080001klbhg4are5jr7', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Стівен Ейштакіу', NULL, 'MID', 'Лос-Анджелес', 'Лос-Анджелес', '/player-photos/cmpvda080001klbhg4are5jr7.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T15:32:01.825Z')
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
VALUES ('cmpvda084001mlbhg83lzynbe', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Таджон Б''юкенен', NULL, 'MID', 'Вільярреал', 'Вільярреал', '/player-photos/cmpvda084001mlbhg83lzynbe.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T15:32:01.828Z')
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
VALUES ('cmpvda0920020lbhgwjuq6le7', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Джейкоб Шаффельбург', NULL, 'FWD', 'Лос-Анджелес', 'Лос-Анджелес', '/player-photos/cmpvda0920020lbhgwjuq6le7.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T15:32:01.862Z')
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
VALUES ('cmpvda08x001ylbhgv5kl10c5', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Джонатан Девід', NULL, 'FWD', 'Ювентус', 'Ювентус', '/player-photos/cmpvda08x001ylbhgv5kl10c5.webp', NULL, 'FINAL', 8.5, 'AVAILABLE', '2026-06-01T15:32:01.858Z')
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
VALUES ('cmpvda09g0026lbhgv6abu8dn', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Кайл Ларін', NULL, 'FWD', 'Саутгемптон', 'Саутгемптон', '/player-photos/cmpvda09g0026lbhgv6abu8dn.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T15:32:01.876Z')
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
VALUES ('cmpvda09c0024lbhgf5sd6fr6', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Лієм Міллар', NULL, 'FWD', 'Галл', 'Галл', '/player-photos/cmpvda09c0024lbhgf5sd6fr6.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:32:01.872Z')
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
VALUES ('cmpvda0970022lbhglob8ob2h', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Проміс Девід', NULL, 'FWD', 'Юніон Сент-Жіллуаз', 'Юніон Сент-Жіллуаз', '/player-photos/cmpvda0970022lbhglob8ob2h.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:32:01.867Z')
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
VALUES ('cmpvda09k0028lbhg5y2lp6xu', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CA' LIMIT 1), 'Тані Олувасейі', NULL, 'FWD', 'Вільярреал', 'Вільярреал', '/player-photos/cmpvda09k0028lbhg5y2lp6xu.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:32:01.880Z')
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
VALUES ('cmpvdro3y003llbhgpzl7ypwq', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Індржих Станек', NULL, 'GK', 'Славія Прага', 'Славія Прага', '/player-photos/cmpvdro3y003llbhgpzl7ypwq.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:45:45.935Z')
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
VALUES ('cmpvdro3t003jlbhg7rkx1fgy', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Лукаш Горнічек', NULL, 'GK', 'Брага', 'Брага', '/player-photos/cmpvdro3t003jlbhg7rkx1fgy.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:45:45.930Z')
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
VALUES ('cmpvdro3f003hlbhgx4ores7b', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Матей Коварж', NULL, 'GK', 'ПСВ', 'ПСВ', '/player-photos/cmpvdro3f003hlbhgx4ores7b.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:45:45.914Z')
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
VALUES ('cmpvdro57003zlbhgv3r9mlfg', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Владімір Цоуфал', NULL, 'DEF', 'Гоффенгайм', 'Гоффенгайм', '/player-photos/cmpvdro57003zlbhgv3r9mlfg.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T15:45:45.979Z')
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
VALUES ('cmpvdro4g003rlbhgjthj726o', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Давід Доудера', NULL, 'DEF', 'Славія Прага', 'Славія Прага', '/player-photos/cmpvdro4g003rlbhgjthj726o.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:45:45.952Z')
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
VALUES ('cmpvdro4z003xlbhg8lhfvyd7', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Давід Зіма', NULL, 'DEF', 'Славія Прага', 'Славія Прага', '/player-photos/cmpvdro4z003xlbhg8lhfvyd7.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:45:45.971Z')
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
VALUES ('cmpvdro680043lbhg9f2984jh', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Давід Юрасек', NULL, 'DEF', 'Славія Прага', 'Славія Прага', '/player-photos/cmpvdro680043lbhg9f2984jh.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:45:46.016Z')
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
VALUES ('cmpvdro620041lbhgze0kevps', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Ладіслав Крейчий', NULL, 'DEF', 'Вулвергемптон', 'Вулвергемптон', '/player-photos/cmpvdro620041lbhgze0kevps.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-01T15:45:46.011Z')
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
VALUES ('cmpvdro44003nlbhgezjmzdzp', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Робін Гранач', NULL, 'DEF', 'Гоффенгайм', 'Гоффенгайм', '/player-photos/cmpvdro44003nlbhgezjmzdzp.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:45:45.940Z')
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
VALUES ('cmpvdro4l003tlbhg3k67pm4q', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Томаш Голеш', NULL, 'DEF', 'Славія Прага', 'Славія Прага', '/player-photos/cmpvdro4l003tlbhg3k67pm4q.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:45:45.957Z')
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
VALUES ('cmpvdro4a003plbhgsg2spj53', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Штепан Халоупек', NULL, 'DEF', 'Славія Прага', 'Славія Прага', '/player-photos/cmpvdro4a003plbhgsg2spj53.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:45:45.946Z')
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
VALUES ('cmpvdro4t003vlbhgg81dmukl', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Ярослав Зелений', NULL, 'DEF', 'Спарта', 'Спарта', '/player-photos/cmpvdro4t003vlbhgg81dmukl.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:45:45.966Z')
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
VALUES ('cmpvdro6j0047lbhg55f6mvzg', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Александр Сойка', NULL, 'MID', 'Вікторія Пльзень', 'Вікторія Пльзень', '/player-photos/cmpvdro6j0047lbhg55f6mvzg.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:45:46.028Z')
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
VALUES ('cmpvdro78004flbhgppm6n0pl', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Владімір Даріда', NULL, 'MID', 'Градець-Кралове', 'Градець-Кралове', '/player-photos/cmpvdro78004flbhgppm6n0pl.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:45:46.053Z')
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
VALUES ('cmpvdro7o004llbhgc4zwkse8', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Гуго Сохурек', NULL, 'MID', 'Спарта', 'Спарта', '/player-photos/cmpvdro7o004llbhgc4zwkse8.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:45:46.069Z')
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
VALUES ('cmpvdro6t004blbhg3jythq26', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Деніс Вишинський', NULL, 'MID', 'Вікторія Пльзень', 'Вікторія Пльзень', '/player-photos/cmpvdro6t004blbhg3jythq26.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-01T15:45:46.037Z')
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
VALUES ('cmpvdro72004dlbhgdz5hzxb2', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Лукаш Провод', NULL, 'MID', 'Славія Прага', 'Славія Прага', '/player-photos/cmpvdro72004dlbhgdz5hzxb2.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T15:45:46.047Z')
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
VALUES ('cmpvdro7k004jlbhgv3kvoj8g', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Лукаш Черв', NULL, 'MID', 'Вікторія Пльзень', 'Вікторія Пльзень', '/player-photos/cmpvdro7k004jlbhgv3kvoj8g.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:45:46.065Z')
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
VALUES ('cmpvdro6c0045lbhgqnlsxfb6', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Міхал Саділек', NULL, 'MID', 'Славія Прага', 'Славія Прага', '/player-photos/cmpvdro6c0045lbhgqnlsxfb6.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:45:46.021Z')
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
VALUES ('cmpvdro7f004hlbhgx1f2emp2', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Павел Шульц', NULL, 'MID', 'Ліон', 'Ліон', '/player-photos/cmpvdro7f004hlbhgx1f2emp2.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T15:45:46.059Z')
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
VALUES ('cmpvdro6o0049lbhgfw7jzi7q', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Томаш Соучек', NULL, 'MID', 'Вест Гем', 'Вест Гем', '/player-photos/cmpvdro6o0049lbhgfw7jzi7q.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T15:45:46.033Z')
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
VALUES ('cmpvdro7t004nlbhgyxy2ghyi', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Адам Гложек', NULL, 'FWD', 'Гоффенгайм', 'Гоффенгайм', '/player-photos/cmpvdro7t004nlbhgyxy2ghyi.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-01T15:45:46.074Z')
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
VALUES ('cmpvdro7z004plbhg93skgohm', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Моймір Хитіл', NULL, 'FWD', 'Славія Прага', 'Славія Прага', '/player-photos/cmpvdro7z004plbhg93skgohm.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-01T15:45:46.079Z')
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
VALUES ('cmpvdro83004rlbhgigb1jrfg', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Патрік Шик', NULL, 'FWD', 'Баєр', 'Баєр', '/player-photos/cmpvdro83004rlbhgigb1jrfg.webp', NULL, 'FINAL', 7.5, 'AVAILABLE', '2026-06-01T15:45:46.084Z')
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
VALUES ('cmpvdro88004tlbhgta5wasgz', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Томаш Хорий', NULL, 'FWD', 'Славія Прага', 'Славія Прага', '/player-photos/cmpvdro88004tlbhgta5wasgz.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T15:45:46.089Z')
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
VALUES ('cmpvdro8e004vlbhgmhmpu4oy', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'CZ' LIMIT 1), 'Ян Кухта', NULL, 'FWD', 'Спарта', 'Спарта', '/player-photos/cmpvdro8e004vlbhgmhmpu4oy.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-01T15:45:46.095Z')
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
