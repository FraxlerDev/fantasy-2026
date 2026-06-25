export function maxPlayersPerNationForGameweek(gameweekNumber?: number | null) {
  if (gameweekNumber === 5) return 3;
  if (gameweekNumber === 6) return 4;
  if (gameweekNumber === 7) return 5;
  return 2;
}
