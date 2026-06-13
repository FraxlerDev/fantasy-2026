"use client";

import { useState } from "react";

export function AdminPlayerPointInputs({
  playerId,
  initialPoints,
  initialDidPlay,
  initialRedCard,
  compact = false,
}: {
  playerId: string;
  initialPoints: number;
  initialDidPlay: boolean;
  initialRedCard: boolean;
  compact?: boolean;
}) {
  const [points, setPoints] = useState(String(initialDidPlay ? initialPoints : 0));
  const [didNotPlay, setDidNotPlay] = useState(!initialDidPlay);
  const [redCard, setRedCard] = useState(initialRedCard);

  return (
    <>
      <td>
        <input
          className="input points-input"
          name={`points:${playerId}`}
          type="number"
          step={1}
          value={didNotPlay ? "0" : points}
          disabled={didNotPlay}
          onChange={(event) => setPoints(event.target.value)}
        />
        {didNotPlay ? <input name={`points:${playerId}`} type="hidden" value="0" /> : null}
      </td>
      <td>
        <label className={`admin-point-check ${compact ? "compact" : ""}`} title="Не грав">
          <input
            name={`didNotPlay:${playerId}`}
            type="checkbox"
            checked={didNotPlay}
            onChange={(event) => {
              setDidNotPlay(event.target.checked);
              if (event.target.checked) {
                setPoints("0");
                setRedCard(false);
              }
            }}
          />
          {compact ? null : "Не грав"}
        </label>
      </td>
      <td>
        <label className={`admin-point-check ${compact ? "compact" : ""}`} title="Червона картка">
          <input
            name={`redCard:${playerId}`}
            type="checkbox"
            checked={redCard}
            onChange={(event) => {
              setRedCard(event.target.checked);
              if (event.target.checked) setDidNotPlay(false);
            }}
          />
          {compact ? null : "Червона картка"}
        </label>
      </td>
    </>
  );
}
