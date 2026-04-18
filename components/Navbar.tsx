"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/cpif", label: "Signal Fusion" },
  { href: "/ccm", label: "Creative Morphing" },
  { href: "/apg", label: "Guardian" },
  { href: "/ivm", label: "Intent Velocity" },
  { href: "/cpa", label: "Attribution" },
];

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <span className="text-white font-black tracking-tighter uppercase text-sm">PrivacyAds AI</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="relative group py-1">
              <span className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${
                pathname === link.href ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-200"
              }`}>
                {link.label}
              </span>
              {pathname === link.href && (
                <motion.div 
                  layoutId="active-nav-dot"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"/>
            System Live
          </div>
          <button className="bg-white text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter hover:bg-zinc-200 transition-colors">
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}


