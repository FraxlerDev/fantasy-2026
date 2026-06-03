-- Update only Ghana, Turkiye, Senegal, Uzbekistan, Jordan and Egypt players.
-- Includes player data, prices and photoUrl. Does not touch users, squads, leagues, chats or petitions.
-- Safe upsert by Player.id. Existing players with different ids are not deleted.
BEGIN;

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4ik00ajlbhg3ju47v4o', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Ель Махді Сулейман', NULL, 'GK', 'Замалек', 'Замалек', '/player-photos/cmpxau4ik00ajlbhg3ju47v4o.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:59:14.012Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4ia00aflbhgyaf9wx7v', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Мостафа Шобеїр', NULL, 'GK', 'Аль-Ахлі', 'Аль-Ахлі', '/player-photos/cmpxau4ia00aflbhgyaf9wx7v.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:59:14.003Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4if00ahlbhgtxpcb4zk', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Мохамед Алаа', NULL, 'GK', 'Ель-Гуна', 'Ель-Гуна', '/player-photos/cmpxau4if00ahlbhgtxpcb4zk.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:59:14.007Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4hz00adlbhgxd4f7vrj', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Мохамед Ель Шенаві', NULL, 'GK', 'Аль-Ахлі', 'Аль-Ахлі', '/player-photos/cmpxau4hz00adlbhgxd4f7vrj.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-02T23:59:13.990Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4iy00aplbhgoyacae9t', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Ахмед Абу Ель Фотух', NULL, 'DEF', 'Замалек', 'Замалек', '/player-photos/cmpxau4iy00aplbhgoyacae9t.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:59:14.026Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4je00axlbhgmjbg7o5n', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Карім Хафез', NULL, 'DEF', 'Пірамідс', 'Пірамідс', '/player-photos/cmpxau4je00axlbhgmjbg7o5n.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:59:14.042Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4j200arlbhgfqdiyrpn', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Мохамед Абдельмонем', NULL, 'DEF', 'Ніцца', 'Ніцца', '/player-photos/cmpxau4j200arlbhgfqdiyrpn.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-02T23:59:14.030Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4it00anlbhgpyo4c8t7', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Мохамед Хані', NULL, 'DEF', 'Аль-Ахлі', 'Аль-Ахлі', '/player-photos/cmpxau4it00anlbhgpyo4c8t7.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:59:14.021Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4io00allbhgribg8els', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Рамі Рабіа', NULL, 'DEF', 'Аль-Айн', 'Аль-Айн', '/player-photos/cmpxau4io00allbhgribg8els.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:59:14.016Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4ji00azlbhgu155vykr', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Тарек Алаа', NULL, 'DEF', 'ЗЕД', 'ЗЕД', '/player-photos/cmpxau4ji00azlbhgu155vykr.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:59:14.046Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4j900avlbhgwls4ib8l', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Хоссам Абдельмагід', NULL, 'DEF', 'Замалек', 'Замалек', '/player-photos/cmpxau4j900avlbhgwls4ib8l.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:59:14.038Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4j500atlbhgueyauth0', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Яссер Ібрагім', NULL, 'DEF', 'Аль-Ахлі', 'Аль-Ахлі', '/player-photos/cmpxau4j500atlbhgueyauth0.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:59:14.033Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4k600b5lbhgk053oaqb', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Імам Ашур', NULL, 'MID', 'Аль-Ахлі', 'Аль-Ахлі', '/player-photos/cmpxau4k600b5lbhgk053oaqb.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-02T23:59:14.070Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4k200b3lbhgk9xjo7es', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Марван Аттія', NULL, 'MID', 'Аль-Ахлі', 'Аль-Ахлі', '/player-photos/cmpxau4k200b3lbhgk9xjo7es.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-02T23:59:14.066Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4ke00b9lbhgqnwflmsq', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Махмуд Сабер', NULL, 'MID', 'ЗЕД', 'ЗЕД', '/player-photos/cmpxau4ke00b9lbhgqnwflmsq.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:59:14.079Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4kl00bdlbhglminci8w', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Мостафа Зіко', NULL, 'MID', 'Пірамідс', 'Пірамідс', '/player-photos/cmpxau4kl00bdlbhglminci8w.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:59:14.086Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4kb00b7lbhgtx2z0vha', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Моханад Лашін', NULL, 'MID', 'Пірамідс', 'Пірамідс', '/player-photos/cmpxau4kb00b7lbhgtx2z0vha.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:59:14.075Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4ki00bblbhg5blbjvx5', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Набіль Емад', NULL, 'MID', 'Аль-Наджма', 'Аль-Наджма', '/player-photos/cmpxau4ki00bblbhg5blbjvx5.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:59:14.082Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4jl00b1lbhg6ka5j1ak', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Хамді Фаті', NULL, 'MID', 'Аль-Вакра', 'Аль-Вакра', '/player-photos/cmpxau4jl00b1lbhg6ka5j1ak.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:59:14.050Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4ky00bjlbhgtg5igcqa', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Зізо', NULL, 'FWD', 'Аль-Ахлі', 'Аль-Ахлі', '/player-photos/cmpxau4ky00bjlbhgtg5igcqa.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-02T23:59:14.098Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4l700bnlbhgx8x6nmtf', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Ібрагім Адель', NULL, 'FWD', 'Норшелланн', 'Норшелланн', '/player-photos/cmpxau4l700bnlbhgx8x6nmtf.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-02T23:59:14.107Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4kq00bflbhgl1edob4z', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Мохамед Салах', NULL, 'FWD', 'Ліверпуль', 'Ліверпуль', '/player-photos/cmpxau4kq00bflbhgl1edob4z.webp', NULL, 'FINAL', 10.5, 'AVAILABLE', '2026-06-02T23:59:14.091Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4l100bllbhgd2gmhu64', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Омар Мармуш', NULL, 'FWD', 'Манчестер Сіті', 'Манчестер Сіті', '/player-photos/cmpxau4l100bllbhgd2gmhu64.webp', NULL, 'FINAL', 10.5, 'AVAILABLE', '2026-06-02T23:59:14.102Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4ku00bhlbhgpdp8kzwa', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Трезеге', NULL, 'FWD', 'Аль-Ахлі', 'Аль-Ахлі', '/player-photos/cmpxau4ku00bhlbhgpdp8kzwa.webp', NULL, 'FINAL', 7.0, 'AVAILABLE', '2026-06-02T23:59:14.094Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4la00bplbhgqdyv5q3y', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Хайссем Хассан', NULL, 'FWD', 'Ов’єдо', 'Ов’єдо', '/player-photos/cmpxau4la00bplbhgqdyv5q3y.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-02T23:59:14.111Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxau4li00btlbhgvmggjtlp', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'EG' LIMIT 1), 'Хамза Абделькарім', NULL, 'FWD', 'Барселона Б', 'Барселона Б', '/player-photos/cmpxau4li00btlbhgvmggjtlp.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:59:14.118Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v1yh000clbhgdmff8hb1', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Бенджамін Асаре', NULL, 'GK', 'Гартс оф Оук', 'Гартс оф Оук', '/player-photos/cmpx8v1yh000clbhgdmff8hb1.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:03:58.121Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v1yb000albhgbsrlh5hy', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Джозеф Ананг', NULL, 'GK', 'Сент-Патрікс Атлетік', 'Сент-Патрікс Атлетік', '/player-photos/cmpx8v1yb000albhgbsrlh5hy.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:03:58.115Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v1xo0008lbhgfan9vfav', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Лоуренс Аті-Зігі', NULL, 'GK', 'Санкт-Галлен', 'Санкт-Галлен', '/player-photos/cmpx8v1xo0008lbhgfan9vfav.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:03:58.092Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v1yx000ilbhg2dz8p36g', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Абдул Мумін', NULL, 'DEF', 'Райо Вальєкано', 'Райо Вальєкано', '/player-photos/cmpx8v1yx000ilbhg2dz8p36g.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:03:58.137Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v1z7000mlbhgw5q13om6', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Абдул Рахман Баба', NULL, 'DEF', 'ПАОК', 'ПАОК', '/player-photos/cmpx8v1z7000mlbhgw5q13om6.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:03:58.147Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v1ym000elbhgsx99vshv', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Аліду Сейду', NULL, 'DEF', 'Ренн', 'Ренн', '/player-photos/cmpx8v1ym000elbhgsx99vshv.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-02T23:03:58.126Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v1z2000klbhg5253r6ac', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Гідеон Менса', NULL, 'DEF', 'Осер', 'Осер', '/player-photos/cmpx8v1z2000klbhg5253r6ac.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:03:58.143Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v1zm000slbhgt0wk6u8h', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Деррік Луккассен', NULL, 'DEF', 'Пафос', 'Пафос', '/player-photos/cmpx8v1zm000slbhgt0wk6u8h.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:03:58.163Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v1zc000olbhg0cc3e6gw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Джером Опоку', NULL, 'DEF', 'Істанбул', 'Істанбул', '/player-photos/cmpx8v1zc000olbhg0cc3e6gw.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:03:58.152Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v1ys000glbhgy1f38ob7', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Йонас Аджетей', NULL, 'DEF', 'Вольфсбург', 'Вольфсбург', '/player-photos/cmpx8v1ys000glbhgy1f38ob7.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-02T23:03:58.132Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v1zi000qlbhg2k419b6n', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Коджо Пепра Оппонг', NULL, 'DEF', 'Ніцца', 'Ніцца', '/player-photos/cmpx8v1zi000qlbhg2k419b6n.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-02T23:03:58.158Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v1zs000ulbhg8ccjutxd', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Марвен Сеная', NULL, 'DEF', 'Осер', 'Осер', '/player-photos/cmpx8v1zs000ulbhg8ccjutxd.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:03:58.168Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v2060010lbhg0hy44drk', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Абдул Фатаву', NULL, 'MID', 'Лестер Сіті', 'Лестер Сіті', '/player-photos/cmpx8v2060010lbhg0hy44drk.webp', NULL, 'FINAL', 8.0, 'AVAILABLE', '2026-06-02T23:03:58.182Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v20f0014lbhghy3m5jnc', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Еліша Овусу', NULL, 'MID', 'Осер', 'Осер', '/player-photos/cmpx8v20f0014lbhghy3m5jnc.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:03:58.191Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v1zw000wlbhgza1awbr2', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Калеб Іренкі', NULL, 'MID', 'Норшелланн', 'Норшелланн', '/player-photos/cmpx8v1zw000wlbhgza1awbr2.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-02T23:03:58.172Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v20a0012lbhgwhwze747', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Квасі Сібо', NULL, 'MID', 'Ов''єдо', 'Ов''єдо', '/player-photos/cmpx8v20a0012lbhgwhwze747.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:03:58.187Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v20k0016lbhgeqmegl49', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Огюстін Боак''є', NULL, 'MID', 'Сент-Етьєн', 'Сент-Етьєн', '/player-photos/cmpx8v20k0016lbhgeqmegl49.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-02T23:03:58.196Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v200000ylbhg3nyrtvj7', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Томас Парті', NULL, 'MID', 'Вільярреал', 'Вільярреал', '/player-photos/cmpx8v200000ylbhg3nyrtvj7.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-02T23:03:58.177Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v20y001clbhgxt6dg55d', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Антуан Семеньйо', NULL, 'FWD', 'Манчестер Сіті', 'Манчестер Сіті', '/player-photos/cmpx8v20y001clbhgxt6dg55d.webp', NULL, 'FINAL', 10.5, 'AVAILABLE', '2026-06-02T23:03:58.210Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v20t001albhgs6jccahi', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Брендон Томас-Асанте', NULL, 'FWD', 'Ковентрі Сіті', 'Ковентрі Сіті', '/player-photos/cmpx8v20t001albhgs6jccahi.webp', NULL, 'FINAL', 7.5, 'AVAILABLE', '2026-06-02T23:03:58.206Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v20p0018lbhgveduiy74', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Джордан Айю', NULL, 'FWD', 'Лестер Сіті', 'Лестер Сіті', '/player-photos/cmpx8v20p0018lbhgveduiy74.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-02T23:03:58.201Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v21i001klbhghlxyeidv', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Ернест Нуама', NULL, 'FWD', 'Ліон', 'Ліон', '/player-photos/cmpx8v21i001klbhghlxyeidv.webp', NULL, 'FINAL', 7.0, 'AVAILABLE', '2026-06-02T23:03:58.230Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v218001glbhgwhdxikxy', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Іньякі Вільямс', NULL, 'FWD', 'Атлетік Більбао', 'Атлетік Більбао', '/player-photos/cmpx8v218001glbhgwhdxikxy.webp', NULL, 'FINAL', 7.5, 'AVAILABLE', '2026-06-02T23:03:58.220Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v21c001ilbhgjuxqum0j', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Камалдін Сулемана', NULL, 'FWD', 'Аталанта', 'Аталанта', '/player-photos/cmpx8v21c001ilbhgjuxqum0j.webp', NULL, 'FINAL', 7.5, 'AVAILABLE', '2026-06-02T23:03:58.225Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v213001elbhg6ni03yis', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Крістофер Бонсу Баа', NULL, 'FWD', 'Аль-Кадісія', 'Аль-Кадісія', '/player-photos/cmpx8v213001elbhg6ni03yis.webp', NULL, 'FINAL', 7.0, 'AVAILABLE', '2026-06-02T23:03:58.216Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx8v21m001mlbhg5rf0q9y5', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'GH' LIMIT 1), 'Прінс Квабена Аду', NULL, 'FWD', 'Вікторія Пльзень', 'Вікторія Пльзень', '/player-photos/cmpx8v21m001mlbhg5rf0q9y5.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-02T23:03:58.235Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadh8k008glbhgn1bd2qlg', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Абдалла Аль-Фахурі', NULL, 'GK', 'Аль-Вехдат', 'Аль-Вехдат', '/player-photos/cmpxadh8k008glbhgn1bd2qlg.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:46:17.348Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadh8f008elbhg46eph5w3', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Нур Бані Аттія', NULL, 'GK', 'Аль-Файсалі', 'Аль-Файсалі', '/player-photos/cmpxadh8f008elbhg46eph5w3.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:46:17.343Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadh83008clbhgy4lobi2i', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Язід Абулайла', NULL, 'GK', 'Аль-Хуссейн', 'Аль-Хуссейн', '/player-photos/cmpxadh83008clbhgy4lobi2i.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:46:17.331Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadh8t008klbhgs14mb2a2', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Абдалла Насіб', NULL, 'DEF', 'Аль-Завраа', 'Аль-Завраа', '/player-photos/cmpxadh8t008klbhgs14mb2a2.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:46:17.358Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadh9r008ylbhg50xsif3w', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Анас Бадаві', NULL, 'DEF', 'Аль-Файсалі', 'Аль-Файсалі', '/player-photos/cmpxadh9r008ylbhg50xsif3w.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:46:17.391Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadh9m008wlbhgsjzhusmx', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Іхсан Хаддад', NULL, 'DEF', 'Аль-Хуссейн', 'Аль-Хуссейн', '/player-photos/cmpxadh9m008wlbhgsjzhusmx.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:46:17.387Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadh99008qlbhg217yfnnu', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Мо Абуалнаді', NULL, 'DEF', 'Селангор', 'Селангор', '/player-photos/cmpxadh99008qlbhg217yfnnu.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:46:17.373Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadh8o008ilbhgl4p28tto', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Мохаммад Абу Хашиш', NULL, 'DEF', 'Аль-Карма', 'Аль-Карма', '/player-photos/cmpxadh8o008ilbhgl4p28tto.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:46:17.353Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadh9i008ulbhgdgaite9o', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Саед Аль-Росан', NULL, 'DEF', 'Аль-Хуссейн', 'Аль-Хуссейн', '/player-photos/cmpxadh9i008ulbhgdgaite9o.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:46:17.382Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadh9e008slbhgzc2qu8dx', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Салім Обайд', NULL, 'DEF', 'Аль-Хуссейн', 'Аль-Хуссейн', '/player-photos/cmpxadh9e008slbhgzc2qu8dx.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:46:17.378Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadh8z008mlbhgfstyoew7', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Хусам Абу Дахаб', NULL, 'DEF', 'Аль-Файсалі', 'Аль-Файсалі', '/player-photos/cmpxadh8z008mlbhgfstyoew7.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:46:17.363Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadh94008olbhgma6e0wx8', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Язан Аль-Араб', NULL, 'DEF', 'ФК Сеул', 'ФК Сеул', '/player-photos/cmpxadh94008olbhgma6e0wx8.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:46:17.368Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadh9v0090lbhg9phbquy4', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Амер Джамус', NULL, 'MID', 'Аль-Завраа', 'Аль-Завраа', '/player-photos/cmpxadh9v0090lbhg9phbquy4.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:46:17.395Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadhaa0096lbhgxtz77w4b', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Ібрагім Садех', NULL, 'MID', 'Аль-Карма', 'Аль-Карма', '/player-photos/cmpxadhaa0096lbhgxtz77w4b.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:46:17.410Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadhan009clbhg4i51dahn', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Мохаммад Аль-Дауад', NULL, 'MID', 'Аль-Вехдат', 'Аль-Вехдат', '/player-photos/cmpxadhan009clbhg4i51dahn.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:46:17.424Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadhae0098lbhguw4o8ao8', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Моханнад Абу Таха', NULL, 'MID', 'Аль-Кува Аль-Джавія', 'Аль-Кува Аль-Джавія', '/player-photos/cmpxadhae0098lbhguw4o8ao8.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:46:17.414Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadhaj009albhguz8s416d', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Нізар Аль-Рашдан', NULL, 'MID', 'Катар СК', 'Катар СК', '/player-photos/cmpxadhaj009albhguz8s416d.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:46:17.419Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadha00092lbhg8t768n79', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Нур Аль-Равабдех', NULL, 'MID', 'Селангор', 'Селангор', '/player-photos/cmpxadha00092lbhg8t768n79.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:46:17.401Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadha60094lbhgcxm9ks58', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Раджаї Айед', NULL, 'MID', 'Аль-Хуссейн', 'Аль-Хуссейн', '/player-photos/cmpxadha60094lbhgcxm9ks58.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:46:17.406Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadhbm009qlbhgzch37t85', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Алі Азайзе', NULL, 'FWD', 'Аль-Шабаб', 'Аль-Шабаб', '/player-photos/cmpxadhbm009qlbhgzch37t85.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:46:17.458Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadhax009glbhgp0btjz8t', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Алі Олван', NULL, 'FWD', 'Аль-Сайлія', 'Аль-Сайлія', '/player-photos/cmpxadhax009glbhgp0btjz8t.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:46:17.433Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadhbh009olbhgxd9yiop2', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Ібрагім Сабра', NULL, 'FWD', 'Локомотива Загреб', 'Локомотива Загреб', '/player-photos/cmpxadhbh009olbhgxd9yiop2.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:46:17.454Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadhbb009mlbhgc67321z2', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Махмуд Аль-Марді', NULL, 'FWD', 'Аль-Хуссейн', 'Аль-Хуссейн', '/player-photos/cmpxadhbb009mlbhgc67321z2.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:46:17.447Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadhas009elbhg3qc4swdu', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Мохаммад Абу Зрайк', NULL, 'FWD', 'Раджа Касабланка', 'Раджа Касабланка', '/player-photos/cmpxadhas009elbhg3qc4swdu.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:46:17.428Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadhb2009ilbhg72frnap1', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Муса Аль-Таамарі', NULL, 'FWD', 'Ренн', 'Ренн', '/player-photos/cmpxadhb2009ilbhg72frnap1.webp', NULL, 'FINAL', 7.0, 'AVAILABLE', '2026-06-02T23:46:17.438Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxadhb6009klbhg3nvlgf93', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'JO' LIMIT 1), 'Одех Аль-Фахурі', NULL, 'FWD', 'Пірамідс', 'Пірамідс', '/player-photos/cmpxadhb6009klbhg3nvlgf93.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:46:17.442Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2wc004elbhg1ibfpjcx', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Еванн Діуф', NULL, 'GK', 'Ніцца', 'Ніцца', '/player-photos/cmpx9p2wc004elbhg1ibfpjcx.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-02T23:27:19.021Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2w0004albhgjv1b7hik', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Едуар Менді', NULL, 'GK', 'Аль-Ахлі', 'Аль-Ахлі', '/player-photos/cmpx9p2w0004albhgjv1b7hik.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-02T23:27:19.007Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2w8004clbhgocmr4ods', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Морі Діау', NULL, 'GK', 'Гавр', 'Гавр', '/player-photos/cmpx9p2w8004clbhgocmr4ods.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:27:19.016Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2x1004olbhgnn8yilr5', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Абдулає Сек', NULL, 'DEF', 'Маккабі Хайфа', 'Маккабі Хайфа', '/player-photos/cmpx9p2x1004olbhgnn8yilr5.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:27:19.045Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2xa004slbhg8bsdex2f', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Антуан Менді', NULL, 'DEF', 'Ніцца', 'Ніцца', '/player-photos/cmpx9p2xa004slbhg8bsdex2f.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:27:19.054Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2x5004qlbhge3f7txt8', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Ель Хаджі Малік Діуф', NULL, 'DEF', 'Вест Хем', 'Вест Хем', '/player-photos/cmpx9p2x5004qlbhge3f7txt8.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-02T23:27:19.050Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2ww004mlbhgslunf5u7', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Ісмаїл Якобс', NULL, 'DEF', 'Галатасарай', 'Галатасарай', '/player-photos/cmpx9p2ww004mlbhgslunf5u7.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-02T23:27:19.040Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2wh004glbhgkty72dyf', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Калідо Кулібалі', NULL, 'DEF', 'Аль-Хіляль', 'Аль-Хіляль', '/player-photos/cmpx9p2wh004glbhgkty72dyf.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-02T23:27:19.026Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2wm004ilbhgdqzzymu7', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Крепен Діатта', NULL, 'DEF', 'Монако', 'Монако', '/player-photos/cmpx9p2wm004ilbhgdqzzymu7.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-02T23:27:19.030Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2xf004ulbhgz97ppzsy', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Мамаду Сарр', NULL, 'DEF', 'Челсі', 'Челсі', '/player-photos/cmpx9p2xf004ulbhgz97ppzsy.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-02T23:27:19.059Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2wr004klbhglcx8nv2j', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Мусса Ніакате', NULL, 'DEF', 'Ліон', 'Ліон', '/player-photos/cmpx9p2wr004klbhglcx8nv2j.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-02T23:27:19.035Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2y90058lbhga173tq5y', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Бара Сапоко Ндіає', NULL, 'MID', 'Баварія', 'Баварія', '/player-photos/cmpx9p2y90058lbhga173tq5y.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:27:19.090Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2xi004wlbhgqh0ez2mv', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Ідрісса Гує', NULL, 'MID', 'Евертон', 'Евертон', '/player-photos/cmpx9p2xi004wlbhgqh0ez2mv.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:27:19.063Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2y00054lbhgqbghivvh', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Ламін Камара', NULL, 'MID', 'Монако', 'Монако', '/player-photos/cmpx9p2y00054lbhgqbghivvh.webp', NULL, 'FINAL', 8.5, 'AVAILABLE', '2026-06-02T23:27:19.081Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2xm004ylbhgy8xx56zi', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Пап Гує', NULL, 'MID', 'Вільярреал', 'Вільярреал', '/player-photos/cmpx9p2xm004ylbhgy8xx56zi.webp', NULL, 'FINAL', 7.5, 'AVAILABLE', '2026-06-02T23:27:19.067Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2xs0050lbhgin02xfqk', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Пап Матар Сарр', NULL, 'MID', 'Тоттенгем', 'Тоттенгем', '/player-photos/cmpx9p2xs0050lbhgin02xfqk.webp', NULL, 'FINAL', 8.5, 'AVAILABLE', '2026-06-02T23:27:19.072Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2xw0052lbhglt9d5zea', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Пате Сісс', NULL, 'MID', 'Райо Вальєкано', 'Райо Вальєкано', '/player-photos/cmpx9p2xw0052lbhglt9d5zea.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:27:19.076Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2y40056lbhgw5x3prwh', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Хабіб Діарра', NULL, 'MID', 'Сандерленд', 'Сандерленд', '/player-photos/cmpx9p2y40056lbhgw5x3prwh.webp', NULL, 'FINAL', 8.5, 'AVAILABLE', '2026-06-02T23:27:19.084Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2za005olbhgzw12zg82', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Ассан Діао', NULL, 'FWD', 'Комо', 'Комо', '/player-photos/cmpx9p2za005olbhgzw12zg82.webp', NULL, 'FINAL', 8.0, 'AVAILABLE', '2026-06-02T23:27:19.126Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2yv005ilbhgor0jk66h', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Бамба Дьєн', NULL, 'FWD', 'Лор’ян', 'Лор’ян', '/player-photos/cmpx9p2yv005ilbhgor0jk66h.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-02T23:27:19.112Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2z6005mlbhgd783q8h3', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Ібрагім Мбає', NULL, 'FWD', 'Парі Сен-Жермен', 'Парі Сен-Жермен', '/player-photos/cmpx9p2z6005mlbhgd783q8h3.webp', NULL, 'FINAL', 8.0, 'AVAILABLE', '2026-06-02T23:27:19.122Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2ym005elbhg0h65ilob', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Іліман Ндіає', NULL, 'FWD', 'Евертон', 'Евертон', '/player-photos/cmpx9p2ym005elbhg0h65ilob.webp', NULL, 'FINAL', 9.5, 'AVAILABLE', '2026-06-02T23:27:19.102Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2yi005clbhgxvh513sc', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Ісмаїла Сарр', NULL, 'FWD', 'Крістал Пелас', 'Крістал Пелас', '/player-photos/cmpx9p2yi005clbhgxvh513sc.webp', NULL, 'FINAL', 8.5, 'AVAILABLE', '2026-06-02T23:27:19.098Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2yr005glbhghw787bsx', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Ніколя Джексон', NULL, 'FWD', 'Баварія', 'Баварія', '/player-photos/cmpx9p2yr005glbhghw787bsx.webp', NULL, 'FINAL', 10.0, 'AVAILABLE', '2026-06-02T23:27:19.108Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2yd005albhgild73d8d', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Садіо Мане', NULL, 'FWD', 'Аль-Наср', 'Аль-Наср', '/player-photos/cmpx9p2yd005albhgild73d8d.webp', NULL, 'FINAL', 8.0, 'AVAILABLE', '2026-06-02T23:27:19.094Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9p2z0005klbhg0pa3xmbc', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'SN' LIMIT 1), 'Шериф Ндіає', NULL, 'FWD', 'Самсунспор', 'Самсунспор', '/player-photos/cmpx9p2z0005klbhg0pa3xmbc.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-02T23:27:19.117Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbn4002blbhgfrm6elsm', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Алтай Байндир', NULL, 'GK', 'Манчестер Юнайтед', 'Манчестер Юнайтед', '/player-photos/cmpx9dbn4002blbhgfrm6elsm.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-02T23:18:10.480Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbmp0029lbhgw9c5jp5t', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Мерт Гюнок', NULL, 'GK', 'Фенербахче', 'Фенербахче', '/player-photos/cmpx9dbmp0029lbhgw9c5jp5t.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:18:10.464Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbna002dlbhgb47pzx8p', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Угурджан Чакир', NULL, 'GK', 'Галатасарай', 'Галатасарай', '/player-photos/cmpx9dbna002dlbhgb47pzx8p.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-02T23:18:10.486Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbnx002nlbhgegqjdxxt', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Абдулкерім Бардакджи', NULL, 'DEF', 'Галатасарай', 'Галатасарай', '/player-photos/cmpx9dbnx002nlbhgegqjdxxt.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-02T23:18:10.510Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbnt002llbhgt5t52beg', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Ерен Елмали', NULL, 'DEF', 'Галатасарай', 'Галатасарай', '/player-photos/cmpx9dbnt002llbhgt5t52beg.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:18:10.505Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbne002flbhgrdldw3tw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Зекі Челік', NULL, 'DEF', 'Рома', 'Рома', '/player-photos/cmpx9dbne002flbhgrdldw3tw.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-02T23:18:10.490Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbni002hlbhgpn2nzj5w', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Меріх Демірал', NULL, 'DEF', 'Аль-Ахлі', 'Аль-Ахлі', '/player-photos/cmpx9dbni002hlbhgpn2nzj5w.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-02T23:18:10.494Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbo7002rlbhgqbofcg7d', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Мерт Мюльдюр', NULL, 'DEF', 'Фенербахче', 'Фенербахче', '/player-photos/cmpx9dbo7002rlbhgqbofcg7d.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-02T23:18:10.519Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbo2002plbhgut6s05qv', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Озан Кабак', NULL, 'DEF', 'Гоффенгайм', 'Гоффенгайм', '/player-photos/cmpx9dbo2002plbhgut6s05qv.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-02T23:18:10.514Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbog002vlbhgxh1eamrf', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Самет Акайдин', NULL, 'DEF', 'Чайкур Різеспор', 'Чайкур Різеспор', '/player-photos/cmpx9dbog002vlbhgxh1eamrf.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:18:10.529Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbob002tlbhgy9hxgazh', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Ферді Кадіоглу', NULL, 'DEF', 'Брайтон', 'Брайтон', '/player-photos/cmpx9dbob002tlbhgy9hxgazh.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-02T23:18:10.523Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbno002jlbhgnaiwp3xw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Чаглар Сьоюнджю', NULL, 'DEF', 'Фенербахче', 'Фенербахче', '/player-photos/cmpx9dbno002jlbhgnaiwp3xw.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-02T23:18:10.501Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dboy0033lbhgjjla1a5u', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Ісмаїл Юксек', NULL, 'MID', 'Фенербахче', 'Фенербахче', '/player-photos/cmpx9dboy0033lbhgjjla1a5u.webp', NULL, 'FINAL', 7.0, 'AVAILABLE', '2026-06-02T23:18:10.546Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbp30035lbhggbm8dc28', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Каан Айхан', NULL, 'MID', 'Галатасарай', 'Галатасарай', '/player-photos/cmpx9dbp30035lbhggbm8dc28.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:18:10.552Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dboq002zlbhgsmj2bva3', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Оркун Кьокчю', NULL, 'MID', 'Бешикташ', 'Бешикташ', '/player-photos/cmpx9dboq002zlbhgsmj2bva3.webp', NULL, 'FINAL', 8.0, 'AVAILABLE', '2026-06-02T23:18:10.538Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbom002xlbhgqc2xe5v4', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Саліх Озджан', NULL, 'MID', 'Боруссія Дортмунд', 'Боруссія Дортмунд', '/player-photos/cmpx9dbom002xlbhgqc2xe5v4.webp', NULL, 'FINAL', 5.5, 'AVAILABLE', '2026-06-02T23:18:10.534Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbou0031lbhgt2al6ytg', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Хакан Чалханоглу', NULL, 'MID', 'Інтер', 'Інтер', '/player-photos/cmpx9dbou0031lbhgt2al6ytg.webp', NULL, 'FINAL', 8.0, 'AVAILABLE', '2026-06-02T23:18:10.542Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbpc0039lbhgpmi8gaay', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Арда Гюлер', NULL, 'FWD', 'Реал Мадрид', 'Реал Мадрид', '/player-photos/cmpx9dbpc0039lbhgpmi8gaay.webp', NULL, 'FINAL', 11.0, 'AVAILABLE', '2026-06-02T23:18:10.560Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbpx003jlbhgthnk4vek', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Бариш Алпер Їлмаз', NULL, 'FWD', 'Галатасарай', 'Галатасарай', '/player-photos/cmpx9dbpx003jlbhgthnk4vek.webp', NULL, 'FINAL', 8.5, 'AVAILABLE', '2026-06-02T23:18:10.582Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbpg003blbhgyhcvqovj', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Деніз Гюль', NULL, 'FWD', 'Порту', 'Порту', '/player-photos/cmpx9dbpg003blbhgyhcvqovj.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-02T23:18:10.564Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbq7003nlbhg6tuk3gq5', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Джан Узун', NULL, 'FWD', 'Айнтрахт Франкфурт', 'Айнтрахт Франкфурт', '/player-photos/cmpx9dbq7003nlbhg6tuk3gq5.webp', NULL, 'FINAL', 9.5, 'AVAILABLE', '2026-06-02T23:18:10.591Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbpo003flbhgrpmnleb1', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Ірфан Джан Кахведжі', NULL, 'FWD', 'Касимпаша', 'Касимпаша', '/player-photos/cmpx9dbpo003flbhgrpmnleb1.webp', NULL, 'FINAL', 6.0, 'AVAILABLE', '2026-06-02T23:18:10.573Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbpl003dlbhgmjwms0tw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Кенан Їлдиз', NULL, 'FWD', 'Ювентус', 'Ювентус', '/player-photos/cmpx9dbpl003dlbhgmjwms0tw.webp', NULL, 'FINAL', 10.5, 'AVAILABLE', '2026-06-02T23:18:10.569Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbp70037lbhgxfvc6sqf', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Керем Актюркоглу', NULL, 'FWD', 'Фенербахче', 'Фенербахче', '/player-photos/cmpx9dbp70037lbhgxfvc6sqf.webp', NULL, 'FINAL', 8.0, 'AVAILABLE', '2026-06-02T23:18:10.556Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbq2003llbhgmfwga794', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Огуз Айдин', NULL, 'FWD', 'Фенербахче', 'Фенербахче', '/player-photos/cmpx9dbq2003llbhgmfwga794.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-02T23:18:10.587Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpx9dbpt003hlbhgbtl0evh5', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'TR' LIMIT 1), 'Юнус Акгюн', NULL, 'FWD', 'Галатасарай', 'Галатасарай', '/player-photos/cmpx9dbpt003hlbhgbtl0evh5.webp', NULL, 'FINAL', 7.5, 'AVAILABLE', '2026-06-02T23:18:10.577Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0ty8006dlbhg63cqmyxu', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Абдувохід Нематов', NULL, 'GK', 'Насаф', 'Насаф', '/player-photos/cmpxa0ty8006dlbhg63cqmyxu.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:36:27.296Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0tye006flbhg32e0p9aa', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Ботіралі Ергашев', NULL, 'GK', 'Нефтчі', 'Нефтчі', '/player-photos/cmpxa0tye006flbhg32e0p9aa.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:36:27.302Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0txy006blbhgiq1t1izh', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Уткір Юсупов', NULL, 'GK', 'Навбахор', 'Навбахор', '/player-photos/cmpxa0txy006blbhgiq1t1izh.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:36:27.286Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0tyi006hlbhgp220kjem', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Абдукодір Хусанов', NULL, 'DEF', 'Манчестер Сіті', 'Манчестер Сіті', '/player-photos/cmpxa0tyi006hlbhgp220kjem.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-02T23:36:27.306Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0tza006tlbhgrrl9fnem', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Абдулла Абдуллаев', NULL, 'DEF', 'Дібба', 'Дібба', '/player-photos/cmpxa0tza006tlbhgrrl9fnem.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:36:27.334Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0tzh006xlbhg53s0y2ye', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Авазбек Улмасаліев', NULL, 'DEF', 'АГМК', 'АГМК', '/player-photos/cmpxa0tzh006xlbhg53s0y2ye.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:36:27.342Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0tze006vlbhg93rp8fex', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Бехруз Карімов', NULL, 'DEF', 'Сурхон', 'Сурхон', '/player-photos/cmpxa0tze006vlbhg93rp8fex.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:36:27.338Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0tzl006zlbhg4gl1fqal', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Джахонгір Урозов', NULL, 'DEF', 'Динамо Самарканд', 'Динамо Самарканд', '/player-photos/cmpxa0tzl006zlbhg4gl1fqal.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:36:27.346Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0tyx006nlbhgl0oi1v68', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Рустам Ашурматов', NULL, 'DEF', 'Естегляль', 'Естегляль', '/player-photos/cmpxa0tyx006nlbhgl0oi1v68.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:36:27.322Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0tz6006rlbhg040udg37', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Умар Ешмуродов', NULL, 'DEF', 'Насаф', 'Насаф', '/player-photos/cmpxa0tz6006rlbhg040udg37.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:36:27.330Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0tyt006llbhgf3wcirv1', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Фаррух Сайфіев', NULL, 'DEF', 'Нефтчі', 'Нефтчі', '/player-photos/cmpxa0tyt006llbhgf3wcirv1.webp', NULL, 'FINAL', 4.0, 'AVAILABLE', '2026-06-02T23:36:27.318Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0tym006jlbhgjj138g9c', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Ходжіакбар Аліджонов', NULL, 'DEF', 'Пахтакор', 'Пахтакор', '/player-photos/cmpxa0tym006jlbhgjj138g9c.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:36:27.311Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0tz1006plbhgq3ss49ii', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Шерзод Насруллаев', NULL, 'DEF', 'Насаф', 'Насаф', '/player-photos/cmpxa0tz1006plbhgq3ss49ii.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:36:27.326Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0u0j007hlbhg5byr9o2k', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Аббосбек Файзуллаев', NULL, 'MID', 'Істанбул Башакшехір', 'Істанбул Башакшехір', '/player-photos/cmpxa0u0j007hlbhg5byr9o2k.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-02T23:36:27.379Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0u0f007flbhgxsijqvlz', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Азізжон Ганіев', NULL, 'MID', 'Аль-Батаех', 'Аль-Батаех', '/player-photos/cmpxa0u0f007flbhgxsijqvlz.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:36:27.376Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0tzq0071lbhgygr25unv', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Акмал Мозговой', NULL, 'MID', 'Пахтакор', 'Пахтакор', '/player-photos/cmpxa0tzq0071lbhgygr25unv.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:36:27.350Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0tzx0075lbhg8qzix1as', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Джамшид Іскандеров', NULL, 'MID', 'Нефтчі', 'Нефтчі', '/player-photos/cmpxa0tzx0075lbhg8qzix1as.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:36:27.357Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0u0c007dlbhgiocyaq27', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Достонбек Хамдамов', NULL, 'MID', 'Пахтакор', 'Пахтакор', '/player-photos/cmpxa0u0c007dlbhgiocyaq27.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:36:27.372Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0u040079lbhgched7xef', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Жалоліддін Машаріпов', NULL, 'MID', 'Естегляль', 'Естегляль', '/player-photos/cmpxa0u040079lbhgched7xef.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:36:27.364Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0u000077lbhgp5i0d50t', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Оділжон Хамробеков', NULL, 'MID', 'Трактор', 'Трактор', '/player-photos/cmpxa0u000077lbhgp5i0d50t.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:36:27.361Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0u08007blbhg50sfciyw', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Остон Урунов', NULL, 'MID', 'Персеполіс', 'Персеполіс', '/player-photos/cmpxa0u08007blbhg50sfciyw.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:36:27.369Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0tzt0073lbhg8qtvwuac', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Отабек Шукуров', NULL, 'MID', 'Баніяс', 'Баніяс', '/player-photos/cmpxa0tzt0073lbhg8qtvwuac.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:36:27.354Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0u0p007jlbhg7i5j4h2k', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Шерзод Есанов', NULL, 'MID', 'Бухара', 'Бухара', '/player-photos/cmpxa0u0p007jlbhg7i5j4h2k.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:36:27.385Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0u0z007nlbhgmkb6qvd0', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Азізбек Амонов', NULL, 'FWD', 'Бухара', 'Бухара', '/player-photos/cmpxa0u0z007nlbhgmkb6qvd0.webp', NULL, 'FINAL', 4.5, 'AVAILABLE', '2026-06-02T23:36:27.395Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0u0u007llbhgsvfrzrn0', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Елдор Шомуродов', NULL, 'FWD', 'Істанбул Башакшехір', 'Істанбул Башакшехір', '/player-photos/cmpxa0u0u007llbhgsvfrzrn0.webp', NULL, 'FINAL', 6.5, 'AVAILABLE', '2026-06-02T23:36:27.391Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
  "nameOriginal" = EXCLUDED."nameOriginal",
  "position" = EXCLUDED."position",
  "club" = EXCLUDED."club",
  "clubOriginal" = EXCLUDED."clubOriginal",
  "photoUrl" = EXCLUDED."photoUrl",
  "unavailableReason" = EXCLUDED."unavailableReason",
  "squadStatus" = EXCLUDED."squadStatus",
  "price" = EXCLUDED."price",
  "status" = EXCLUDED."status";

INSERT INTO "Player" ("id", "nationalTeamId", "name", "nameOriginal", "position", "club", "clubOriginal", "photoUrl", "unavailableReason", "squadStatus", "price", "status", "createdAt")
VALUES ('cmpxa0u14007plbhgm4doby7o', (SELECT "id" FROM "NationalTeam" WHERE "code" = 'UZ' LIMIT 1), 'Ігор Сергеев', NULL, 'FWD', 'Персеполіс', 'Персеполіс', '/player-photos/cmpxa0u14007plbhgm4doby7o.webp', NULL, 'FINAL', 5.0, 'AVAILABLE', '2026-06-02T23:36:27.401Z')
ON CONFLICT ("id") DO UPDATE SET
  "nationalTeamId" = EXCLUDED."nationalTeamId",
  "name" = EXCLUDED."name",
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
