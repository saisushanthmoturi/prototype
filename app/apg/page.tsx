"use client";
import { useState, useEffect } from "react";
import { generateAttack, type AttackEvent } from "@/lib/data";
import { Shield, Pause, Play, AlertTriangle, ShieldAlert, Activity as ActivityIcon, Lock, Search, EyeOff, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STYLES = {
  blocked:  { label: "BLOCKED",  cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  partial:  { label: "PARTIAL",  cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  mitigated:{ label: "MITIGATED",cls: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
};

export default function APGPage() {
  const [attacks, setAttacks] = useState<AttackEvent[]>([]);
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(94);
  const [total, setTotal] = useState(2847);

  useEffect(() => {
    if (!running) return;
    const iv = setInterval(() => {
      const a = generateAttack();
      setAttacks((p) => [a, ...p].slice(0, 40));
      setTotal((p) => p + 1);
      if (a.result === "partial") {
        setScore((p) => Math.max(88, p - 1));
        setTimeout(() => setScore((p) => Math.min(98, p + 1)), 3000);
      }
    }, 700);
    return () => clearInterval(iv);
  }, [running]);

  const blockedCount = attacks.filter((a) => a.result === "blocked").length;
  const partialCount = attacks.filter((a) => a.result === "partial").length;
  const mitigatedCount = attacks.filter((a) => a.result === "mitigated").length;
  const circ = 2 * Math.PI * 42;

  return (
    <div className="relative min-h-screen pb-32">
      <div className="aurora-container">
        <div className="aurora-blob bg-blue-600/10 w-[1000px] h-[1000px] -top-1/4 -right-1/4" />
        <div className="aurora-blob bg-emerald-600/10 w-[800px] h-[800px] bottom-0 -left-1/4" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="label text-emerald-500">Native Module 03</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="text-zinc-600 text-[9px] uppercase font-black tracking-[0.2em]">Guard v4.1 Active</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-none">Privacy Guardian</h1>
          <p className="text-zinc-500 text-xl max-w-3xl leading-relaxed font-medium">
            Autonomous adversarial simulations that continuously stresstest the privacy layer.
            Identification and mitigation of membership inference and fingerprinting vectors.
          </p>
        </motion.div>

        {/* Threat Level Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {[
             { l: "Global Threat Level", v: "Minimal", i: AlertTriangle, c: "text-emerald-500" },
             { l: "LDP Perimeter", v: "Hardened", i: Lock, c: "text-blue-500" },
             { l: "Differential ε", v: "0.82", i: EyeOff, c: "text-purple-500" },
             { l: "Scan Frequency", v: "700ms", i: Zap, c: "text-amber-500" },
           ].map((stat, i) => (
             <motion.div 
               key={stat.l}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="glass-card p-6 border-white/5 flex items-center justify-between bg-white/[0.01]"
             >
                <div>
                   <div className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">{stat.l}</div>
                   <div className="metric text-2xl text-white">{stat.v}</div>
                </div>
                <div className={`p-2 rounded-xl bg-zinc-950 border border-white/5 ${stat.c}`}>
                   <stat.i size={16} />
                </div>
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-12 text-center relative overflow-hidden bg-white/[0.02]"
            >
              <h3 className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-12">Shield Integrity</h3>
              <div className="relative inline-flex items-center justify-center">
                <svg width="180" height="180" viewBox="0 0 100 100" className="-rotate-90 scale-125">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="6" />
                  <motion.circle 
                    cx="50" cy="50" r="42" fill="none"
                    stroke={score >= 90 ? "#10b981" : "#f59e0b"} strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={circ} strokeDashoffset={circ * (1 - score / 100)}
                    initial={{ strokeDashoffset: circ }}
                    animate={{ strokeDashoffset: circ * (1 - score / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="metric text-6xl text-white leading-none tracking-tighter">{score}</span>
                  <span className="text-[10px] text-zinc-700 font-black uppercase mt-4 tracking-[0.2em]">Status: Hardened</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Shield size={120} />
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="glass-card p-8"
            >
              <h3 className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-8">Countermeasure Stats</h3>
              <div className="space-y-6">
                {[
                  { l: "Simulated Sessions", v: total.toLocaleString(), c: "text-white" },
                  { l: "Vector Blocks", v: blockedCount, c: "text-emerald-500" },
                  { l: "Partial Mitigations", v: partialCount, c: "text-amber-500" },
                  { l: "Noise Overlays", v: mitigatedCount, c: "text-blue-500" },
                ].map((s) => (
                  <div key={s.l} className="flex justify-between items-end pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <span className="text-[11px] text-zinc-500 font-black uppercase tracking-widest">{s.l}</span>
                    <span className={`metric text-3xl ${s.c}`}>{s.v}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="glass-card p-8 bg-zinc-950/50"
            >
              <h3 className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-6">Attack Surface Map</h3>
              <div className="grid grid-cols-2 gap-3">
                {["Inversion", "Linkage", "Temporal", "Gradient", "Fingerprinting", "Timing"].map((t) => (
                  <div key={t} className="text-[10px] text-zinc-600 py-3 px-4 rounded-xl bg-white/[0.02] border border-white/5 font-black uppercase tracking-widest text-center group hover:border-blue-500/30 hover:text-white transition-all">
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 glass-card flex flex-col overflow-hidden bg-white/[0.01]"
          >
            <div className="p-10 border-b border-white/5 flex items-center justify-between bg-zinc-950/20 backdrop-blur-3xl">
              <div className="flex items-center gap-6">
                <div>
                   <h3 className="text-white font-black text-2xl uppercase tracking-tight">Mitigation Feed</h3>
                   <p className="text-zinc-600 text-[10px] uppercase font-black tracking-[0.3em] mt-1">Stochastic Search v9.2</p>
                </div>
                <div className={`flex items-center gap-3 px-4 py-2 rounded-xl text-[10px] font-black tracking-[0.2em] ${running ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "bg-zinc-900 text-zinc-600 border border-zinc-800"}`}>
                  <span className={`w-2 h-2 rounded-full ${running ? "bg-emerald-500 animate-pulse" : "bg-zinc-700"}`} />
                  {running ? "CORE ACTIVE" : "ENGINE PAUSED"}
                </div>
              </div>
              <button 
                onClick={() => setRunning((r) => !r)}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-black text-white uppercase tracking-widest transition-all shadow-2xl active:scale-95"
              >
                {running ? <><Pause size={16} /> Pause Core</> : <><Play size={16} /> Resume Core</>}
              </button>
            </div>

            <div className="flex-1 p-10 space-y-6 max-h-[850px] overflow-y-auto custom-scrollbar">
              <AnimatePresence initial={false}>
                {attacks.map((a) => {
                  const s = STYLES[a.result];
                  return (
                    <motion.div 
                      key={a.id} 
                      initial={{ opacity: 0, y: -20, x: 20 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group/item relative overflow-hidden"
                    >
                      <div className="flex items-start justify-between gap-10 relative z-10">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-4 mb-3 flex-wrap">
                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black border tracking-widest ${s.cls}`}>{s.label}</span>
                            <span className="text-lg font-black text-white uppercase tracking-tight">{a.type}</span>
                          </div>
                          <p className="text-base text-zinc-500 leading-relaxed font-medium mb-5 italic">
                            &quot;{a.description}&quot;
                          </p>
                          {a.mitigation && (
                            <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-blue-500/5 border border-blue-500/10 inline-flex group-hover/item:border-blue-500/30 transition-colors">
                              <ShieldAlert size={14} className="text-blue-500" />
                              <span className="text-xs text-blue-400 font-black uppercase tracking-[0.2em]">Protocol: {a.mitigation}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                           <span className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.3em]">{a.timestamp}</span>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover/item:opacity-5 transition-all group-hover/item:scale-110">
                         <ActivityIcon size={80} />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {attacks.length === 0 && (
                <div className="flex flex-col items-center justify-center py-40 text-zinc-800">
                  <ActivityIcon size={64} className="mb-6 opacity-30 animate-pulse" />
                  <p className="text-lg font-black uppercase tracking-[0.3em]">Calibrating Guard...</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
