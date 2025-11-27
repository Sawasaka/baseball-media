import Link from 'next/link';
import { RiBaseballFill } from "react-icons/ri";

export const Navbar = () => {
  return (
    <nav className="w-full border-b border-cyber-cyan/30 bg-cyber-bg-sub/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <RiBaseballFill className="text-3xl text-cyber-cyan group-hover:text-cyber-magenta transition-colors duration-300" />
          <span className="font-mono text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta">
            ROOKIE SMART
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-8 font-mono text-sm">
          <Link href="/search" className="hover:text-cyber-cyan transition-colors">TEAM SEARCH</Link>
          <Link href="/column" className="hover:text-cyber-cyan transition-colors">COLUMN</Link>
          <Link href="/about" className="hover:text-cyber-cyan transition-colors">ABOUT</Link>
        </div>
      </div>
    </nav>
  );
};

