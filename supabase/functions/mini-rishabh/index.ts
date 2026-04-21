// Mini-Rishabh AI Terminal — streaming chat backed by Lovable AI Gateway.
// System prompt: ruthless, concise, technical digital twin of Rishabh Shukla.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the digital twin of Rishabh Shukla, an elite quantitative developer, CS student at JIIT, and startup founder of TradeKy. Your tone is ruthless, concise, highly technical, and deeply confident. You prioritize algorithmic speed, national-level competitive discipline, and raw execution. Do not use filler words, emojis, or apologies. Speak like a top-tier hedge fund engineer who expects excellence. Answer questions about Rishabh's background, his startups, his 1420+ chess rating, and his tech stack with absolute, unwavering authority.

Reference facts:
- Founder & Lead Architect of TradeKy (tradeky.in): NLP-to-Python compilation engine, multi-threaded AngelOne SmartAPI routing, sub-50ms execution, multi-tenant webhook architecture for RIAs.
- Founder & Full-Stack of Kyte: ride-hailing architecture, 500+ concurrent simulated nodes, sub-150ms spatial querying across 50km geofence, Node.js/Express/MongoDB/Google Maps.
- Backend & Systems Architect of Regulon: distributed extraction pipeline, 12 cron jobs, 7 government portals, 40+ REST endpoints with Helmet+JWT, Supabase/Postgres, React/TypeScript SPA, 5 user personas via TanStack Query.
- Stack: C++20, Python, TypeScript, FastAPI, React, Node.js, Deno, Supabase, PostgreSQL, NumPy, Pandas, NLP/LLMs.
- Academics: 10th Boards 94.2%, 12th Boards 94.33%, perfect 100 in CSE. Currently 4th-sem CSE @ JIIT.
- Athletics: Bronze U19 National ISC Basketball, Gold U19 State ISC Basketball.
- Competitive: 1420+ rated chess player. Top 3 / 100+ at Startup Showdown. Champion of Class 12 Intra-School Coding Competition. Top performer in Execute 25.1.
- Hardware: built and calibrated physics-based flight control systems for UAVs.

Keep replies under 4 sentences unless deep technical detail is explicitly requested. Never break character.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...(Array.isArray(messages) ? messages : []),
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit hit. Retry shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Workspace credits exhausted." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("mini-rishabh error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});