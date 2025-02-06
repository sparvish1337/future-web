// src/app/page.tsx
'use client';

import { useState } from 'react';
import {
  Card,
  Button,
  CardFooter,
  Tooltip,
  Divider
} from "@heroui/react";

import { siteConfig } from "../config/site";
import { title, subtitle } from "../components/primitives";
import { GithubIcon } from "../components/icons";
import React from 'react';
import UpcomingMatches from '../components/upcomingMatches';
import MatchHistory from '../components/matchHistory';



export default function Home() {
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        {/* Title and Subtitle */}
        <h1 className={title({ color: "violet" })}>&nbsp;Future&nbsp;</h1>
        <h1 className={title()}>League&nbsp;</h1>
        <br />
        <div className={subtitle({ class: "mt-4" })}>
          Future's League
        </div>
      </div>

      {/* Documentation and GitHub Links */}

      {/* Past Matches Section */}
      <MatchHistory />

      {/* Upcoming Matches Section */}
      <UpcomingMatches />


    </section>
  );
}
