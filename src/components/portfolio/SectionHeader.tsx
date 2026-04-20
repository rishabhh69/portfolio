import { useScramble } from "@/hooks/useScramble";
import { useEffect, useRef, useState } from "react";

interface Props {
  index: string;
  eyebrow: string;
  title: string;
}

const SectionHeader = ({ index, eyebrow, title }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const t = useScramble(title, { trigger: visible, speed: 24 });

  return (
    <div ref={ref} className="mb-12 md:mb-16 flex items-end justify-between gap-6 border-b border-border pb-6">
      <div>
        <div className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-3">
          {index} · {eyebrow}
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
          {visible ? t : title}
        </h2>
      </div>
      <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
        <span className="size-1.5 bg-primary rounded-full animate-pulse" />
        loaded
      </div>
    </div>
  );
};

export default SectionHeader;