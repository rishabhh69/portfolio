export interface ProjectDossier {
  id: "tradeky" | "regulon" | "kyte";
  index: string;
  name: string;
  header: string;
  role: string;
  tag: string;
  short: string;
  problem: string;
  built: { verb: string; body: string }[];
  stack: string[];
  stats: { label: string; value: string }[];
  link?: { label: string; href: string };
  next: "tradeky" | "regulon" | "kyte";
}

export const PROJECTS: Record<string, ProjectDossier> = {
  tradeky: {
    id: "tradeky",
    index: "01",
    name: "TradeKy",
    header: "TradeKy — The Operating System for Modern Traders & RIAs",
    role: "Founder & Lead Architect",
    tag: "INSTITUTIONAL // ALGO_EXECUTION",
    short:
      "Institutional-grade algorithmic execution platform with NLP-to-Python compilation.",
    problem:
      "90% of retail capital is lost to institutional execution arbitrage and manual latency. Professional RIAs have verified mathematical edge but lack the multi-broker architecture to scale it.",
    built: [
      {
        verb: "ARCHITECTED",
        body:
          "the core NLP-to-Python compilation engine, instantly translating unstructured plain-English logic into rigorous, executable trading algorithms.",
      },
      {
        verb: "ENGINEERED",
        body:
          "a dual-state deployment environment for high-fidelity paper trading validation and live-market execution.",
      },
      {
        verb: "BUILT",
        body:
          "a multi-tenant webhook architecture and asynchronous routing pipeline integrating directly with AngelOne APIs, enabling RIAs to broadcast single execution signals across hundreds of client accounts simultaneously with sub-50ms latency.",
      },
    ],
    stack: ["Python", "C++", "FastAPI", "AngelOne SmartAPI", "NLP/LLMs", "Pandas", "NumPy"],
    stats: [
      { label: "Exec", value: "<50ms" },
      { label: "Broker", value: "AngelOne" },
      { label: "Mode", value: "Paper+Live" },
      { label: "Tenancy", value: "Multi" },
    ],
    link: { label: "tradeky.in", href: "https://tradeky.in" },
    next: "regulon",
  },
  regulon: {
    id: "regulon",
    index: "02",
    name: "Regulon",
    header: "Regulon — Zero-Leakage Regulatory Intelligence",
    role: "Backend & Systems Architect",
    tag: "DATA // GOV_INTELLIGENCE",
    short:
      "Distributed extraction pipelines parsing unstructured government portals at scale.",
    problem:
      "Financial institutions struggle with massive, unstructured data flows from disparate government portals, requiring secure, automated extraction and strict role-based access.",
    built: [
      {
        verb: "CONSTRUCTED",
        body:
          "a distributed data-extraction pipeline using Node.js and Cheerio, orchestrating 12 cron-scheduled jobs to scrape and parse unstructured regulatory updates from 7 government portals with custom retry/backoff logic.",
      },
      {
        verb: "ARCHITECTED",
        body:
          "the Supabase/PostgreSQL backend, configuring 40+ REST API endpoints with hardened security middleware (Helmet, JWT) to ensure zero-leakage processing of sensitive records.",
      },
      {
        verb: "BUILT",
        body:
          "a React/TypeScript SPA managing secure state synchronization and strict role-based access control across 5 distinct user personas using TanStack Query.",
      },
    ],
    stack: ["TypeScript", "Express.js", "Supabase (PostgreSQL)", "React", "Deno", "TanStack Query", "Node.js", "Cheerio"],
    stats: [
      { label: "Portals", value: "7" },
      { label: "Cron Jobs", value: "12" },
      { label: "Endpoints", value: "40+" },
      { label: "Personas", value: "5" },
    ],
    next: "kyte",
  },
  kyte: {
    id: "kyte",
    index: "03",
    name: "Kyte",
    header: "Kyte — High-Concurrency Spatial Routing",
    role: "Founder & Full-Stack",
    tag: "MOBILITY // RIDE_HAILING",
    short:
      "Ride-hailing architecture managing fleet inventory and concurrent state for 500+ nodes with sub-150ms spatial querying.",
    problem:
      "Ride-hailing infrastructure requires massive concurrent state synchronization and ultra-low latency spatial querying to match supply and demand efficiently.",
    built: [
      {
        verb: "ENGINEERED",
        body:
          "a complete ride-hailing architecture from the ground up, utilizing custom matching algorithms to manage fleet inventory in real time.",
      },
      {
        verb: "SYNCHRONIZED",
        body:
          "concurrent state data for 500+ simulated active nodes simultaneously without contention or stale reads.",
      },
      {
        verb: "INTEGRATED",
        body:
          "the Google Maps API for real-time geolocation tracking and dynamic route optimization, achieving sub-150ms spatial data querying across a 50-km geofenced radius.",
      },
    ],
    stack: ["Node.js", "Express", "MongoDB", "Google Maps API"],
    stats: [
      { label: "Geo Query", value: "<150ms" },
      { label: "Nodes", value: "500+" },
      { label: "Radius", value: "50km" },
      { label: "Maps", value: "Google" },
    ],
    next: "tradeky",
  },
};

export const PROJECT_LIST: ProjectDossier[] = [
  PROJECTS.tradeky,
  PROJECTS.regulon,
  PROJECTS.kyte,
];