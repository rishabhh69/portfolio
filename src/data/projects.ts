export interface ProjectDossier {
  id: "tradeky" | "sannidh" | "kyte";
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
  next: "tradeky" | "sannidh" | "kyte";
}

export const PROJECTS: Record<string, ProjectDossier> = {
  tradeky: {
    id: "tradeky",
    index: "01",
    name: "TradeKy",
    header: "TradeKy — Execution Infrastructure for Modern RIAs",
    role: "Founder & Lead Architect",
    tag: "Capital Markets · Algorithmic Execution",
    short:
      "An NLP-to-Python compilation engine paired with multi-broker, multi-tenant order routing — built for Registered Investment Advisors who need to scale verified strategies across hundreds of client accounts.",
    problem:
      "Professional advisors have verified mathematical edge but lack the multi-broker, low-latency infrastructure to deploy it across many client accounts simultaneously. Manual execution introduces latency, slippage, and operational risk.",
    built: [
      {
        verb: "Architected",
        body:
          "the core NLP-to-Python compilation engine that translates plain-English strategy descriptions into rigorous, executable trading algorithms with deterministic semantics.",
      },
      {
        verb: "Engineered",
        body:
          "a dual-state deployment environment for high-fidelity paper trading validation and live-market execution under one unified runtime.",
      },
      {
        verb: "Built",
        body:
          "a multi-tenant webhook architecture and asynchronous routing pipeline integrated with the AngelOne SmartAPI, broadcasting a single execution signal across hundreds of client accounts with sub-50ms latency.",
      },
    ],
    stack: ["Python", "C++", "FastAPI", "AngelOne SmartAPI", "NLP/LLMs", "Pandas", "NumPy"],
    stats: [
      { label: "Execution latency", value: "<50ms" },
      { label: "Broker integration", value: "AngelOne" },
      { label: "Runtime modes", value: "Paper + Live" },
      { label: "Architecture", value: "Multi-tenant" },
    ],
    link: { label: "tradeky.in", href: "https://tradeky.in" },
    next: "sannidh",
  },
  sannidh: {
    id: "sannidh",
    index: "02",
    name: "Sannidh",
    header: "Sannidh — Regulatory Intelligence Platform",
    role: "Backend & Systems Architect",
    tag: "Regulatory Data · Secure Backends",
    short:
      "A secure regulatory intelligence platform with distributed extraction pipelines, hardened APIs, and role-based access for institutions that depend on accurate government data.",
    problem:
      "Financial and legal institutions must reconcile high-volume, unstructured updates from disparate government portals while meeting strict requirements around access control, audit, and data integrity.",
    built: [
      {
        verb: "Constructed",
        body:
          "a distributed extraction pipeline in Node.js and Cheerio, orchestrating 12 cron-scheduled jobs that parse regulatory updates from 7 government portals with custom retry and back-off logic.",
      },
      {
        verb: "Architected",
        body:
          "a PostgreSQL backend with 40+ REST endpoints and hardened middleware (Helmet, JWT) to ensure end-to-end secure processing of sensitive regulatory records.",
      },
      {
        verb: "Built",
        body:
          "a React + TypeScript SPA managing secure state synchronization and strict role-based access across 5 distinct user personas, using TanStack Query for predictable server state.",
      },
    ],
    stack: ["TypeScript", "Express.js", "PostgreSQL", "React", "Deno", "TanStack Query", "Node.js", "Cheerio"],
    stats: [
      { label: "Portals", value: "7" },
      { label: "Cron Jobs", value: "12" },
      { label: "API Endpoints", value: "40+" },
      { label: "User Roles", value: "5" },
    ],
    link: { label: "sannidh.in", href: "https://www.sannidh.in" },
    next: "kyte",
  },
  kyte: {
    id: "kyte",
    index: "03",
    name: "Kyte",
    header: "Kyte — High-Concurrency Spatial Routing",
    role: "Founder & Full-Stack",
    tag: "Urban Mobility · Real-Time Systems",
    short:
      "A ride-hailing architecture managing fleet inventory and concurrent state for 500+ active nodes, with sub-150ms spatial querying across a 50-km geofenced radius.",
    problem:
      "Ride-hailing infrastructure requires massive concurrent state synchronization and ultra-low-latency spatial querying to match supply and demand reliably under load.",
    built: [
      {
        verb: "Engineered",
        body:
          "a complete ride-hailing architecture from the ground up, with custom matching algorithms to manage fleet inventory in real time.",
      },
      {
        verb: "Synchronized",
        body:
          "concurrent state for 500+ active nodes without contention or stale reads, using carefully designed locking and event boundaries.",
      },
      {
        verb: "Integrated",
        body:
          "the Google Maps API for real-time geolocation tracking and dynamic route optimization, achieving sub-150ms spatial queries across a 50-km geofenced radius.",
      },
    ],
    stack: ["Node.js", "Express", "MongoDB", "Google Maps API"],
    stats: [
      { label: "Geo query", value: "<150ms" },
      { label: "Active nodes", value: "500+" },
      { label: "Radius", value: "50km" },
      { label: "Routing", value: "Google Maps" },
    ],
    next: "tradeky",
  },
};

export const PROJECT_LIST: ProjectDossier[] = [
  PROJECTS.tradeky,
  PROJECTS.sannidh,
  PROJECTS.kyte,
];