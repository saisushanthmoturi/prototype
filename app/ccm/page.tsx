"use client";
import { useState } from "react";
import { CREATIVE_CONTEXTS, CREATIVE_VARIANTS, type CreativeContext } from "@/lib/data";
import { Zap, Layout, Monitor, Share2, ArrowRightCircle, Cpu, Eye, Layers, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CCMPage() {
  const [context, setContext] = useState<CreativeContext>("marathon");
  const v = CREATIVE_VARIANTS[context];

  return (
    <div className="relative min-h-screen pb-32">
      <div className="aurora-container">
        <div className="aurora-blob bg-blue-600/10 w-[1000px] h-[1000px] -top-1/4 -left-1/4" />
        <div className="aurora-blob bg-purple-600/10 w-[800px] h-[800px] top-1/2 -right-1/4" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="label text-blue-500">Native Module 02</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="text-zinc-600 text-[9px] uppercase font-black tracking-[0.2em]">Morph Engine v1.9</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-none">Creative Morphing</h1>
          <p className="text-zinc-500 text-xl max-w-3xl leading-relaxed font-medium">
            Dynamic asset transformation based on page-level semantic signals. 
            The system adapts copy, color, and CTAs to the reader&apos;s environment without needing identity tokens.
          </p>
        </motion.div>

        {/* Morph State Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {[
             { l: "Semantic Precision", v: "High", i: Eye, c: "text-blue-500" },
             { l: "Morph Latency", v: "0.12ms", i: Zap, c: "text-amber-500" },
             { l: "Layer Depth", v: "16-bit", i: Layers, c: "text-purple-500" },
             { l: "Identity Req", v: "Zero", i: Cpu, c: "text-emerald-500" },
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
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 bg-zinc-950/20"
            >
              <h3 className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-10">Contextual Selector</h3>
              <div className="space-y-3">
                {(Object.entries(CREATIVE_CONTEXTS) as [CreativeContext, string][]).map(([key, label]) => {
                  const active = context === key;
                  return (
                    <button 
                      key={key} 
                      onClick={() => setContext(key)}
                      className={`w-full group relative flex items-center justify-between px-6 py-4.5 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all ${
                        active ? "bg-blue-600 text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]"
                               : "text-zinc-500 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Monitor size={16} className={active ? "text-white" : "text-zinc-700"} />
                        {label}
                      </div>
                      <AnimatePresence>
                        {active && (
                          <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-[10px] bg-white/10 px-2 py-1 rounded-lg"
                          >
                            <Zap size={12} className="fill-white" />
                            {v.matchScore}%
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-10 bg-white/[0.01]"
            >
              <h3 className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-10">Neural Diagnostics</h3>
              <div className="space-y-8">
                {[
                  { l: "Semantic Sentiment", v: v.sentiment },
                  { l: "Synthesized Intent", v: v.intent },
                  { l: "High-Entropy Match", v: `${v.matchScore}%` },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-[11px] text-zinc-500 font-black uppercase tracking-widest">{s.l}</span>
                      <span className="text-sm font-black text-white">{s.v}</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-950 border border-white/5 overflow-hidden p-0.5">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: s.l === "High-Entropy Match" ? s.v : "85%" }}
                         className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                       />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <ImageIcon size={20} className="text-emerald-500" />
                </div>
                <p className="text-[11px] text-emerald-500/80 font-black uppercase tracking-[0.2em] leading-relaxed">
                  Encryption Layer: Active<br/>Identity tokens: Zero
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 space-y-8"
          >
            <div className="glass-card p-12 md:p-16 relative overflow-hidden bg-white/[0.01]">
              <div className="flex items-center justify-between mb-16 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center shadow-xl">
                    <Share2 size={24} className="text-zinc-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-2xl uppercase tracking-tight">Vulkan Rendering Core</h3>
                    <p className="text-zinc-600 text-[11px] uppercase font-black tracking-[0.3em] mt-1">Real-time Morphic Buffer</p>
                  </div>
                </div>
                <motion.span 
                  key={v.badge}
                  initial={{ opacity: 0, y: -20, scale: 1.1 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] border shadow-2xl"
                  style={{ color: v.accentColor, borderColor: `${v.accentColor}40`, backgroundColor: `${v.accentColor}08` }}
                >
                  {v.badge}
                </motion.span>
              </div>

              <motion.div 
                key={context}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[3rem] p-12 md:p-20 border relative z-10 overflow-hidden min-h-[450px] flex flex-col justify-center shadow-2xl"
                style={{ borderColor: `${v.accentColor}20`, background: `linear-gradient(145deg, ${v.accentColor}08, transparent)` }}
              >
                <div className="mb-10 flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                   </div>
                   <p className="text-sm text-zinc-600 uppercase font-black tracking-[0.3em] transition-all">NIKE NODE · PEGASUS ELITE v6</p>
                </div>
                <h3 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1] tracking-tighter">
                   {v.headline}
                </h3>
                <p className="text-zinc-500 text-xl md:text-2xl font-medium mb-16 max-w-3xl leading-relaxed">
                   {v.subline}
                </p>
                <div className="flex items-center gap-6">
                  <motion.button 
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-fit px-12 py-5 rounded-3xl text-xs font-black text-white uppercase tracking-widest shadow-2xl transition-all flex items-center gap-4 relative overflow-hidden"
                    style={{ backgroundColor: v.accentColor, boxShadow: `0 30px 60px -15px ${v.accentColor}50` }}
                  >
                    <span className="relative z-10">{v.cta}</span>
                    <ArrowRightCircle size={20} className="relative z-10" />
                  </motion.button>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-700 font-black uppercase tracking-widest">Variant Code</span>
                    <span className="text-xs text-zinc-500 font-mono">0x{Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-3 gap-8 mt-12">
                {[
                  { l: "CTR Drift", v: "+27.4%", c: "text-emerald-500" },
                  { l: "Semantic Fit", v: `${v.matchScore}%`, c: "text-blue-500" },
                  { l: "PII Requirement", v: "NONE", c: "text-zinc-700" },
                ].map((m) => (
                  <div key={m.l} className="glass-card bg-zinc-950/40 p-8 text-center border-white/5">
                    <div className={`metric text-4xl mb-2 font-black ${m.c}`}>{m.v}</div>
                    <div className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.2em]">{m.l}</div>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600/[0.02] rounded-full blur-[100px]" />
            </div>

            <div className="glass-card p-12 bg-white/[0.01]">
              <h4 className="text-white font-black text-xl uppercase tracking-tight mb-10">Morphic Policy Audit</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-base font-medium leading-relaxed">
                 <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                       <p className="text-zinc-600 font-black uppercase text-xs tracking-widest">Legacy DCO Architecture</p>
                    </div>
                    <div className="flex gap-4">
                       <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0 text-[11px] font-black border border-red-500/20">✕</span>
                       <p className="text-zinc-500 leading-relaxed italic">&quot;Conventional systems rely on aggressive cookie-syncing and invasive browsing history to derive relevance, breaking privacy by design.&quot;</p>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                       <p className="text-blue-500 font-black uppercase text-xs tracking-widest">Contextual Morphing (CCM)</p>
                    </div>
                    <div className="flex gap-4">
                       <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0 text-[11px] font-black border border-emerald-500/20">✓</span>
                       <p className="text-zinc-400 font-bold leading-relaxed italic">&quot;PrivacyAI utilizes real-time NLP to determining intent from the reader&apos;s active context alone. Instant, deterministic, and 100% private.&quot;</p>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
