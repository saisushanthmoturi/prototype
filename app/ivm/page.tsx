"use client";
import { IVM_COHORTS, IVM_DAYS, getVelocityStatus } from "@/lib/data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, AreaChart, Area } from "recharts";
import { motion } from "framer-motion";
import { Activity, Zap, TrendingUp, Filter, ShieldCheck, Cpu, ArrowUpRight, BarChart3 } from "lucide-react";

const chartData = IVM_DAYS.map((day, i) => {
  const entry: Record<string, string | number> = { day };
  IVM_COHORTS.forEach((c) => { entry[c.id] = c.data[i]; });
  return entry;
});

export default function IVMPage() {
  return (
    <div className="relative min-h-screen pb-32">
      {/* Aurora Background */}
      <div className="aurora-container">
        <div className="aurora-blob bg-blue-600/15 w-[1000px] h-[1000px] -top-[10%] -right-[10%]" />
        <div className="aurora-blob bg-purple-600/10 w-[800px] h-[800px] bottom-[10%] -left-[10%]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="label text-blue-500">Native Module 04</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="text-zinc-600 text-[9px] uppercase font-black tracking-[0.2em]">Inference Engine v2.4</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight leading-none">Intent Velocity Map</h1>
          <p className="text-zinc-500 text-xl max-w-3xl leading-relaxed font-medium">
            Predictive cohort trajectories mapped in high-dimension contextual space. 
            Automated budget scaling based on mathematical intent acceleration—zero PII required.
          </p>
        </motion.div>

        {/* Global Performance Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
           {[
             { l: "Active Clusters", v: "1,248", i: Cpu, c: "text-blue-500" },
             { l: "Avg Velocity", v: "0.68", i: Activity, c: "text-emerald-500" },
             { l: "Predictive Lift", v: "+22.4%", i: ArrowUpRight, c: "text-purple-500" },
             { l: "Inference Nodes", v: "84", i: ShieldCheck, c: "text-amber-500" },
           ].map((stat, i) => (
             <motion.div 
               key={stat.l}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="glass-card p-6 flex flex-col gap-4 border-white/5"
             >
                <div className="flex items-center justify-between">
                   <div className={`p-2 rounded-lg bg-white/5 border border-white/5 ${stat.c}`}>
                      <stat.i size={16} />
                   </div>
                   <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Live Node</span>
                </div>
                <div>
                   <div className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-1">{stat.l}</div>
                   <div className="metric text-3xl text-white">{stat.v}</div>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Alert Card - Widened */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card border-blue-600/30 bg-blue-600/5 mb-16 p-8 flex flex-col md:flex-row md:items-center gap-8 relative overflow-hidden group hover:bg-blue-600/10 transition-colors"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center flex-shrink-0 shadow-2xl shadow-blue-500/20 border border-blue-500/20">
            <Zap size={24} className="text-blue-500 animate-pulse" />
          </div>
          <div className="flex-1">
            <p className="text-blue-400 text-xs font-black uppercase tracking-[0.3em] mb-2 font-mono">CRITICAL TRIGGER — COHORT #7423 &quot;ACTIVE TECH&quot;</p>
            <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-4xl">
              Velocity threshold (0.85) exceeded. Switching to conversion-stage creatives. Budget ceiling +40% applied automatically by autonomous bidding engine.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 pr-4">
             <span className="text-[10px] text-blue-500 font-extrabold uppercase tracking-widest">Node Alpha-9</span>
             <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-3 rounded-full bg-blue-600" />)}
             </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp size={160} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Chart Card — 1600px spread */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 glass-card p-12 bg-white/[0.01]"
          >
            <div className="flex items-center justify-between mb-16">
              <div>
                <h3 className="text-white font-black text-xl uppercase tracking-tight mb-1">Signal Progression</h3>
                <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-black">7-Day Contextual Correlation Window</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-950 border border-white/5 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                   <ShieldCheck size={14} className="text-emerald-500" /> LDP Layer
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/10 border border-blue-600/20 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] shimmer">
                   <Activity size={14} /> Inference Live
                </div>
              </div>
            </div>

            <div className="h-[450px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#18181b" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#3f3f46", fontSize: 11, fontWeight: 900 }} dy={10} />
                  <YAxis domain={[0, 1]} axisLine={false} tickLine={false} tick={{ fill: "#3f3f46", fontSize: 11, fontWeight: 900 }} tickFormatter={(v: number) => v.toFixed(1)} />
                  <Tooltip 
                    contentStyle={{ background: "#000", border: "1px solid #27272a", borderRadius: 16, fontSize: 11, color: "#fff", fontWeight: 900 }}
                    itemStyle={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase" }}
                    cursor={{ stroke: '#27272a', strokeWidth: 2 }}
                  />
                  <ReferenceLine y={0.85} stroke="#ef4444" strokeDasharray="8 4" strokeWidth={2}
                    label={{ value: "AUTO-BID TRIGGER", fill: "#ef4444", fontSize: 10, fontWeight: 900, position: "top", dy: -5 }} />
                  {IVM_COHORTS.map((c) => (
                    <Line key={c.id} type="monotone" dataKey={c.id} stroke={c.color} strokeWidth={5}
                      dot={false} activeDot={{ r: 8, strokeWidth: 0 }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-wrap gap-x-12 gap-y-6 mt-16 pt-12 border-t border-white/5">
              {IVM_COHORTS.map((c) => (
                <span key={c.id} className="flex items-center gap-3 text-[11px] text-zinc-500 font-black uppercase tracking-widest group cursor-default">
                  <span className="w-3 h-3 rounded-full group-hover:scale-125 transition-transform" style={{ background: c.color }} />
                  {c.id} <span className="text-zinc-800 font-black">•</span> <span className="text-zinc-400">{c.name}</span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Sidebar Cohorts — Spread wider padding */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8 bg-zinc-950/50 border-white/5 relative overflow-hidden">
               <div className="relative z-10">
                  <h4 className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Sentiment Entropy</h4>
                  <div className="metric text-4xl text-white">0.9221</div>
                  <p className="text-[10px] text-zinc-700 font-bold uppercase mt-2 tracking-widest italic">High contextual stability detected</p>
               </div>
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <BarChart3 size={80} />
               </div>
            </div>

            {IVM_COHORTS.slice(0, 3).map((c, i) => {
              const vel = getVelocityStatus(c.data);
              const cur = c.data[c.data.length - 1];
              const triggered = cur >= 0.85;
              return (
                <motion.div 
                  key={c.id} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`glass-card p-8 group transition-all duration-500 ${triggered ? "border-blue-600/40 bg-blue-600/5 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.15)]" : "hover:bg-white/[0.02] hover:border-white/10"}`}
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex flex-col">
                      <span className="text-base font-black text-white uppercase tracking-tighter mb-1">{c.id}</span>
                      <span className="text-[11px] text-zinc-600 font-black uppercase tracking-widest">{c.name}</span>
                    </div>
                    <div className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-inner" style={{
                      color: vel.color, backgroundColor: `${vel.color}15`, border: `1px solid ${vel.color}30`
                    }}>{vel.label}</div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-[11px] text-zinc-700 font-extrabold uppercase tracking-[0.2em]">Target Affinity</span>
                      <span className="metric text-4xl text-white">{(cur * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-zinc-950 border border-white/5 overflow-hidden p-0.5">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cur * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full shadow-[0_0_20px_-2px_rgba(255,255,255,0.1)]" 
                        style={{ background: c.color }} 
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${triggered ? "bg-blue-500 animate-pulse" : "bg-zinc-800"}`} />
                       <p className={`text-[11px] font-black uppercase tracking-widest ${triggered ? "text-blue-500" : "text-zinc-600"}`}>
                         {triggered ? "AUTO-BID: MAX EXECUTION" : cur >= 0.6 ? "POLICY: SCALE PROXIMITY" : "POLICY: BASELINE OBS"}
                       </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
