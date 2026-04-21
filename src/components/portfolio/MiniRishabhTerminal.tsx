import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";

type Role = "user" | "assistant";
interface Msg {
  role: Role;
  content: string;
}

const INITIAL_SYSTEM_LINE =
  "System initialized. I am the digital twin of Rishabh Shukla. Ask me about my architecture, my tech stack, or my execution latency. Type a message...";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const CHAT_URL = `${SUPABASE_URL}/functions/v1/mini-rishabh`;

const MiniRishabhTerminal = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open, error]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || loading) return;

    const userMsg: Msg = { role: "user", content: text };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);
    setError(null);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: SUPABASE_KEY,
        },
        body: JSON.stringify({ messages: nextHistory }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) throw new Error("Rate limit hit. Retry shortly.");
        if (resp.status === 402) throw new Error("Workspace credits exhausted.");
        throw new Error("Connection failed. Retry.");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            /* ignore */
          }
        }
      }
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      const msg = e instanceof Error ? e.message : "Unknown error.";
      setError(msg);
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
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
        <div className="w-[min(440px,calc(100vw-2rem))] bg-background border border-border-strong cyan-glow flex flex-col overflow-hidden animate-fade-up">
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
              Rishabh_AI_Terminal_v2.0
              <span className="text-primary cursor-blink">▍</span>
            </div>
            <span className="text-[10px] text-muted-foreground">⌘K</span>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="h-[360px] overflow-y-auto p-4 text-[12px] leading-relaxed space-y-3 bg-background"
          >
            <div className="text-foreground/60">
              <span className="text-primary">{">"}</span> {INITIAL_SYSTEM_LINE}
            </div>

            {messages.map((m, i) => (
              <Bubble key={i} msg={m} />
            ))}

            {loading &&
              (messages[messages.length - 1]?.role !== "assistant" ||
                !messages[messages.length - 1]?.content) && (
                <div className="text-primary/80">
                  <span className="text-primary">rishabh@ai</span>
                  <span className="text-foreground/50">:~$ </span>
                  <span className="cursor-blink">▍</span>
                  <span className="ml-2 text-foreground/50">computing...</span>
                </div>
              )}

            {error && (
              <div className="text-destructive/90">
                <span className="text-destructive">!</span> {error}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border bg-surface flex items-center"
          >
            <span className="pl-3 text-primary">$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={loading ? "streaming…" : "ask anything…"}
              disabled={loading}
              className="flex-1 bg-transparent px-2 py-3 text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] bg-primary text-primary-foreground font-bold hover:bg-primary-glow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        <span className="text-foreground">{msg.content}</span>
      </div>
    );
  }
  return (
    <div>
      <span className="text-primary">rishabh@ai</span>
      <span className="text-foreground/50">:~$ </span>
      <div className="pl-3 mt-1 text-foreground/85 prose prose-sm prose-invert max-w-none prose-p:my-1 prose-strong:text-foreground prose-code:text-primary prose-code:bg-surface prose-code:px-1 prose-code:rounded-none">
        <ReactMarkdown>{msg.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MiniRishabhTerminal;