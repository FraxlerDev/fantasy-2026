import { samplePlayers, sampleLeaderboard } from "./sample-data";

console.log(
  JSON.stringify(
    {
      players: samplePlayers,
      leaderboard: sampleLeaderboard,
    },
    null,
    2,
  ),
);
