"use client";
import Link from "next/link";
import { FEATURE_CARDS } from "@/lib/data";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Lock, BarChart3, Fingerprint, EyeOff, ArrowRight, Activity, Globe, Cpu } from "lucide-react";

export default function HomePage() {
  const [attackCount, setAttackCount] = useState(2847);
  const [proofCount, setProofCount] = useState(1247382);

  useEffect(() => {
    const interval = setInterval(() => {
      setAttackCount((p) => p + Math.floor(Math.random() * 3));
      setProofCount((p) => p + Math.floor(Math.random() * 12));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Attacks Survived", value: attackCount.toLocaleString(), color: "text-red-400", icon: Shield },
    { label: "ZK Proofs Verified", value: proofCount.toLocaleString(), color: "text-blue-400", icon: Lock },
    { label: "Privacy Score", value: "94/100", color: "text-emerald-400", icon: Fingerprint },
    { label: "Avg CPM", value: "$4.10", color: "text-amber-400", icon: BarChart3 },
  ];

  return (
    <div className="relative min-h-screen pb-32 overflow-x-hidden">
      {/* Aurora Background */}
      <div className="aurora-container">
        <div className="aurora-blob bg-blue-600/20 w-[1000px] h-[1000px] -top-[10%] -left-[10%]" />
        <div className="aurora-blob bg-purple-600/10 w-[800px] h-[800px] top-[40%] -right-[10%]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Hero Section - Split wide for more coverage */}
        <div className="pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 font-bold text-[9px] mb-8 uppercase tracking-[0.3em]">
              <Zap size={10} className="text-blue-500" />
              Adaptive Intelligence Layer v6.0
            </div>
            <h1 className="text-6xl md:text-8xl xl:text-[7rem] font-black text-white leading-[0.85] tracking-tighter mb-10">
              Targeting<br />
              <span className="text-zinc-800">Without<br />Compromise.</span>
            </h1>
            <p className="text-zinc-500 max-w-xl text-lg md:text-xl leading-relaxed mb-12 font-medium">
              Next-gen advertising infrastructure powered by contextual entropy and zero-knowledge proofs. 
              Automated performance with ironclad privacy.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <button className="px-12 py-5 bg-blue-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-blue-500 transition-all shadow-2xl shadow-blue-500/20 active:scale-95">
                Launch Platform
              </button>
              <button className="px-12 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-white/10 transition-colors backdrop-blur-md active:scale-95">
                Documentation
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="glass-card p-12 relative overflow-hidden bg-blue-600/[0.02] border-blue-500/10">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Globe size={200} />
              </div>
              <h3 className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
                <Cpu size={14} /> Network Sentinel Active
              </h3>
              <div className="space-y-8">
                {[
                  { l: "Global Latency", v: "12ms", c: "text-emerald-500" },
                  { l: "Encrypted Throughput", v: "4.2 TB/s", c: "text-blue-500" },
                  { l: "Active Node Pairs", v: "14,802", c: "text-white" },
                ].map((m) => (
                  <div key={m.l} className="flex justify-between items-end border-b border-white/5 pb-6">
                    <span className="text-zinc-600 text-xs font-black uppercase tracking-widest">{m.l}</span>
                    <span className={`metric text-3xl ${m.c}`}>{m.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Live Stats - Wide Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
          {stats.map((s, i) => (
            <motion.div 
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="glass-card p-10 group bg-white/[0.01] hover:bg-white/[0.02] transition-all border-white/5 hover:border-white/10"
            >
              <div className="flex items-center justify-between mb-8">
                <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${s.color} group-hover:scale-110 transition-transform`}>
                   <s.icon size={20} />
                </div>
                <span className="text-[9px] font-black text-zinc-800 tracking-[0.3em] uppercase">Real-time</span>
              </div>
              <div className={`metric text-5xl mb-3 tracking-tighter ${s.color}`}>{s.value}</div>
              <div className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Grid Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-500 text-[9px] font-black uppercase tracking-widest mb-4">
               CORE INFRASTRUCTURE
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-2 uppercase tracking-tight">Ecosystem Modules</h2>
            <p className="text-zinc-600 text-base font-medium max-w-xl leading-relaxed">High-fidelity inference engines running at the edge. Federated learning meets contextual intent.</p>
          </div>
          <Link href="/architecture" className="group flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:text-blue-500 transition-colors">
            View Technical Schema <ArrowRight size={16} className="text-blue-500 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Feature Cards Grid - Ultra spread */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
          {FEATURE_CARDS.map((f, i) => (
            <Link key={f.id} href={f.href} className="group">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="glass-card p-10 h-full flex flex-col group-hover:bg-white/[0.03] group-hover:border-blue-500/30 transition-all shadow-xl hover:shadow-blue-500/5"
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="px-4 py-1.5 rounded-xl bg-white/5 text-zinc-500 text-[9px] font-black uppercase tracking-widest border border-white/5 group-hover:bg-blue-600/10 group-hover:text-blue-500 group-hover:border-blue-500/30 transition-all">
                    {f.tag}
                  </span>
                  <Activity size={18} className="text-zinc-800 group-hover:text-blue-500 transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{f.name}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-12 flex-1 font-medium italic">
                  &quot;{f.description}&quot;
                </p>
                <div className="pt-8 border-t border-white/5 flex items-end justify-between relative overflow-hidden">
                  <div className="flex flex-col">
                    <span className="text-blue-500 text-[9px] font-black uppercase tracking-widest mb-1">{f.metricLabel}</span>
                    <span className="metric text-5xl text-white">{f.metric}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500 group-hover:text-white transition-all text-zinc-700">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
          {/* Filler for better layout on lg screens if 5 cards */}
          <div className="hidden lg:flex glass-card p-10 bg-gradient-to-br from-blue-600/5 to-transparent border-dashed border-zinc-900 flex-col items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
             <div className="w-16 h-16 rounded-full bg-zinc-950 border border-white/5 flex items-center justify-center mb-6">
                <Lock size={24} className="text-zinc-800" />
             </div>
             <p className="text-[10px] text-zinc-700 font-black uppercase tracking-widest">More Modules Coming Soon</p>
          </div>
        </div>

        {/* Process Section - Expansion */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 md:p-32 relative overflow-hidden bg-white/[0.01]"
        >
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-24 text-center tracking-tighter uppercase leading-none">The<br />Security Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              {[
                { n: "PRV-01", t: "Noise Injection", d: "Applying local differential privacy at the source session level to ensure mathematical anonymity.", icon: EyeOff, color: "text-blue-500" },
                { n: "VRF-02", t: "Circuit Verification", d: "Proving impression validity via ZK-SNARKs without decrypting individual user telemetry.", icon: Lock, color: "text-emerald-500" },
                { n: "AGG-03", t: "Cohort Mapping", d: "Next-gen aggregation engines that cluster intent signals into high-entropy privacy cohorts.", icon: BarChart3, color: "text-purple-500" },
              ].map((s, i) => (
                <div key={s.n} className="text-center md:text-left group/step">
                  <div className="w-20 h-20 rounded-3xl bg-zinc-950 border border-white/5 flex items-center justify-center mb-10 mx-auto md:mx-0 group-hover/step:bg-white group-hover/step:border-white transition-all duration-700 shadow-2xl relative">
                    <s.icon size={28} className={`${s.color} group-hover/step:text-black transition-colors`} />
                    <div className="absolute -top-2 -right-2 px-2 py-1 rounded bg-zinc-900 border border-white/10 text-[8px] font-black text-white">READY</div>
                  </div>
                  <div className="text-zinc-700 text-[10px] font-black mb-4 uppercase tracking-[0.3em] font-mono">{s.n}</div>
                  <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">{s.t}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-semibold italic">
                    &quot;{s.d}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/[0.03] rounded-full blur-[150px] -mr-96 -mt-96" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/[0.03] rounded-full blur-[150px] -ml-64 -mb-64" />
        </motion.div>
      </div>
    </div>
  );
}
