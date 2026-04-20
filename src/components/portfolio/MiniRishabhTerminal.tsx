import { useEffect, useRef, useState } from "react";

interface Msg {
  role: "system" | "user" | "ai";
  text: string;
}

const INITIAL: Msg[] = [
  {
    role: "system",
    text: "System initialized. I am the digital twin of Rishabh Shukla. Ask me about my tech stack, my execution latency, or why I should be your next quant hire. Type a message...",
  },
];

/** Scripted, deterministic responses — no API call, just patterns. */
function respond(input: string): string {
  const q = input.toLowerCase();
  if (!q.trim()) return "Empty query. Try: 'stack', 'latency', 'hire', 'tradeky', 'chess'.";
  if (/(stack|tech|tools|languages?)/.test(q))
    return "Primary stack: C++20, Python, TypeScript. Edges: FastAPI, React, Node, Supabase, Postgres. ML/quant: NumPy, Pandas, NLP, LLMs.";
  if (/(latency|fast|speed|ms|performance)/.test(q))
    return "TradeKy executes orders in <50ms via multi-threaded AngelOne routing. Geo queries on Kyte: <150ms across 500+ nodes.";
  if (/(hire|why|recruit|join|work)/.test(q))
    return "Three reasons: (1) I ship — TradeKy, Kyte, Regulon are all live architectures. (2) Quant + systems brain — NLP→Python compiler is not a typical undergrad project. (3) Discipline compounds. Sleep is negotiable.";
  if (/(tradeky|trade)/.test(q))
    return "TradeKy: institutional-grade algo execution platform. Proprietary NLP→Python compiler + multi-threaded AngelOne API routing. Sub-50ms.";
  if (/(kyte|ride|hailing|uber)/.test(q))
    return "Kyte: full-stack ride-hailing system. Custom matching algorithms, sub-150ms geolocation querying, 500+ simulated nodes.";
  if (/(regulon|data|gov|scrap)/.test(q))
    return "Regulon: distributed extraction pipelines parsing unstructured government portals. Supabase + Postgres with hardened RLS.";
  if (/(chess|elo|strategy)/.test(q))
    return "1420+ ELO. Chess trains 5-move-ahead architecture and risk asymmetry. Same muscle as quant.";
  if (/(uav|drone|hardware|physical)/.test(q))
    return "Built and calibrated physics-based flight control systems for UAVs. Bits ↔ atoms.";
  if (/(gym|fit|body|height|weight)/.test(q))
    return "6'2\", 80kg. Strict bodybuilding regimen. Discipline in the gym = discipline in the codebase.";
  if (/(school|jiit|college|grade|study)/.test(q))
    return "94.3% in high school, perfect 100 in CSE. Now 4th-sem CSE @ JIIT — running coursework as a background process.";
  if (/(award|win|competition|showdown)/.test(q))
    return "Top 3 / 100+ at Startup Showdown. Top performer in Execute 25.1 algorithmic competition.";
  if (/(contact|email|reach|hire me|hello|hi)/.test(q))
    return "Channel open. DM on the social of your choice or use the recruit pipeline. I read everything.";
  return `Pattern not matched in v1.0 corpus. Try: stack | latency | tradeky | kyte | regulon | chess | hire`;
}

const MiniRishabhTerminal = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgs, typing, open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    const reply = respond(text);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { role: "ai", text: reply }]);
    }, 480 + Math.random() * 400);
  };

  return (
    <div id="terminal" className="fixed bottom-4 right-4 z-50 font-mono">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-3 bg-surface border border-border-strong px-4 py-3 cyan-glow hover:border-primary transition-all"
        >
          <span className="size-2 bg-primary rounded-full animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] text-foreground/80 group-hover:text-primary">
            Open Mini-Rishabh
          </span>
        </button>
      )}

      {open && (
        <div className="w-[min(420px,calc(100vw-2rem))] bg-background border border-border-strong cyan-glow flex flex-col overflow-hidden animate-fade-up">
          {/* Title bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-surface border-b border-border">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close terminal"
                className="size-3 rounded-full bg-destructive/70 hover:bg-destructive transition-colors"
              />
              <span className="size-3 rounded-full bg-terminal-amber/70" />
              <span className="size-3 rounded-full bg-terminal-green/70" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/70 flex items-center gap-2">
              Rishabh_AI_Terminal_v1.0
              <span className="text-primary cursor-blink">▍</span>
            </div>
            <span className="text-[10px] text-muted-foreground">⌘K</span>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="h-[340px] overflow-y-auto p-4 text-[12px] leading-relaxed space-y-3 bg-background"
          >
            {msgs.map((m, i) => (
              <Bubble key={i} msg={m} />
            ))}
            {typing && (
              <div className="text-primary/80">
                <span className="text-primary">rishabh@ai</span>
                <span className="text-foreground/50">:~$ </span>
                <span className="cursor-blink">▍</span>
                <span className="ml-2 text-foreground/50">computing...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="border-t border-border bg-surface flex items-center"
          >
            <span className="pl-3 text-primary">$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ask anything…"
              className="flex-1 bg-transparent px-2 py-3 text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] bg-primary text-primary-foreground font-bold hover:bg-primary-glow transition-colors"
            >
              Send →
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const Bubble = ({ msg }: { msg: Msg }) => {
  if (msg.role === "user") {
    return (
      <div>
        <span className="text-primary">guest@portfolio</span>
        <span className="text-foreground/50">:~$ </span>
        <span className="text-foreground">{msg.text}</span>
      </div>
    );
  }
  if (msg.role === "ai") {
    return (
      <div>
        <span className="text-primary">rishabh@ai</span>
        <span className="text-foreground/50">:~$ </span>
        <span className="text-foreground/85">{msg.text}</span>
      </div>
    );
  }
  return (
    <div className="text-foreground/60">
      <span className="text-primary">{">"}</span> {msg.text}
    </div>
  );
};

export default MiniRishabhTerminal;