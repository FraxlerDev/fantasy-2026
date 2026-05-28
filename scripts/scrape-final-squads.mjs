import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SOURCE_URL = "https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_squads";
const API_URL =
  "https://en.wikipedia.org/w/api.php?action=parse&page=2026_FIFA_World_Cup_squads&prop=text&format=json&origin=*";

const positionMap = {
  GK: "GK",
  DF: "DEF",
  MF: "MID",
  FW: "FWD",
};

const translitPairs = [
  ["shch", "щ"],
  ["sch", "щ"],
  ["ch", "ч"],
  ["sh", "ш"],
  ["zh", "ж"],
  ["kh", "х"],
  ["ts", "ц"],
  ["yu", "ю"],
  ["ya", "я"],
  ["ye", "є"],
  ["yi", "ї"],
  ["jo", "йо"],
  ["yo", "йо"],
  ["ph", "ф"],
  ["th", "т"],
  ["ck", "к"],
  ["qu", "кв"],
  ["w", "в"],
  ["x", "кс"],
  ["a", "а"],
  ["b", "б"],
  ["c", "к"],
  ["d", "д"],
  ["e", "е"],
  ["f", "ф"],
  ["g", "г"],
  ["h", "г"],
  ["i", "і"],
  ["j", "дж"],
  ["k", "к"],
  ["l", "л"],
  ["m", "м"],
  ["n", "н"],
  ["o", "о"],
  ["p", "п"],
  ["q", "к"],
  ["r", "р"],
  ["s", "с"],
  ["t", "т"],
  ["u", "у"],
  ["v", "в"],
  ["y", "й"],
  ["z", "з"],
];

const manualNames = {
  "Alisson": "Аліссон",
  "Neymar": "Неймар",
  "Vinícius Júnior": "Вінісіус Жуніор",
  "Rodrygo": "Родріго",
  "Thibaut Courtois": "Тібо Куртуа",
  "Kevin De Bruyne": "Кевін Де Брюйне",
  "Romelu Lukaku": "Ромелу Лукаку",
  "Manuel Neuer": "Мануель Ноєр",
  "Joshua Kimmich": "Йозуа Кімміх",
  "Jamal Musiala": "Джамал Мусіала",
  "Florian Wirtz": "Флоріан Вірц",
  "Unai Simón": "Унаї Сімон",
  "Rodri": "Родрі",
  "Pedri": "Педрі",
  "Lamine Yamal": "Ламін Ямаль",
  "Kylian Mbappé": "Кіліан Мбаппе",
  "Antoine Griezmann": "Антуан Грізманн",
  "Aurélien Tchouaméni": "Орельєн Чуамені",
  "William Saliba": "Вільям Саліба",
  "Martin Ødegaard": "Мартін Едегор",
  "Erling Haaland": "Ерлінг Голанд",
  "David Ospina": "Давід Оспіна",
  "Luis Díaz": "Луїс Діас",
  "James Rodríguez": "Хамес Родрігес",
};

function decodeEntities(value) {
  return value
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&ndash;/g, "-")
    .replace(/&rsquo;/g, "’");
}

function stripTags(value) {
  return decodeEntities(value)
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<sup[\s\S]*?<\/sup>/gi, "")
    .replace(/<span class="mw-editsection"[\s\S]*?<\/span>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeKey(value) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[’']/g, "")
    .toLowerCase()
    .trim();
}

function transliterateWord(word) {
  let lower = word.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  let result = "";

  while (lower.length > 0) {
    const pair = translitPairs.find(([latin]) => lower.startsWith(latin));
    if (pair) {
      result += pair[1];
      lower = lower.slice(pair[0].length);
    } else {
      result += lower[0];
      lower = lower.slice(1);
    }
  }

  return result ? result[0].toUpperCase() + result.slice(1) : result;
}

function transliterateName(name) {
  const cleaned = name.replace(/\s*\(\s*captain\s*\)\s*/gi, "").trim();
  if (manualNames[cleaned]) return manualNames[cleaned];

  return cleaned
    .split(/(\s+|-|’|')/)
    .map((part) => {
      if (/^\s+$|^-|^’|^'$/.test(part)) return part;
      return transliterateWord(part);
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCsv(content) {
  const [header, ...lines] = content.trim().split(/\r?\n/);
  const keys = header.split(",");
  return lines.map((line) => {
    const values = line.split(",");
    return Object.fromEntries(keys.map((key, index) => [key, values[index]]));
  });
}

function parseRows(tableHtml) {
  const rows = tableHtml.match(/<tr[\s\S]*?<\/tr>/gi) ?? [];

  return rows.flatMap((row) => {
    if (!/<td/i.test(row)) return [];
    const cells = [...row.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((match) => stripTags(match[1]));
    const positionIndex = cells.findIndex((cell) => /\b(GK|DF|MF|FW)\b/.test(cell));
    if (positionIndex === -1 || !cells[positionIndex + 1]) return [];

    const positionCode = cells[positionIndex].match(/\b(GK|DF|MF|FW)\b/)?.[1];
    const nameOriginal = cells[positionIndex + 1].replace(/\s*\(\s*captain\s*\)\s*/gi, "").trim();
    const club = cells.at(-1)?.trim();
    if (!positionCode || !nameOriginal || !club || club === "* * *") return [];

    return [
      {
        name: transliterateName(nameOriginal),
        nameOriginal,
        position: positionMap[positionCode],
        club,
      },
    ];
  });
}

const flags = parseCsv(await readFile(path.join("data", "flags_manifest.csv"), "utf8"));
const countryByEnglish = new Map(flags.map((row) => [normalizeKey(row.country_en), row]));
countryByEnglish.set("curacao", countryByEnglish.get("curacao"));

const response = await fetch(API_URL);
if (!response.ok) {
  throw new Error(`Wikipedia request failed: ${response.status}`);
}
const payload = await response.json();
const html = payload.parse.text["*"];
const sections = html.split(/<div class="mw-heading mw-heading3"><h3[^>]*>/g).slice(1);
const squads = [];

for (const sectionChunk of sections) {
  const [headingHtml, ...rest] = sectionChunk.split("</h3>");
  const countryEn = stripTags(headingHtml);
  const section = rest.join("</h3>").split(/<div class="mw-heading mw-heading3"><h3|<div class="mw-heading mw-heading2"><h2/)[0];
  const intro = stripTags(section.split("<table")[0] ?? "");
  const hasFinalSignal =
    /\b(final squad|final list)\b/i.test(intro) &&
    !/will be announced|will announce/i.test(intro) &&
    /(announced|named|released|submitted|confirmed)/i.test(intro);
  if (!hasFinalSignal) continue;

  const tableHtml = section.match(/<table[\s\S]*?<\/table>/i)?.[0];
  if (!tableHtml) continue;

  const manifestRow = countryByEnglish.get(normalizeKey(countryEn));
  if (!manifestRow) {
    console.warn(`No manifest country mapping for ${countryEn}`);
    continue;
  }

  const players = parseRows(tableHtml);
  if (players.length === 0) continue;

  squads.push({
    countryEn,
    countryUk: manifestRow.country_uk,
    code: manifestRow.code.toUpperCase(),
    status: "FINAL",
    source: SOURCE_URL,
    note: intro,
    players,
  });
}

const output = {
  source: SOURCE_URL,
  fetchedAt: new Date().toISOString(),
  status: "FINAL_ONLY",
  squads,
};

await writeFile(path.join("data", "final_squads_2026.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`Wrote ${squads.length} final squads and ${squads.reduce((sum, squad) => sum + squad.players.length, 0)} players.`);
for (const squad of squads) {
  console.log(`${squad.countryUk}: ${squad.players.length}`);
}
