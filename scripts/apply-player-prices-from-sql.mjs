import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const requireFromWeb = createRequire(path.join(repoRoot, "apps", "web", "package.json"));
const { PrismaClient } = requireFromWeb("@prisma/client");

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

const sourcePath = process.argv[2];
const exportPath =
  process.argv[3] ??
  path.join(repoRoot, "exports", `player-prices-adjusted-${new Date().toISOString().slice(0, 10)}.sql`);
const reportPath = exportPath.replace(/\.sql$/i, ".report.json");

if (!sourcePath) {
  console.error("Usage: node scripts/apply-player-prices-from-sql.mjs <player_table.sql> [export.sql]");
  process.exit(1);
}

function splitSqlList(value) {
  const items = [];
  let current = "";
  let inString = false;
  let inQuotedIdentifier = false;

  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];
    const next = value[i + 1];

    if (char === "'" && !inQuotedIdentifier) {
      current += char;
      if (inString && next === "'") {
        current += next;
        i += 1;
      } else {
        inString = !inString;
      }
      continue;
    }

    if (char === '"' && !inString) {
      inQuotedIdentifier = !inQuotedIdentifier;
      current += char;
      continue;
    }

    if (char === "," && !inString && !inQuotedIdentifier) {
      items.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  if (current.trim()) items.push(current.trim());
  return items;
}

function normalizeColumn(value) {
  return value.trim().replace(/^"|"$/g, "");
}

function parseSqlLiteral(value) {
  const trimmed = value.trim();
  if (/^NULL$/i.test(trimmed)) return null;
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}

function roundToHalf(value) {
  return Math.round(value * 2) / 2;
}

function adjustedPrice(price, position) {
  const discounts = {
    GK: 1.0,
    DEF: 1.0,
    MID: 1.5,
    FWD: 2.0,
  };
  const discount = discounts[position];
  if (discount === undefined) throw new Error(`Unknown position: ${position}`);
  return roundToHalf(Number(price) - discount);
}

function sqlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function parsePlayersFromDump(sql) {
  const rows = [];
  const pattern = /INSERT INTO public\."Player"\s*\(([^)]+)\)\s*VALUES\s*\(([\s\S]*?)\);/g;
  let match;

  while ((match = pattern.exec(sql))) {
    const columns = splitSqlList(match[1]).map(normalizeColumn);
    const values = splitSqlList(match[2]).map(parseSqlLiteral);
    const row = Object.fromEntries(columns.map((column, index) => [column, values[index]]));

    if (!row.id || row.price === null || !row.position) continue;
    rows.push({
      id: row.id,
      name: row.name,
      position: row.position,
      sourcePrice: Number(row.price),
      newPrice: adjustedPrice(row.price, row.position),
    });
  }

  return rows;
}

const sourceSql = fs.readFileSync(sourcePath, "utf8");
const sourcePlayers = parsePlayersFromDump(sourceSql);

if (sourcePlayers.length === 0) {
  throw new Error(`No Player rows parsed from ${sourcePath}`);
}

const prisma = new PrismaClient();

try {
  const dbPlayers = await prisma.player.findMany({
    select: {
      id: true,
      name: true,
      position: true,
      price: true,
      nationalTeam: { select: { nameUk: true } },
    },
  });
  const dbById = new Map(dbPlayers.map((player) => [player.id, player]));
  const missing = sourcePlayers.filter((player) => !dbById.has(player.id));

  const exportUpdates = sourcePlayers.map((source) => {
    const dbPlayer = dbById.get(source.id);
    return {
      id: source.id,
      name: dbPlayer?.name ?? source.name,
      team: dbPlayer?.nationalTeam?.nameUk ?? "",
      position: dbPlayer?.position ?? source.position,
      oldPrice: dbPlayer ? Number(dbPlayer.price) : null,
      sourcePrice: source.sourcePrice,
      newPrice: source.newPrice,
      existsLocally: Boolean(dbPlayer),
    };
  });

  const localUpdates = exportUpdates.filter((update) => update.existsLocally);

  for (const update of localUpdates) {
    await prisma.player.update({
      where: { id: update.id },
      data: { price: update.newPrice.toFixed(1) },
    });
  }

  fs.mkdirSync(path.dirname(exportPath), { recursive: true });
  const sqlLines = [
    "-- Player price update generated from player_table.sql",
    `-- Generated at: ${new Date().toISOString()}`,
    "-- Formula: GK/DEF -1.0, MID -1.5, FWD -2.0, rounded to nearest 0.5",
    "BEGIN;",
    ...exportUpdates.map(
      (update) =>
        `UPDATE public."Player" SET price = ${update.newPrice.toFixed(1)} WHERE id = ${sqlString(update.id)}; -- ${update.team} / ${update.name} / ${update.position} / source ${update.sourcePrice.toFixed(1)}`,
    ),
    "COMMIT;",
    "",
  ];
  fs.writeFileSync(exportPath, sqlLines.join("\n"), "utf8");
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        sourcePath,
        exportPath,
        totalParsed: sourcePlayers.length,
        totalUpdatedLocally: localUpdates.length,
        totalInServerSql: exportUpdates.length,
        missingLocally: missing.map((player) => ({
          id: player.id,
          name: player.name,
          position: player.position,
          sourcePrice: player.sourcePrice,
          newPrice: player.newPrice,
        })),
        formula: { GK: -1.0, DEF: -1.0, MID: -1.5, FWD: -2.0 },
        updatedAt: new Date().toISOString(),
        sample: exportUpdates.slice(0, 20),
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`Parsed: ${sourcePlayers.length}`);
  console.log(`Updated local DB: ${localUpdates.length}`);
  console.log(`Included in server SQL: ${exportUpdates.length}`);
  if (missing.length > 0) {
    console.log(
      `Missing locally: ${missing.length} (${missing
        .slice(0, 5)
        .map((player) => `${player.name} / ${player.id}`)
        .join(", ")})`,
    );
  }
  console.log(`SQL export: ${exportPath}`);
  console.log(`Report: ${reportPath}`);
} finally {
  await prisma.$disconnect();
}
