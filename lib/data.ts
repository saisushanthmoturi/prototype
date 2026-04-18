// Mock data and simulation utilities for PrivacyAds AI MVP

// ─── CPIF ──────────────────────────────────────────────────────────────────
export function computePARS(signals: {
  contextual: number;
  onDevice: number;
  cleanRoom: number;
  cohort: number;
}): { pars: number; weights: Record<string, number>; cpm: number } {
  const { contextual, onDevice, cleanRoom, cohort } = signals;
  const available = [
    contextual > 0,
    onDevice > 0,
    cleanRoom > 0,
    cohort > 0,
  ];

  let w = { contextual: 0.4, onDevice: 0.25, cleanRoom: 0.2, cohort: 0.15 };
  if (!available[1] && !available[2]) {
    w = { contextual: 0.7, onDevice: 0, cleanRoom: 0, cohort: 0.3 };
  } else if (!available[1]) {
    w = { contextual: 0.55, onDevice: 0, cleanRoom: 0.25, cohort: 0.2 };
  } else if (!available[2]) {
    w = { contextual: 0.5, onDevice: 0.3, cleanRoom: 0, cohort: 0.2 };
  } else if (!available[3]) {
    w = { contextual: 0.5, onDevice: 0.3, cleanRoom: 0.2, cohort: 0 };
  }

  const pars = Math.round(
    contextual * w.contextual +
    onDevice * w.onDevice +
    cleanRoom * w.cleanRoom +
    cohort * w.cohort
  );

  const cpm = Math.round(120 + (pars / 100) * 380);
  return { pars, weights: w, cpm };
}

// ─── CCM ───────────────────────────────────────────────────────────────────
export type CreativeContext =
  | "marathon"
  | "recovery"
  | "tech"
  | "finance"
  | "travel"
  | "gaming";

export interface CreativeVariant {
  headline: string;
  subline: string;
  cta: string;
  badge: string;
  accentColor: string;
  sentiment: string;
  intent: string;
  matchScore: number;
}

export const CREATIVE_CONTEXTS: Record<string, string> = {
  marathon: "Marathon Training Blog",
  recovery: "Injury Recovery Article",
  tech: "Tech Review Site",
  finance: "Finance News Portal",
  travel: "Travel & Adventure Blog",
  gaming: "Gaming Community Site",
};

export const CREATIVE_VARIANTS: Record<CreativeContext, CreativeVariant> = {
  marathon: {
    headline: "Conquer Your Next Marathon",
    subline: "Carbon-plate engineering meets all-day comfort. Race day ready.",
    cta: "Shop Now",
    badge: "Race Edition",
    accentColor: "#ea580c",
    sentiment: "Aspirational, high energy",
    intent: "Performance purchase",
    matchScore: 97,
  },
  recovery: {
    headline: "Built for Your Comeback",
    subline: "Cushioned support for every step of your recovery journey.",
    cta: "Learn More",
    badge: "Comfort Series",
    accentColor: "#0891b2",
    sentiment: "Empathetic, calming",
    intent: "Consideration stage",
    matchScore: 88,
  },
  tech: {
    headline: "React Foam. 12% More Energy Return.",
    subline: "Engineered for optimal ground contact. Measurable performance.",
    cta: "See Specs",
    badge: "Pro Tech",
    accentColor: "#7c3aed",
    sentiment: "Analytical, data-driven",
    intent: "Research mode",
    matchScore: 84,
  },
  finance: {
    headline: "The Smartest Investment in Your Health",
    subline: "Premium performance. Cost per mile: $0.05. Built to last 800km.",
    cta: "Calculate ROI",
    badge: "Value Edition",
    accentColor: "#059669",
    sentiment: "Pragmatic, value-seeking",
    intent: "Justification stage",
    matchScore: 71,
  },
  travel: {
    headline: "From Trails to Tarmac. Go Anywhere.",
    subline: "Grip, resilience, and all-terrain versatility. Adventure awaits.",
    cta: "Explore Range",
    badge: "Trail Series",
    accentColor: "#d97706",
    sentiment: "Exploratory, adventurous",
    intent: "Discovery mode",
    matchScore: 79,
  },
  gaming: {
    headline: "Level Up Your Reflexes. On Every Surface.",
    subline: "Speed. Grip. Precision. The gear behind every champion.",
    cta: "Unlock Drop",
    badge: "Limited Drop",
    accentColor: "#db2777",
    sentiment: "Competitive, high-engagement",
    intent: "Trend-seeking",
    matchScore: 68,
  },
};

// ─── APG ───────────────────────────────────────────────────────────────────
export interface AttackEvent {
  id: number;
  type: string;
  description: string;
  result: "blocked" | "partial" | "mitigated";
  mitigation?: string;
  timestamp: string;
  duration: number;
}

const ATTACK_POOL: Omit<AttackEvent, "id" | "timestamp" | "duration">[] = [
  { type: "Model Inversion", description: "Attempting to reconstruct browsing history from federated gradients", result: "blocked" },
  { type: "Linkage Attack", description: "Correlating cohort IDs with public profile data", result: "partial", mitigation: "Cohort min-size increased: 5,000 → 8,000" },
  { type: "Temporal Correlation", description: "Tracking cohort membership changes across sessions", result: "blocked" },
  { type: "Clean Room Leakage", description: "Reverse-engineering aggregate reports with small cohorts", result: "partial", mitigation: "Minimum match threshold raised: 30 → 50" },
  { type: "Gradient Leakage", description: "Extracting raw feature values from model update vectors", result: "blocked" },
  { type: "Membership Inference", description: "Inferring if a specific device is in a high-value cohort", result: "mitigated", mitigation: "Epsilon budget reduced for this query class by 0.3" },
  { type: "Fingerprinting", description: "Canvas/WebGL fingerprint attempt detected in ad slot", result: "blocked" },
  { type: "Side-Channel Timing", description: "Inferring cohort via ad auction bid timing patterns", result: "mitigated", mitigation: "Randomized response delay: +12ms jitter applied" },
];

let _attackId = 1;
export function generateAttack(): AttackEvent {
  const base = ATTACK_POOL[Math.floor(Math.random() * ATTACK_POOL.length)];
  return { ...base, id: _attackId++, timestamp: new Date().toLocaleTimeString(), duration: Math.floor(Math.random() * 30) + 2 };
}

// ─── IVM ───────────────────────────────────────────────────────────────────
export const IVM_COHORTS = [
  { id: "#7423", name: "Active Lifestyle + Tech", color: "#2563eb", data: [0.42, 0.51, 0.63, 0.71, 0.79, 0.88, 0.93] },
  { id: "#8191", name: "Outdoor Enthusiasts", color: "#059669", data: [0.55, 0.57, 0.58, 0.56, 0.59, 0.57, 0.6] },
  { id: "#6044", name: "Weekend Warriors", color: "#d97706", data: [0.72, 0.68, 0.65, 0.6, 0.55, 0.52, 0.49] },
  { id: "#5501", name: "Casual Browsers", color: "#9ca3af", data: [0.18, 0.2, 0.22, 0.19, 0.21, 0.23, 0.2] },
];

export function getVelocityStatus(data: number[]) {
  const delta = data[data.length - 1] - data[data.length - 3];
  if (delta > 0.08) return { label: "Accelerating", color: "#2563eb", delta };
  if (delta < -0.05) return { label: "Decelerating", color: "#dc2626", delta };
  return { label: "Stable", color: "#059669", delta };
}

export const IVM_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── CPA³ ──────────────────────────────────────────────────────────────────
export const CPA_CHANNELS = [
  { name: "Display Ad", lastClick: 8, causal: 34, color: "#2563eb", description: "Top-of-funnel awareness driver" },
  { name: "Contextual Ad", lastClick: 12, causal: 41, color: "#7c3aed", description: "Mid-funnel intent capture" },
  { name: "Search Ad", lastClick: 80, causal: 25, color: "#059669", description: "Bottom-funnel last-touch" },
];

export function computeCausalAttribution(holdoutPct: number) {
  const conf = Math.min(95, 60 + holdoutPct * 1.4);
  const savedSpend = Math.round(holdoutPct * 2.8);
  return { confidence: conf.toFixed(1), savedSpend };
}

export const FEATURE_CARDS = [
  {
    id: "cpif",
    name: "Signal Fusion",
    tag: "CPIF",
    description: "Fuses 4 privacy signals into one adaptive relevance score with graceful degradation.",
    metric: "84.3",
    metricLabel: "PARS Score",
    href: "/cpif",
  },
  {
    id: "ccm",
    name: "Creative Morphing",
    tag: "CCM",
    description: "Same ad, different presentation. Creative adapts to page context — zero user data.",
    metric: "+27%",
    metricLabel: "CTR vs static",
    href: "/ccm",
  },
  {
    id: "apg",
    name: "Privacy Guardian",
    tag: "APG",
    description: "AI red-team that continuously attacks our system and auto-hardens defenses.",
    metric: "1,000+",
    metricLabel: "Attacks / day",
    href: "/apg",
  },
  {
    id: "ivm",
    name: "Intent Velocity",
    tag: "IVM",
    description: "Tracks cohort intent momentum to serve ads at the exact peak purchase moment.",
    metric: "0.93",
    metricLabel: "Intent peak",
    href: "/ivm",
  },
  {
    id: "cpa",
    name: "Causal Attribution",
    tag: "CPA\u00b3",
    description: "Proves which ad caused the conversion — causally, not correlationally — zero cookies.",
    metric: "41%",
    metricLabel: "True credit (contextual)",
    href: "/cpa",
  },
];
