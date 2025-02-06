"use client";

import { useState, useEffect } from "react";
import { subtitle, title } from "../../components/primitives";
import { Accordion, AccordionItem } from "@heroui/accordion"; // Import Accordion and AccordionItem
import { Card } from "@heroui/card"; // Import Card and Code components
import { Code } from "@heroui/code";
import React from "react";
import { Input } from "@heroui/input";

interface Player {
  id: number;
  name: string;
  position: string;
  rating: number;
  team: string; // Add team property
  averageScorePosition: number;
  estimatedWorthEbits: number;
  negativeTraits: { [key: string]: string };
  positiveTraits: { [key: string]: string };
  allTimeStats: {
    appearances?: number;
    goals?: number;
    assists?: number;
    gkSaves?: number;
  };
}

export default function PlayersList() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [playersData, setPlayersData] = useState<Player[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/players.json')
      .then(response => response.json())
      .then(data => {
        setPlayersData(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch players data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Players</h1>
        <p>Loading players...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Players</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const filteredPlayers = playersData.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTraits = (traits: { [key: string]: string }, colorClass: string) => {
    return (
      <ul className={`flex flex-col gap-y-2 p-4 ${colorClass}`}>
        {Object.entries(traits).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong>{" "}
            <Code className={`ml-2 ${colorClass}`}>{value}</Code>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center mb-8">
        <span className={title({ color: "blue" })}>Players&nbsp;</span>
        <br />
        <span className={title()}>Search the player database</span>
      </div>

      <div className="flex flex-col items-center justify-center max-w-screen-lg">
      {/* Search Input */}
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name..."
        className="mb-4 w-full md:w-[700px]" // Adjusted width for better consistency with TeamsPage
      />

      {/* Container to center the accordion */}
      <div className="flex flex-col items-center justify-center max-w-screen-lg">
        <Accordion variant="splitted" className="w-full">
          {filteredPlayers.map((player) => (
            <AccordionItem
              subtitle={`Rating: ${player.rating}`}
              className="w-[700px]"
              key={player.id}
              title={`${player.name} - Team: ${player.team}`} // Include team in the title
            >
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Player Details */}
                <Card shadow="md" className="h-auto min-h-[150px] p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Player Details</h3>
                    <ul className="flex flex-col gap-y-2 p-4 text-left">
                      <li><strong>Position:</strong> <Code color="primary">{player.position}</Code></li>
                      <li><strong>Average Score Position:</strong> <Code color="primary">{player.averageScorePosition}</Code></li>
                      <li><strong>Team:</strong> <Code color="primary">{player.team}</Code></li> {/* Display team */}
                      <li>
                        <strong>Estimated Worth:</strong>{" "}
                        <Code color="success">{player.estimatedWorthEbits.toLocaleString()}</Code>
                      </li>
                    </ul>
                  </div>
                </Card>

                {/* All-Time Stats */}
                <Card shadow="md" className="h-auto min-h-[150px] p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">All-Time Stats</h3>
                    <ul className="flex flex-col gap-y-2 p-4 text-left">
                      {player.allTimeStats.appearances !== undefined && (
                        <>
                          <li><strong>Appearances:</strong> {player.allTimeStats.appearances}</li>
                        </>
                      )}
                      {player.allTimeStats.goals !== undefined && (
                        <>
                          <li><strong>Goals:</strong> {player.allTimeStats.goals}</li>
                        </>
                      )}
                      {player.allTimeStats.assists !== undefined && (
                        <>
                          <li><strong>Assists:</strong> {player.allTimeStats.assists}</li>
                        </>
                      )}
                      {player.allTimeStats.gkSaves !== undefined && (
                        <>
                          <li><strong>GK Saves:</strong> {player.allTimeStats.gkSaves}</li>
                        </>
                      )}
                    </ul>
                  </div>
                </Card>

                {/* Negative Traits */}
                <Card shadow="md" className="h-auto min-h-[150px] p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Negative Traits</h3>
                    {renderTraits(player.negativeTraits, "text-white")}
                  </div>
                </Card>

                {/* Positive Traits */}
                <Card shadow="md" className="h-auto min-h-[150px] p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Positive Traits</h3>
                    {renderTraits(player.positiveTraits, "text-white")}
                  </div>
                </Card>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
        </div>
      </div>
    </section>
  );
}
