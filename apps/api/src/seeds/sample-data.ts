import type { Player, PlayerMatchStats } from "@fantasy/shared";

export const samplePlayers: Player[] = [
  { id: "trubin", name: "Анатолій Трубін", position: "GK", nationCode: "UKR", nationName: "Україна", price: 5.0, status: "AVAILABLE" },
  { id: "zinchenko", name: "Олександр Зінченко", position: "DEF", nationCode: "UKR", nationName: "Україна", price: 6.0, status: "AVAILABLE" },
  { id: "mudryk", name: "Михайло Мудрик", position: "MID", nationCode: "UKR", nationName: "Україна", price: 7.5, status: "AVAILABLE" },
  { id: "dovbyk", name: "Артем Довбик", position: "FWD", nationCode: "UKR", nationName: "Україна", price: 8.5, status: "AVAILABLE" },
  { id: "mbappe", name: "Кіліан Мбаппе", position: "FWD", nationCode: "FRA", nationName: "Франція", price: 12.0, status: "AVAILABLE" },
  { id: "griezmann", name: "Антуан Грізманн", position: "MID", nationCode: "FRA", nationName: "Франція", price: 9.0, status: "AVAILABLE" },
  { id: "saliba", name: "Вільям Саліба", position: "DEF", nationCode: "FRA", nationName: "Франція", price: 6.5, status: "AVAILABLE" },
  { id: "maignan", name: "Майк Меньян", position: "GK", nationCode: "FRA", nationName: "Франція", price: 5.5, status: "AVAILABLE" },
];

export const sampleMatchStats: PlayerMatchStats[] = [
  {
    playerId: "mudryk",
    position: "MID",
    minutes: 82,
    goals: 1,
    assists: 1,
    teamGoalsConceded: 1,
    cleanSheet: false,
    saves: 0,
    penaltiesSaved: 0,
    penaltiesMissed: 0,
    yellowCards: 0,
    redCards: 0,
    ownGoals: 0,
    playerOfTheMatch: true,
  },
  {
    playerId: "trubin",
    position: "GK",
    minutes: 90,
    goals: 0,
    assists: 0,
    teamGoalsConceded: 1,
    cleanSheet: false,
    saves: 5,
    penaltiesSaved: 0,
    penaltiesMissed: 0,
    yellowCards: 0,
    redCards: 0,
    ownGoals: 0,
    playerOfTheMatch: false,
  },
];

export const sampleLeaderboard = [
  { rank: 1, fantasyTeamId: "team-1", teamName: "Лівий Фланг", manager: "Олег", totalPoints: 184, stagePoints: 42 },
  { rank: 2, fantasyTeamId: "team-2", teamName: "Карпатський Пресинг", manager: "Марія", totalPoints: 179, stagePoints: 38 },
  { rank: 3, fantasyTeamId: "team-3", teamName: "xG Козаки", manager: "Денис", totalPoints: 172, stagePoints: 36 },
];
