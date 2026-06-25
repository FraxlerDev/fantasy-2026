import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { TextDecoder } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const requireFromWeb = createRequire(path.join(repoRoot, "apps", "web", "package.json"));
const requireFromRoot = createRequire(import.meta.url);
const { PrismaClient } = requireFromWeb("@prisma/client");
const iconv = requireFromRoot("iconv-lite");
const envPath = path.join(repoRoot, "apps", "web", ".env");

if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, "utf8");
  for (const line of env.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^"(.*)"$/, "$1");
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

const csvPath = process.argv[2];
const exportPath = process.argv[3] ?? path.join(repoRoot, "exports", "player-prices-update.sql");

if (!csvPath) {
  console.error("Usage: node scripts/update-player-prices-from-csv.mjs <csv-path> [export-path]");
  process.exit(1);
}

function normalize(value) {
  return String(value ?? "")
    .trim()
    .replace(/^\uFEFF/, "")
    .replace(/[’`]/g, "'")
    .replace(/\?/g, "")
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("uk");
}

function normalizedNameKeys(value) {
  const normalized = normalize(value);
  if (!normalized) return [];
  const keys = new Set([normalized]);
  const parts = normalized.split(/[\s-]+/).filter(Boolean);
  const last = parts.at(-1);
  if (last) keys.add(last);
  return Array.from(keys);
}

function latinNormalize(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, "")
    .toLowerCase();
}

function latinSkeleton(value) {
  return latinNormalize(value).replace(/[aeiouy]+/g, "");
}

function latinVariants(value) {
  const base = latinNormalize(value);
  const variants = new Set([base]);
  const replacements = [
    [/sch/g, "sh"],
    [/ck/g, "k"],
    [/x/g, "ks"],
    [/c/g, "k"],
    [/q/g, "k"],
    [/w/g, "v"],
    [/z/g, "s"],
  ];

  let current = base;
  for (const [pattern, replacement] of replacements) {
    current = current.replace(pattern, replacement);
    variants.add(current);
  }

  for (const variant of Array.from(variants)) {
    variants.add(variant.replace(/g/g, "h"));
    variants.add(variant.replace(/h/g, "g"));
  }

  return Array.from(variants).filter(Boolean);
}

function latinSearchKeys(value) {
  const raw = String(value ?? "");
  const parts = raw.split(/[\s-]+/).filter(Boolean);
  const keys = new Set();
  for (const item of [raw, ...parts]) {
    for (const variant of latinVariants(item)) {
      keys.add(variant);
      keys.add(latinSkeleton(variant));
    }
  }
  return Array.from(keys).filter((key) => key.length >= 2);
}

const ukToLatinMap = new Map(
  Object.entries({
    а: "a",
    б: "b",
    в: "v",
    г: "h",
    ґ: "g",
    д: "d",
    е: "e",
    є: "ye",
    ж: "zh",
    з: "z",
    и: "y",
    і: "i",
    ї: "yi",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ь: "",
    ю: "yu",
    я: "ya",
    "'": "",
    "’": "",
    "-": " ",
  }),
);

for (const [char, latin] of Object.entries({
  а: "a",
  б: "b",
  в: "v",
  г: "h",
  ґ: "g",
  д: "d",
  е: "e",
  є: "ye",
  ж: "zh",
  з: "z",
  и: "y",
  і: "i",
  ї: "yi",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ь: "",
  ю: "yu",
  я: "ya",
  "’": "",
})) {
  ukToLatinMap.set(char, latin);
}

function transliterateUkToLatin(value) {
  return normalize(value)
    .split("")
    .map((char) => ukToLatinMap.get(char) ?? char)
    .join("");
}

function latinNameKeysFromUk(value) {
  const transliterated = transliterateUkToLatin(value);
  return latinSearchKeys(transliterated);
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  const current = Array.from({ length: b.length + 1 }, () => 0);

  for (let i = 1; i <= a.length; i += 1) {
    current[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous.splice(0, previous.length, ...current);
  }

  return previous[b.length];
}

function repairMojibake(value) {
  const text = String(value ?? "");
  if (!/[РС][\u0400-\u04FF]/.test(text)) return text;

  const decoded = iconv.encode(text, "win1251").toString("utf8");
  return decoded.includes("\uFFFD") ? text : decoded;
}

function addIndexEntry(index, teamKey, nameKey, player) {
  if (!teamKey || !nameKey) return;
  const key = `${teamKey}::${nameKey}`;
  const list = index.get(key) ?? [];
  if (!list.some((entry) => entry.id === player.id)) list.push(player);
  index.set(key, list);
}

const manualAliases = new Map(
  [
    ["Австралія", "Irvine", "ірвайн"],
    ["Австралія", "Luongo", "луонго"],
    ["Австрія", "Ljubicic", "любичич"],
    ["Австрія", "Kalajdzic", "калайджич"],
    ["Алжир", "Boudoui", "будауї"],
    ["Алжир", "Hadjam", "хаджам"],
    ["Аргентина", "Paz", "пас"],
    ["Аргентина", "Senesi", "сенесі"],
    ["Аргентина", "Lo Celso", "чельсо"],
    ["Бельгія", "Meunier", "меньє"],
    ["Боснія і Герцеговина", "Sunjic", "сунджік"],
    ["Боснія і Герцеговина", "Jukic", "лукік"],
    ["Бразилія", "Est?v?o", "естев"],
    ["ДР Конго", "Bongonda", "бонгонда"],
    ["Канада", "Crepeau", "крепо"],
    ["Канада", "Eustaquio", "еустакіо"],
    ["Канада", "Nelson", "нельсон"],
    ["Колумбія", "D?az", "діас"],
    ["Колумбія", "R?os", "ріос"],
    ["Колумбія", "C?rdoba", "кордоба"],
    ["Хорватія", "Sucic", "сучич"],
    ["Хорватія", "Jakic", "якич"],
    ["Єгипет", "Mohamed Salah", "салах"],
    ["Єгипет", "Mohamed Hany", "гані"],
    ["Ірак", "Zaid Tahseen", "тахсін"],
    ["Іран", "Mohebi", "мохебі"],
    ["Іран", "Kanani", "канані"],
    ["Іран", "Hajsafi", "хаджсафі"],
    ["Іран", "Jahanbakhsh", "джаханбахш"],
    ["Іран", "Dargahi", "даргахі"],
    ["Кот-д’Івуар", "Guccgand", "ґессан"],
    ["Кюрасао", "Room", "роом"],
    ["Кюрасао", "Rosaria", "розарія"],
    ["Кюрасао", "Gobitez", "гобітез"],
    ["Німеччина", "Tah", "та"],
    ["Німеччина", "Thiaw", "тіав"],
    ["Франція", "Digne", "дінь"],
    ["Чехія", "Cerny", "черни"],
    ["Англія", "James", "джеймс"],
    ["Англія", "O'Rielly", "райлі"],
    ["Англія", "Mainoo", "майну"],
    ["Англія", "Toney", "тоней"],
    ["Англія", "Chalobah", "чалоба"],
    ["Гаїті", "Etienne", "етьєн"],
    ["Гаїті", "Metusala", "метусала"],
    ["Парагвай", "Romero", "ромеро"],
    ["Катар", "Ahmed Fathy", "фатхі"],
    ["Катар", "Ahmed Alaa", "алаа"],
    ["Катар", "Ahmed Al Ganeny", "ганені"],
    ["Катар", "Mohmud Abunada", "абунада"],
    ["Мексика", "Jim?nez", "хіменес"],
    ["Мексика", "Qui?ones", "кіньйонес"],
    ["Марокко", "Bouchadi", "бушаді"],
    ["Марокко", "El Kajoui", "кайуі"],
    ["Марокко", "Saiss", "саїсс"],
    ["Марокко", "Igamane", "ігаман"],
    ["Марокко", "Tagnaouti", "тагнауті"],
    ["Марокко", "Hilali", "хілалі"],
    ["Нідерланди", "van de Ven", "ван де вен"],
    ["Нідерланди", "Ak?", "аке"],
    ["Нідерланди", "Wijnaldum", "вейналдум"],
    ["Нова Зеландія", "Just", "джаст"],
    ["Нова Зеландія", "Waine", "вейн"],
    ["Норвегія", "?degaard", "едегор"],
    ["Панама", "D?az", "діас"],
    ["Панама", "Mej?a", "мехія"],
    ["Панама", "Fari?a", "фарінья"],
    ["Узбекистан", "Jiyanov", "жиянов"],
    ["Узбекистан", "Alijonov", "аліжонов"],
    ["Саудівська Аравія", "Abbas Al Hajj", "хадж"],
    ["Саудівська Аравія", "Ali Lajami", "ладжамі"],
    ["Сенегал", "Jackson", "джексон"],
    ["Сенегал", "Dia", "діа"],
    ["Сенегал", "Seck", "сек"],
    ["Швеція", "Hien", "гієн"],
    ["Швейцарія", "Hefti", "хефті"],
    ["Швейцарія", "Comert", "комерт"],
    ["Туреччина", "Bardakci", "бардакджи"],
    ["Туреччина", "Cifci", "чифчі"],
    ["Туреччина", "Soyuncu", "союнджу"],
    ["США", "Ream", "рім"],
    ["США", "Freese", "фріз"],
    ["США", "Weah", "веа"],
    ["США", "Wright", "райт"],
  ].map(([team, player, alias]) => [`${normalize(team)}::${latinNormalize(player)}`, normalize(alias)]),
);

for (const [team, player, alias] of [
  ["Австралія", "Irvine", "ірвайн"],
  ["Австралія", "Luongo", "луонго"],
  ["Австрія", "Ljubicic", "любичич"],
  ["Австрія", "Kalajdzic", "калайджич"],
  ["Алжир", "Boudoui", "будауї"],
  ["Алжир", "Hadjam", "хаджам"],
  ["Аргентина", "Paz", "пас"],
  ["Аргентина", "Senesi", "сенесі"],
  ["Аргентина", "Lo Celso", "чельсо"],
  ["Бельгія", "Meunier", "меньє"],
  ["Боснія і Герцеговина", "Sunjic", "сунджік"],
  ["Боснія і Герцеговина", "Jukic", "лукік"],
  ["Бразилія", "Est?v?o", "естев"],
  ["ДР Конго", "Bongonda", "бонгонда"],
  ["Канада", "Crepeau", "крепо"],
  ["Канада", "Eustaquio", "еустакіо"],
  ["Канада", "Nelson", "нельсон"],
  ["Колумбія", "D?az", "діас"],
  ["Колумбія", "R?os", "ріос"],
  ["Колумбія", "C?rdoba", "кордоба"],
  ["Хорватія", "Sucic", "сучич"],
  ["Хорватія", "Jakic", "якич"],
  ["Єгипет", "Mohamed Salah", "салах"],
  ["Єгипет", "Mohamed Hany", "гані"],
  ["Ірак", "Zaid Tahseen", "тахсін"],
  ["Іран", "Mohebi", "мохебі"],
  ["Іран", "Kanani", "канані"],
  ["Іран", "Hajsafi", "хаджсафі"],
  ["Іран", "Jahanbakhsh", "джаханбахш"],
  ["Іран", "Dargahi", "даргахі"],
  ["Кот-д’Івуар", "Guccgand", "ґессан"],
  ["Кюрасао", "Room", "роом"],
  ["Кюрасао", "Rosaria", "розарія"],
  ["Кюрасао", "Gobitez", "гобітез"],
  ["Німеччина", "Tah", "та"],
  ["Німеччина", "Thiaw", "тіав"],
  ["Франція", "Digne", "дінь"],
  ["Чехія", "Cerny", "черни"],
  ["Англія", "James", "джеймс"],
  ["Англія", "O'Rielly", "райлі"],
  ["Англія", "Mainoo", "майну"],
  ["Англія", "Toney", "тоней"],
  ["Англія", "Chalobah", "чалоба"],
  ["Гаїті", "Etienne", "етьєн"],
  ["Гаїті", "Metusala", "метусала"],
  ["Парагвай", "Romero", "ромеро"],
  ["Катар", "Ahmed Fathy", "фатхі"],
  ["Катар", "Ahmed Alaa", "алаа"],
  ["Катар", "Ahmed Al Ganeny", "ганені"],
  ["Катар", "Mohmud Abunada", "абунада"],
  ["Мексика", "Jim?nez", "хіменес"],
  ["Мексика", "Qui?ones", "кіньйонес"],
  ["Марокко", "Bouchadi", "бушаді"],
  ["Марокко", "El Kajoui", "кайуі"],
  ["Марокко", "Saiss", "саїсс"],
  ["Марокко", "Igamane", "ігаман"],
  ["Марокко", "Tagnaouti", "тагнауті"],
  ["Марокко", "Hilali", "хілалі"],
  ["Нідерланди", "van de Ven", "ван де вен"],
  ["Нідерланди", "Ak?", "аке"],
  ["Нідерланди", "Wijnaldum", "вейналдум"],
  ["Нова Зеландія", "Just", "джаст"],
  ["Нова Зеландія", "Waine", "вейн"],
  ["Норвегія", "?degaard", "едегор"],
  ["Панама", "D?az", "діас"],
  ["Панама", "Mej?a", "мехія"],
  ["Панама", "Fari?a", "фарінья"],
  ["Узбекистан", "Jiyanov", "жиянов"],
  ["Узбекистан", "Alijonov", "аліжонов"],
  ["Саудівська Аравія", "Abbas Al Hajj", "хадж"],
  ["Саудівська Аравія", "Ali Lajami", "ладжамі"],
  ["Сенегал", "Jackson", "джексон"],
  ["Сенегал", "Dia", "діа"],
  ["Сенегал", "Seck", "сек"],
  ["Швеція", "Hien", "гієн"],
  ["Швейцарія", "Hefti", "хефті"],
  ["Швейцарія", "Comert", "комерт"],
  ["Туреччина", "Bardakci", "бардакджи"],
  ["Туреччина", "Cifci", "чифчі"],
  ["Туреччина", "Soyuncu", "союнджу"],
  ["США", "Ream", "рім"],
  ["США", "Freese", "фріз"],
  ["США", "Weah", "веа"],
  ["США", "Wright", "райт"],
]) {
  manualAliases.set(`${normalize(team)}::${latinNormalize(player)}`, normalize(alias));
}

for (const [team, player, alias] of [
  ["Боснія і Герцеговина", "Sunjic", "шуньїч"],
  ["Боснія і Герцеговина", "Jukic", "лукич"],
  ["Канада", "Eustaquio", "ейштакіу"],
  ["Єгипет", "Mohamed Hany", "хані"],
  ["Іран", "Kanani", "канаанізадеган"],
  ["Кюрасао", "Room", "елой ром"],
  ["Німеччина", "Thiaw", "тшау"],
  ["Англія", "Toney", "тоуні"],
  ["Катар", "Ahmed Alaa", "алаеддін"],
  ["Катар", "Ahmed Al Ganeny", "ганехі"],
  ["Катар", "Mohmud Abunada", "абунода"],
  ["Марокко", "El Kajoui", "мохамеді"],
  ["Марокко", "Tagnaouti", "таньяті"],
  ["Узбекистан", "Alijonov", "аліджонов"],
  ["Саудівська Аравія", "Abbas Al Hajj", "хеджі"],
  ["Швеція", "Hien", "ісак гін"],
  ["Швейцарія", "Comert", "джомерт"],
  ["Туреччина", "Soyuncu", "сьоюнджю"],
]) {
  manualAliases.set(`${normalize(team)}::${latinNormalize(player)}`, normalize(alias));
}

function parseCsvLine(line) {
  const result = [];
  let value = "";
  let quoted = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && quoted && next === '"') {
      value += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      result.push(value.trim());
      value = "";
      continue;
    }

    value += char;
  }

  result.push(value.trim());
  return result;
}

function sqlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

const prisma = new PrismaClient();

const csvBuffer = fs.readFileSync(csvPath);
let csv = new TextDecoder("utf-8", { fatal: false }).decode(csvBuffer);
if (csv.includes("\uFFFD")) {
  csv = new TextDecoder("windows-1251").decode(csvBuffer);
}
csv = csv.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
const lines = csv.split("\n").filter((line) => line.trim().length > 0);
const [headerLine, ...dataLines] = lines;
const headers = parseCsvLine(headerLine).map(normalize);

const teamIndex = headers.findIndex((header) => ["збірна", "team", "nationalteam"].includes(header));
const playerIndex = headers.findIndex((header) => ["гравець", "player", "name"].includes(header));
const priceIndex = headers.findIndex((header) => ["ціна", "price"].includes(header));

if (teamIndex === -1 || playerIndex === -1 || priceIndex === -1) {
  console.error(`CSV must contain columns: збірна, гравець, ціна. Found: ${headers.join(", ")}`);
  process.exit(1);
}

const rows = dataLines.map((line, index) => {
  const cells = parseCsvLine(line);
  return {
    rowNumber: index + 2,
    team: cells[teamIndex]?.trim() ?? "",
    player: cells[playerIndex]?.trim() ?? "",
    price: cells[priceIndex]?.trim() ?? "",
  };
});

const invalidRows = [];
const validRows = [];

for (const row of rows) {
  const price = Number(row.price.replace(",", "."));
  if (!row.team || !row.player || !Number.isFinite(price) || price <= 0) {
    invalidRows.push(row);
    continue;
  }
  validRows.push({ ...row, price: price.toFixed(1) });
}

const players = await prisma.player.findMany({
  select: {
    id: true,
    name: true,
    nameOriginal: true,
    price: true,
    nationalTeam: { select: { nameUk: true, code: true } },
  },
});

const byTeamAndName = new Map();
const dbByTeamAndName = new Map();
const playersByTeam = new Map();
for (const player of players) {
  const teamKeys = [player.nationalTeam.nameUk, player.nationalTeam.code].filter(Boolean).map(normalize);
  const nameKeys = [player.name, player.nameOriginal].filter(Boolean).flatMap(normalizedNameKeys);
  for (const teamKey of teamKeys) {
    const teamPlayers = playersByTeam.get(teamKey) ?? [];
    if (!teamPlayers.some((entry) => entry.id === player.id)) teamPlayers.push(player);
    playersByTeam.set(teamKey, teamPlayers);
    for (const nameKey of nameKeys) {
      addIndexEntry(byTeamAndName, teamKey, nameKey, player);
      addIndexEntry(dbByTeamAndName, teamKey, nameKey, player);
    }
    for (const latinKey of latinNameKeysFromUk(player.name)) {
      addIndexEntry(byTeamAndName, teamKey, latinKey, player);
    }
  }
}

const squadsPath = path.join(repoRoot, "data", "final_squads_2026.json");
if (fs.existsSync(squadsPath)) {
  const squadsData = JSON.parse(fs.readFileSync(squadsPath, "utf8"));
  for (const squad of squadsData.squads ?? []) {
    const teamName = repairMojibake(squad.countryUk);
    const teamKey = normalize(teamName);
    for (const squadPlayer of squad.players ?? []) {
      const playerName = repairMojibake(squadPlayer.name);
      const dbMatches = dbByTeamAndName.get(`${teamKey}::${normalize(playerName)}`) ?? [];
      if (dbMatches.length === 0) continue;

      const originalKeys = normalizedNameKeys(squadPlayer.nameOriginal);
      for (const dbPlayer of dbMatches) {
        for (const originalKey of originalKeys) {
          addIndexEntry(byTeamAndName, teamKey, originalKey, dbPlayer);
        }
      }
    }
  }
}

const updates = [];
const unmatchedRows = [];

for (const row of validRows) {
  const teamKey = normalize(row.team);
  const csvKeys = latinSearchKeys(row.player);
  const csvName = csvKeys[0] ?? latinNormalize(row.player);
  let matches = byTeamAndName.get(`${teamKey}::${normalize(row.player)}`) ?? [];
  if (matches.length === 0) {
    const alias = manualAliases.get(`${teamKey}::${latinNormalize(row.player)}`);
    if (alias) {
      const teamPlayers = playersByTeam.get(teamKey) ?? [];
      matches = teamPlayers.filter((player) => normalize(player.name).includes(alias));
    }
  }
  if (matches.length === 0) {
    for (const csvKey of [...csvKeys].sort((a, b) => b.length - a.length)) {
      if (csvKey.length < 4) continue;
      matches = byTeamAndName.get(`${teamKey}::${csvKey}`) ?? [];
      if (matches.length > 0) break;
    }
  }
  if (matches.length === 0 && csvName.length >= 4) {
    const teamPlayers = playersByTeam.get(teamKey) ?? [];
    const scoredMatches = teamPlayers.map((player) => {
      const keys = latinNameKeysFromUk(player.name);
      let best = Number.POSITIVE_INFINITY;
      for (const csvKey of csvKeys) {
        for (const key of keys) {
          if (key.length < 4 || csvKey.length < 4) continue;
          if (key.includes(csvKey) || csvKey.includes(key)) {
            best = Math.min(best, Math.abs(key.length - csvKey.length));
            continue;
          }
          const distance = levenshtein(key, csvKey);
          best = Math.min(best, distance);
        }
      }
      return { player, best };
    });
    const acceptable = scoredMatches
      .filter(({ best }) => Number.isFinite(best))
      .filter(({ best }) => best <= 2 || (best <= 3 && csvName.length >= 9))
      .sort((a, b) => a.best - b.best || a.player.name.length - b.player.name.length);
    const bestScore = acceptable[0]?.best;
    if (bestScore !== undefined) {
      matches = acceptable.filter(({ best }) => best === bestScore).map(({ player }) => player);
      if (matches.length > 3) matches = [];
    }
  }
  if (matches.length === 0) {
    unmatchedRows.push(row);
    continue;
  }

  for (const player of matches) {
    updates.push({
      rowNumber: row.rowNumber,
      id: player.id,
      team: player.nationalTeam.nameUk,
      player: player.name,
      original: player.nameOriginal,
      oldPrice: Number(player.price).toFixed(1),
      newPrice: row.price,
    });
  }
}

const changedUpdates = updates.filter((update) => update.oldPrice !== update.newPrice);

await prisma.$transaction(
  changedUpdates.map((update) =>
    prisma.player.update({
      where: { id: update.id },
      data: { price: update.newPrice },
    }),
  ),
);

fs.mkdirSync(path.dirname(exportPath), { recursive: true });
const sqlLines = [
  "-- Player price update generated from CSV",
  `-- Generated at: ${new Date().toISOString()}`,
  "BEGIN;",
  ...updates.map(
    (update) =>
      `UPDATE "Player" SET "price" = ${update.newPrice} WHERE "id" = ${sqlString(update.id)}; -- ${update.team}: ${update.player}`,
  ),
  "COMMIT;",
  "",
];
fs.writeFileSync(exportPath, sqlLines.join("\n"), "utf8");

const reportPath = exportPath.replace(/\.sql$/i, ".report.json");
fs.writeFileSync(
  reportPath,
  JSON.stringify(
    {
      csvRows: rows.length,
      validRows: validRows.length,
      invalidRows,
      matchedPlayerUpdates: updates.length,
      changedPlayerUpdates: changedUpdates.length,
      unmatchedRows,
      exportPath,
    },
    null,
    2,
  ),
  "utf8",
);

console.log(`CSV rows: ${rows.length}`);
console.log(`Valid rows: ${validRows.length}`);
console.log(`Matched player updates: ${updates.length}`);
console.log(`Changed player prices: ${changedUpdates.length}`);
console.log(`Unmatched rows: ${unmatchedRows.length}`);
console.log(`Invalid rows: ${invalidRows.length}`);
console.log(`SQL export: ${exportPath}`);
console.log(`Report: ${reportPath}`);

if (unmatchedRows.length > 0) {
  console.log("First unmatched rows:");
  for (const row of unmatchedRows.slice(0, 20)) {
    console.log(`  row ${row.rowNumber}: ${row.team}, ${row.player}, ${row.price}`);
  }
}

await prisma.$disconnect();
