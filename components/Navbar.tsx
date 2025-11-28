"use client";

import Link from 'next/link';
import { IoBaseball, IoMenu, IoClose, IoFlash, IoSparkles } from "react-icons/io5";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top neon line */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_rgba(255,42,68,0.8)]" />
      
      {/* Main navbar */}
      <div className="bg-black/95 backdrop-blur-xl border-b-2 border-red-500/30">
        <div className="container mx-auto px-4 h-18 flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
              <IoBaseball className="text-4xl text-red-500 group-hover:scale-125 transition-all duration-300 group-hover:rotate-180" style={{ filter: 'drop-shadow(0 0 20px rgba(255,42,68,0.8))' }} />
              <div className="absolute inset-0 bg-red-500/30 rounded-full blur-xl group-hover:bg-pink-500/50 transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xl font-black text-white tracking-wider">
                ROOKIE<span className="text-red-500 animate-pulse">_</span>SMART
              </span>
              <span className="text-[10px] text-cyan-400 tracking-[0.3em] font-mono">
                BASEBALL_MEDIA
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link 
              href="/search" 
              className="relative px-5 py-3 text-sm text-white/70 hover:text-white font-mono group overflow-hidden"
            >
              <span className="relative z-10">SEARCH</span>
              <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/15 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              href="/column" 
              className="relative px-5 py-3 text-sm text-white/70 hover:text-white font-mono group overflow-hidden"
            >
              <span className="relative z-10">COLUMN</span>
              <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/15 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              href="/about" 
              className="relative px-5 py-3 text-sm text-white/70 hover:text-white font-mono group overflow-hidden"
            >
              <span className="relative z-10">ABOUT</span>
              <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/15 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 group-hover:w-full transition-all duration-300" />
            </Link>
            
            {/* CTA */}
            <Link 
              href="/contact" 
              className="ml-4 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-bold font-mono transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,42,68,0.6)] flex items-center gap-2 relative overflow-hidden group"
            >
              <IoFlash className="text-sm group-hover:animate-bounce" />
              CONTACT
              <IoSparkles className="text-xs animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 text-red-500 hover:text-cyan-400 transition-colors relative"
          >
            <div className="absolute inset-0 bg-red-500/10 rounded-lg" />
            {isOpen ? <IoClose size={32} /> : <IoMenu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/98 backdrop-blur-xl border-b-2 border-red-500/30"
          >
            <div className="container mx-auto px-4 py-8 space-y-3">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0 }}>
                <Link href="/search" onClick={() => setIsOpen(false)} className="block py-4 px-6 text-white/80 hover:text-red-500 font-mono border-l-2 border-red-500/30 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300">
                  <span className="text-red-500 mr-3">&gt;</span>SEARCH
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }}>
                <Link href="/column" onClick={() => setIsOpen(false)} className="block py-4 px-6 text-white/80 hover:text-cyan-400 font-mono border-l-2 border-cyan-400/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300">
                  <span className="text-cyan-400 mr-3">&gt;</span>COLUMN
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.16 }}>
                <Link href="/about" onClick={() => setIsOpen(false)} className="block py-4 px-6 text-white/80 hover:text-yellow-400 font-mono border-l-2 border-yellow-400/30 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300">
                  <span className="text-yellow-400 mr-3">&gt;</span>ABOUT
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.24 }}>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-4 px-6 text-white/80 hover:text-pink-500 font-mono border-l-2 border-pink-500/30 hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300">
                  <span className="text-pink-500 mr-3">&gt;</span>CONTACT
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
