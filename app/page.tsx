"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { PrefectureTabs } from "@/components/PrefectureTabs";
import { LeagueFilter } from "@/components/LeagueFilter";
import { TeamCard } from "@/components/TeamCard";
import { SubServiceTabs } from "@/components/SubServiceTabs";
import { dummyTeams } from "@/lib/dummy-data";

// Import 3D scene dynamically to avoid SSR issues and reduce initial load
const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

export default function Home() {
  const [prefecture, setPrefecture] = useState("osaka");
  const [league, setLeague] = useState("boys");

  const filteredTeams = dummyTeams.filter(
    (team) =>
      team.prefecture === prefecture &&
      (league === "all" || team.league === league)
  );

  return (
    <>
      {/* <Scene3D /> */}
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            FIND YOUR <br/>
            <span className="text-cyber-cyan">NEXT STAGE</span>
          </h1>
          <p className="text-gray-400 text-lg font-mono tracking-widest">
            中学硬式野球チーム検索・比較プラットフォーム
          </p>
        </div>

        {/* Controls */}
        <PrefectureTabs currentPrefecture={prefecture} onSelect={setPrefecture} />
        <LeagueFilter currentLeague={league} onSelect={setLeague} />

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>

        {/* Empty State */}
        {filteredTeams.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-mono border border-gray-800 rounded-xl bg-cyber-bg-sub/50">
            NO DATA FOUND IN SECTOR {prefecture.toUpperCase()}
          </div>
        )}

        {/* Sub Services Section */}
        <div className="mt-20 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 font-mono text-cyber-cyan">
            OUR SERVICES
          </h2>
          <SubServiceTabs />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-cyber-bg-sub py-12 mt-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm font-mono">
            © 2024 ROOKIE SMART. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </>
  );
}

