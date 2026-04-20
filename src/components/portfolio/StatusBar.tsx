import { useEffect, useState } from "react";

const StatusBar = () => {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const ts = time.toISOString().replace("T", " ").slice(0, 19);

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 md:px-6 py-2.5 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <span className="size-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-primary">System Active</span>
          </div>
          <span className="hidden md:inline">Node: BLR-1 · 12.97N 77.59E</span>
        </div>
        <div className="flex items-center gap-4 md:gap-6 tabular-nums">
          <span className="hidden sm:inline">Lat: <span className="text-foreground">42ms</span></span>
          <span className="hidden md:inline">Build: 1.0.0</span>
          <span className="text-foreground/50">{ts} UTC</span>
        </div>
      </div>
      <div className="border-t border-border bg-primary/5 py-1 overflow-hidden whitespace-nowrap">
        <div className="flex gap-8 px-4 font-mono text-[9px] text-primary/60 uppercase ticker-track" style={{ width: "max-content" }}>
          {Array.from({ length: 4 }).flatMap((_, k) => [
            <span key={`a${k}`}>NLP_COMPILER: ONLINE</span>,
            <span key={`b${k}`}>•</span>,
            <span key={`c${k}`}>ANGEL_ONE_API: ROUTED</span>,
            <span key={`d${k}`}>•</span>,
            <span key={`e${k}`}>EXEC_LATENCY: &lt;50ms</span>,
            <span key={`f${k}`}>•</span>,
            <span key={`g${k}`}>UPTIME: 99.999%</span>,
            <span key={`h${k}`}>•</span>,
            <span key={`i${k}`}>CHESS_RATING: 1420</span>,
            <span key={`j${k}`}>•</span>,
          ])}
        </div>
      </div>
    </header>
  );
};

export default StatusBar;