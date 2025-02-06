import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


// types.ts

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
  score?: string; // Add this property for the score of the match
}

