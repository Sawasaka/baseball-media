"use client";

import { motion } from "framer-motion";

interface Props {
  currentLeague: string;
  onSelect: (league: string) => void;
}

const leagues = [
  { id: "all", label: "ALL" },
  { id: "boys", label: "BOYS" },
  { id: "senior", label: "SENIOR" },
  { id: "young", label: "YOUNG" },
];

export const LeagueFilter = ({ currentLeague, onSelect }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {leagues.map((league) => (
        <button
          key={league.id}
          onClick={() => onSelect(league.id)}
          className={`relative px-6 py-2 rounded-full font-mono text-sm transition-all duration-300 border ${
            currentLeague === league.id
              ? "border-cyber-magenta text-cyber-magenta shadow-[0_0_15px_rgba(255,0,255,0.5)] bg-cyber-magenta/10"
              : "border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300"
          }`}
        >
          {league.label}
        </button>
      ))}
    </div>
  );
};

