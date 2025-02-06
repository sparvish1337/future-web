// src/components/MatchHistory.tsx
'use client';

import React from 'react';
import { Card, Tooltip } from "@heroui/react";
import { title, subtitle } from "../components/primitives";

interface Match {
  id: number;
  teamA: string;
  teamB: string;
  date: string;
  goals: Array<{ time: string; player: string }>;
  scoreA: number;
  scoreB: number;
}

const pastMatches: Match[] = [
  // Example data for past matches
  {
    id: 1,
    teamA: "Team A",
    teamB: "Team B",
    date: "2025-10-01",
    goals: [
      { time: "45'", player: "Player 1" },
      { time: "60'", player: "Player 2" }
    ],
    scoreA: 3,
    scoreB: 2
  },
  {
    id: 2,
    teamA: "Team C",
    teamB: "Team D",
    date: "2025-10-02",
    goals: [
      { time: "55'", player: "Player 3" },
      { time: "80'", player: "Player 4" }
    ],
    scoreA: 1,
    scoreB: 0
  },
  {
    id: 3,
    teamA: "Team C",
    teamB: "Team D",
    date: "2025-10-02",
    goals: [
      { time: "55'", player: "Player 3" },
      { time: "80'", player: "Player 4" }
    ],
    scoreA: 1,
    scoreB: 0
  },
];

export default function MatchHistory() {
  return (
    <Card className="w-[600px] mt-8 overflow-x-auto px-4 py-4 text-white">
      <div className="text-xl font-bold p-4 text-center">Past Matches</div>
      <div className="flex gap-3">
        {pastMatches.map((match) => (
          <Tooltip key={match.id} content={
            <>
              <p className="text-sm">Date: {new Date(match.date).toLocaleDateString()}</p>
              <ul className="list-disc px-4">
                {match.goals.map((goal, index) => (
                  <li key={index}>
                    <p className="text-xs">{`${goal.time} - ${goal.player}`}</p>
                  </li>
                ))}
              </ul>
              <div className="flex mt-2 justify-between">
                <span>{match.scoreA} - {match.scoreB}</span>
              </div>
            </>
          }>
            <Card 
              className="w-[185px] p-3 rounded-lg cursor-pointer hover:bg-gray-700 flex flex-col items-center"
            >
              <div className="flex justify-between w-full">
                <p>{match.teamA}</p>
                <p>vs</p>
                <p>{match.teamB}</p>
              </div>
            </Card>
          </Tooltip>
        ))}
      </div>
    </Card>
  );
}
