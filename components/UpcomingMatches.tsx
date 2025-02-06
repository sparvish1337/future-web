// src/components/UpcomingMatches.tsx
'use client';

import React from 'react';
import { Card, Tooltip } from "@heroui/react";
import { title, subtitle } from "../components/primitives";

interface Match {
  id: number;
  teamA: string;
  teamB: string;
  date: string;
}

const upcomingMatches: Match[] = [
  // Example data for upcoming matches
  {
    id: 1,
    teamA: "Team E",
    teamB: "Team F",
    date: "2023-10-05"
  },
  {
    id: 2,
    teamA: "Team G",
    teamB: "Team H",
    date: "2023-10-06"
  },
];

export default function UpcomingMatches() {
  return (
    <Card className="w-[600px] mt-8 py-4 text-white">
      <div className="text-xl font-bold p-4 text-center">Upcoming Matches</div>
      <ul className="p-4">
        {upcomingMatches.map((match) => (
          <Tooltip key={match.id} content={<p className="text-sm">Date: {new Date(match.date).toLocaleDateString()}</p>}>
            <Card className='p-1 mt-2 cursor-pointer hover:bg-gray-700'>
              <li 
                className="flex items-center justify-between py-2 px-4 rounded-lg"
              >
                <div>
                  <p className="text-sm">{match.teamA}</p>
                </div>
                <p>vs</p>
                <div>
                  <p className="text-sm">{match.teamB}</p>
                </div>
              </li>
            </Card>
          </Tooltip>
        ))}
      </ul>
    </Card>
  );
}
