"use client";

import { useState, useEffect } from "react";
import { subtitle, title } from "../../components/primitives";
import { Accordion, AccordionItem } from "@heroui/accordion"; // Import Accordion and AccordionItem
import { Card } from "@heroui/card"; // Import Card and Code components
import { Code } from "@heroui/code";
import React from "react";
import { Input } from "@heroui/input";

type Team = {
  id: number;
  name: string;
  elo: number;
  ebits: number;
};

type Player = {
  id: number;
  name: string;
  position: string;
  rating: number;
  team: string;
};

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    // Fetch team data
    fetch('http://localhost:3001/api/teams.json')
      .then(response => response.json())
      .then(data => {
        console.log("Teams Data:", data); // Check if teams are fetched correctly
        setTeams(data);
      })
      .catch(error => {
        setError("Failed to fetch teams data.");
      });

    // Fetch player data
    fetch('http://localhost:3001/api/players.json')
      .then(response => response.json())
      .then(data => {
        console.log("Players Data:", data); // Check if players are fetched correctly
        setPlayers(data);
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to fetch players data.");
      });
  }, []);

  const renderTeamPlayers = (teamName: string) => {
    return players
      .filter(player => player.team === teamName)
      .map((player, index) => (
        <div key={index} className="flex items-center gap-2">
          <strong>{player.name}</strong>
          <span>({player.position})</span>
        </div>
      ));
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center mb-8">
        <span className={title({ color: "blue" })}>Teams&nbsp;</span>
        <br />
        <span className={title()}>Search the team database</span>
      </div>

      <div className="flex flex-col items-center justify-center max-w-screen-lg">
        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 w-full md:w-[700px]"
        />

        <Accordion variant="splitted" className="w-full">
          {filteredTeams.map(team => (
            <AccordionItem
              subtitle={`Elo: ${team.elo}`}
              key={team.id}
              className="w-[700px]"
              title={`${team.name}`}
            >
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Team Details */}
                <Card shadow="md" className="h-auto min-h-[150px] p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Team Details</h3>
                    <ul className="flex flex-col gap-y-2 p-4 text-left">
                      <li><strong>Elo:</strong> {team.elo}</li>
                      <li><strong>Ebits:</strong> {team.ebits.toLocaleString()}</li>
                    </ul>
                  </div>
                </Card>

                {/* Players */}
                <Card shadow="md" className="h-auto min-h-[150px] p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Players</h3>
                    {renderTeamPlayers(team.name)}
                  </div>
                </Card>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
