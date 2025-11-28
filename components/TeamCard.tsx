"use client";

import { motion } from "framer-motion";
import { IoLocationSharp, IoGlobeOutline } from "react-icons/io5";

interface Team {
  id: string;
  name: string;
  prefecture: string;
  league: string;
  description: string;
  url?: string;
}

export const TeamCard = ({ team }: { team: Team }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, translateY: -5 }}
      className="group relative bg-cyber-bg-sub border border-gray-800 overflow-hidden rounded-xl"
    >
      {/* Cyber overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg-sub via-transparent to-transparent opacity-80 z-10" />
      <div className="absolute inset-0 border border-transparent group-hover:border-cyber-cyan/50 transition-colors duration-300 rounded-xl z-20 pointer-events-none shadow-[0_0_15px_rgba(0,240,255,0)_inset] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.2)_inset]" />

      {/* Image Placeholder */}
      <div className="h-48 w-full bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-4xl font-bold text-gray-700 group-hover:text-cyber-cyan/30 transition-colors">
            {team.league.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-mono text-cyber-magenta border border-cyber-magenta px-2 py-0.5 rounded">
            {team.league.toUpperCase()}
          </span>
          <div className="flex items-center text-gray-400 text-xs">
            <IoLocationSharp className="mr-1" />
            {team.prefecture === 'osaka' ? '大阪' : '兵庫'}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-3 group-hover:text-cyber-cyan transition-colors">
          {team.name}
        </h3>
        
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
          {team.description}
        </p>

        {team.url && (
          <a
            href={team.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-cyber-cyan hover:text-white transition-colors"
          >
            <IoGlobeOutline className="mr-2" />
            OFFICIAL SITE
          </a>
        )}
      </div>
    </motion.div>
  );
};

