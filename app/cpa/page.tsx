"use client";
import { useState, useMemo } from "react";
import { CPA_CHANNELS, computeCausalAttribution } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Target, Layers, PieChart as PieIcon, Info, ArrowUpRight, Cpu, Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function CPAPage() {
  const [holdout, setHoldout] = useState(20);
  const { confidence, savedSpend } = useMemo(() => computeCausalAttribution(holdout), [holdout]);

  const chartData = CPA_CHANNELS.map((ch) => ({
    name: ch.name, "Legacy (Last-Click)": ch.lastClick, "Causal (PrivacyAI)": ch.causal,
  }));

  return (
    <div className="relative min-h-screen pb-32">
      <div className="aurora-container">
        <div className="aurora-blob bg-blue-600/10 w-[1000px] h-[1000px] -top-1/4 -right-1/4" />
        <div className="aurora-blob bg-amber-600/10 w-[800px] h-[800px] bottom-0 -left-1/4" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="label text-amber-500">Native Module 05</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="text-zinc-600 text-[9px] uppercase font-black tracking-[0.2em]">Causal Engine v3.2</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-none">Causal Attribution</h1>
          <p className="text-zinc-500 text-xl max-w-3xl leading-relaxed font-medium">
            Next-generation attribution using cohort holdout experiments and Shapley values.
            Calculate true incremental lift without reconstructing individual user journeys.
          </p>
        </motion.div>

        {/* Engine Status Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {[
             { l: "Attribution Power", v: "High", i: Target, c: "text-amber-500" },
             { l: "Spend Recovered", v: `${savedSpend}%`, i: ArrowUpRight, c: "text-emerald-500" },
             { l: "Engine Confidence", v: `${confidence}%`, i: Shield, c: "text-blue-500" },
             { l: "Privacy Method", v: "Shapley", i: Cpu, c: "text-purple-500" },
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
                <div className={`p-2 rounded-xl bg-zinc-950 border border-white/5 ${stat.c}`}>
                   <stat.i size={16} />
                </div>
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Chart — Widen it significantly */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-8 glass-card p-12 bg-white/[0.01]"
          >
            <div className="flex items-center justify-between mb-16">
              <div>
                 <h3 className="text-white font-black text-2xl uppercase tracking-tight mb-1">Attribution Delta</h3>
                 <p className="text-zinc-600 text-[10px] uppercase font-black tracking-[0.4em]">Statistical Last-Click vs. Causal Lift</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center shadow-xl">
                 <Globe size={20} className="text-zinc-500" />
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#3f3f46", fontSize: 11, fontWeight: 900 }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis tick={{ fill: "#3f3f46", fontSize: 11, fontWeight: 900 }} tickFormatter={(v: number) => `${v}%`} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                    contentStyle={{ background: "#000", border: "1px solid #27272a", borderRadius: 16, fontSize: 11, color: "#fff", fontWeight: 900 }}
                    itemStyle={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase" }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, fontWeight: 900, color: "#71717a", textTransform: "uppercase", paddingTop: 30 }} />
                  <Bar dataKey="Legacy (Last-Click)" fill="#18181b" radius={[6, 6, 0, 0]} barSize={32} />
                  <Bar dataKey="Causal (PrivacyAI)" radius={[6, 6, 0, 0]} barSize={32}>
                    {CPA_CHANNELS.map((ch, i) => <Cell key={i} fill={ch.color} fillOpacity={0.9} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="border-t border-white/5 pt-12 mt-16 space-y-6">
              {CPA_CHANNELS.map((ch) => (
                <div key={ch.name} className="flex items-center gap-8 group">
                  <span className="w-1.5 h-12 rounded-full flex-shrink-0 transition-all group-hover:h-14 duration-500" style={{ background: ch.color }} />
                  <div className="flex-1 min-w-0">
                    <span className="text-lg font-black text-white uppercase tracking-tight">{ch.name}</span>
                    <p className="text-[11px] text-zinc-600 font-bold uppercase tracking-widest mt-1 italic">{ch.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0 flex items-center gap-10">
                    <div className="flex flex-col">
                       <span className="text-[10px] text-zinc-800 font-black tracking-widest mb-1 uppercase">LAST-CLICK</span>
                       <span className="text-xl font-black text-zinc-700">{ch.lastClick}%</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black tracking-widest mb-1 uppercase" style={{ color: ch.color }}>CAUSAL LIFT</span>
                       <span className="metric text-3xl" style={{ color: ch.color }}>{ch.causal}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — holdout + insights */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 bg-zinc-950/20 shadow-2xl"
            >
              <h3 className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-10">Holdout Simulator</h3>
              <p className="text-sm text-zinc-500 font-medium mb-12 leading-relaxed italic">
                Tune the percentage of traffic assigned to the control group. Higher holdouts increase causal confidence but reduce immediate scale.
              </p>
              
              <div className="space-y-12">
                 <div>
                    <div className="flex items-center justify-between mb-6">
                       <span className="text-[11px] text-zinc-500 font-black uppercase tracking-[0.3em]">Holdout Control Group</span>
                       <span className="metric text-4xl text-white">{holdout}%</span>
                    </div>
                    <input type="range" min={5} max={40} value={holdout}
                      onChange={(e) => setHoldout(+e.target.value)} 
                      className="w-full h-2 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-amber-500 shadow-inner"
                    />
                 </div>

                 <div className="grid grid-cols-1 gap-4">
                   {[
                     { l: "Bayesian Engine Confidence", v: `${confidence}%`, c: "text-amber-500", icon: Info },
                     { l: "Inefficient Spend Recovered", v: `${savedSpend}%`, c: "text-emerald-500", icon: ArrowUpRight },
                     { l: "Protocol Architecture", v: "Causal Shapley", c: "text-white", icon: Layers },
                     { l: "Security Layer", v: "ε-DP Cluster", c: "text-blue-500", icon: PieIcon },
                   ].map((m) => (
                     <div key={m.l} className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 group hover:bg-white/[0.03] transition-all hover:border-white/10">
                       <div className="flex items-center justify-between mb-4">
                          <div className={`p-2.5 rounded-xl bg-zinc-950 border border-white/5 shadow-inner ${m.c}`}>
                            <m.icon size={18} />
                          </div>
                          <div className={`text-2xl font-black ${m.c}`}>{m.v}</div>
                       </div>
                       <div className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.2em]">{m.l}</div>
                     </div>
                   ))}
                 </div>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="glass-card p-10 bg-white/[0.01]"
            >
              <h4 className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-8">Synthesis Flow</h4>
              <div className="flex items-center gap-4 flex-wrap">
                {["Display (34%)", "→", "Contextual (41%)", "→", "Search (25%)", "→", "Conversion"].map((s, i) => (
                  s === "→" ? <span key={i} className="text-zinc-800 font-black text-xl">→</span>
                  : <span key={i} className="px-5 py-3 rounded-2xl bg-zinc-950 border border-white/10 text-[11px] text-white font-black uppercase tracking-widest shadow-xl">{s}</span>
                ))}
              </div>
              <p className="text-[10px] text-zinc-800 font-black uppercase tracking-widest mt-8 flex items-center gap-2">
                <Info size={12} /> Derived via global shapley values from multi-variant holdout experiments.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
