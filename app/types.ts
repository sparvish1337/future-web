// types.ts

export interface Goal {
    time: string;
    player: string;
  }
  
  export interface Match {
    id: number;
    teamA: string;
    teamB: string;
    date?: string; // Optional for past matches, required for upcoming matches
    goals?: Goal[]; // Optional for past matches, required for match statistics
    attendance?: number; // Optional for past matches, required for match statistics
  }
  
  // types.ts (or any other file where you define your types)
// app/types.ts (or any other file where you define your types)
export interface Player {
  name: string;
  position: string;
}

export interface Team {
  id: number; // or any other unique identifier
  name: string;
  elo: number;
  ebits: number;
  players: Player[];
}
