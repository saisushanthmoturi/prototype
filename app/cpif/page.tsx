"use client";
import { useState, useMemo } from "react";
import { computePARS } from "@/lib/data";
import { Zap, Activity, Info, TrendingUp, Sparkles, Filter, Shield, Cpu, Target } from "lucide-react";
import { motion } from "framer-motion";

const SIGNALS = [
  { key: "contextual", label: "Contextual NLP", desc: "Page content, sentiment, IAB category" },
  { key: "onDevice", label: "On-Device Model", desc: "Federated learning — stays on device" },
  { key: "cleanRoom", label: "Clean Room", desc: "Encrypted past conversion patterns" },
  { key: "cohort", label: "Cohort Signal", desc: "Privacy cohort engagement average" },
] as const;

export default function CPIFPage() {
  const [values, setValues] = useState({ contextual: 92, onDevice: 78, cleanRoom: 65, cohort: 80 });
  const { pars, weights, cpm } = useMemo(() => computePARS(values), [values]);
  const activeSignals = Object.values(values).filter((v) => v > 0).length;
  const circumference = 2 * Math.PI * 42;

  return (
    <div className="relative min-h-screen pb-32">
      <div className="aurora-container">
        <div className="aurora-blob bg-blue-600/10 w-[1000px] h-[1000px] -top-1/4 -right-1/4" />
        <div className="aurora-blob bg-purple-600/10 w-[800px] h-[800px] bottom-0 -left-1/4" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="label text-blue-500">Native Module 01</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="text-zinc-600 text-[9px] uppercase font-black tracking-[0.2em]">Signal Core v6.0</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-none">Signal Fusion</h1>
          <p className="text-zinc-500 text-xl max-w-3xl leading-relaxed font-medium">
            Cross-pillar intelligence fusion (CPIF) combines contextual, on-device, and encrypted conversion signals 
            into a single adaptive relevance score—maintaining mathematical privacy across the entire stack.
          </p>
        </motion.div>

        {/* Global Hub Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {[
             { l: "Fusion Latency", v: "0.4ms", i: Zap, c: "text-blue-500" },
             { l: "Privacy Budget", v: "ε = 0.82", i: Shield, c: "text-emerald-500" },
             { l: "Encrypted IO", v: "High", i: Cpu, c: "text-purple-500" },
             { l: "Target Match", v: "Exact", i: Target, c: "text-amber-500" },
           ].map((stat, i) => (
             <motion.div 
               key={stat.l}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="glass-card p-6 border-white/5 flex items-center justify-between"
             >
                <div>
                   <div className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">{stat.l}</div>
                   <div className="metric text-2xl text-white">{stat.v}</div>
                </div>
                <div className={`p-2 rounded-xl bg-white/5 border border-white/5 ${stat.c}`}>
                   <stat.i size={16} />
                </div>
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sliders — left */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card p-12"
          >
            <div className="flex items-center justify-between mb-16">
              <div>
                <h3 className="text-white font-black text-xl uppercase tracking-tight mb-1">Intelligence Inputs</h3>
                <p className="text-zinc-600 text-[10px] uppercase font-black tracking-[0.3em]">Signal Amplitude Controllers</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center">
                 <Filter size={18} className="text-zinc-500" />
              </div>
            </div>
            
            <div className="space-y-16">
              {SIGNALS.map((sig) => {
                const val = values[sig.key];
                const w = weights[sig.key];
                return (
                  <div key={sig.key} className="group">
                    <div className="flex items-baseline justify-between mb-6">
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-white uppercase tracking-tight mb-1">{sig.label}</span>
                        <span className="text-[11px] text-zinc-600 font-black uppercase tracking-[0.2em]">{sig.desc}</span>
                      </div>
                      <span className="metric text-5xl text-white group-hover:text-blue-500 transition-colors leading-none">{val}</span>
                    </div>
                    <div className="relative h-2.5 rounded-full bg-zinc-950 border border-white/5 overflow-hidden p-0.5 mb-4 shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${val}%` }}
                        className="h-full rounded-full bg-blue-600 shadow-[0_0_25px_rgba(37,99,235,0.6)]"
                      />
                    </div>
                    <input type="range" min={0} max={100} value={val}
                      onChange={(e) => setValues((p) => ({ ...p, [sig.key]: +e.target.value }))} 
                      className="w-full h-2 bg-transparent appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex items-center justify-between mt-5">
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] text-zinc-700 font-black uppercase tracking-widest">Adaptive Weight Distribution:</span>
                         <span className="text-xs text-blue-500 font-black">{(w * 100).toFixed(0)}%</span>
                      </div>
                      {val === 0 && (
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[10px] text-amber-500 font-black uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20"
                        >
                          Deactivated — Routing via Neural Failover
                        </motion.span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-20 p-8 rounded-3xl bg-white/[0.01] border border-white/5 flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center flex-shrink-0">
                 <Info className="text-zinc-600" size={20} />
              </div>
              <p className="text-[12px] text-zinc-500 font-medium leading-relaxed max-w-2xl">
                <span className="text-zinc-300 font-black uppercase tracking-tighter mr-2">Core Logic:</span> The fusion hub automatically shifts weight towards high-entropy signals available in the reader&apos;s sandbox. Contextual NLP remains the immutable hardware baseline.
              </p>
            </div>
          </motion.div>

          {/* Score — right */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="glass-card p-12 text-center relative overflow-hidden"
            >
              <h3 className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-12">Calculated PARS Score</h3>
              <div className="relative inline-flex items-center justify-center">
                <svg width="200" height="200" viewBox="0 0 100 100" className="-rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="6" />
                  <motion.circle 
                    cx="50" cy="50" r="42" fill="none"
                    stroke={pars >= 80 ? "#10b981" : pars >= 60 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference * (1 - pars / 100) }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                   <div className="flex items-start">
                     <span className="metric text-7xl text-white leading-none">{pars}</span>
                     <span className="text-zinc-700 text-lg font-black mt-2 ml-1">%</span>
                   </div>
                   <span className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.3em] mt-3">Relevance Intensity</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-12">
                {[
                  { l: "Integrity", v: pars >= 80 ? "Perfect" : pars >= 60 ? "Stable" : "Critical", c: pars >= 80 ? "text-emerald-500" : "text-amber-500" },
                  { l: "Channels", v: `${activeSignals}/4`, c: "text-blue-500" },
                  { l: "Node Health", v: activeSignals < 4 ? "Degraded" : "Optimal", c: activeSignals < 4 ? "text-amber-500" : "text-emerald-500" },
                ].map((i) => (
                  <div key={i.l} className="bg-white/[0.02] border border-white/5 rounded-2xl py-4 px-2">
                    <div className={`text-xs font-black uppercase tracking-tight mb-1 ${i.c}`}>{i.v}</div>
                    <div className="text-[9px] text-zinc-700 font-black uppercase tracking-widest">{i.l}</div>
                  </div>
                ))}
              </div>
              <div className="absolute -top-10 -right-10 opacity-5">
                 <Sparkles size={160} />
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="glass-card p-10"
            >
              <h3 className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-8">Yield Forecasting</h3>
              <div className="space-y-8">
                 {[
                   { l: "Predicted Market CPM", v: `$${(cpm / 100).toFixed(2)}`, i: TrendingUp, c: "text-emerald-500" },
                   { l: "Calculated Yield Uplift", v: `+${Math.max(0, Math.round(((cpm - 250) / 250) * 100))}%`, i: Activity, c: "text-blue-500" },
                 ].map((r) => (
                   <div key={r.l} className="flex items-center justify-between group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-center shadow-inner">
                           <r.i size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-[12px] text-zinc-500 font-black uppercase tracking-[0.2em]">{r.l}</span>
                     </div>
                     <span className={`metric text-3xl ${r.c}`}>{r.v}</span>
                   </div>
                 ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-10 bg-blue-600/[0.02] border-blue-600/20"
            >
              <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                 <Cpu size={14} /> Tensor Distribution Map
              </h3>
              <div className="space-y-6">
                {SIGNALS.map((sig) => (
                  <div key={sig.key} className="flex items-center gap-6 group">
                    <span className="text-[11px] text-zinc-500 font-black uppercase tracking-tight w-28 flex-shrink-0 truncate">{sig.label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-zinc-950 overflow-hidden relative shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${weights[sig.key] * 100}%` }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="h-full bg-blue-500 group-hover:bg-blue-400"
                      />
                    </div>
                    <span className="text-xs font-black text-white w-10 text-right">{(weights[sig.key] * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
