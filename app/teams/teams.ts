// pages/api/app/teams/teams.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const teams = [
    {
        "id": 2,
        "name": "Team B",
        "elo": 1450,
        "ebits": 90000,
        "players": [
          { "name": "Player 3", "position": "Midfielder" },
          { "name": "Player 4", "position": "Striker" }
        ]
      }
  ];
  res.status(200).json(teams);
}
