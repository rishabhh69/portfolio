import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#01ABCDEF$%&";

/**
 * Cryptographic / terminal text-scramble decryption effect.
 * Returns a string that animates from random glyphs to the target text.
 */
export function useScramble(target: string, opts: { speed?: number; delay?: number; trigger?: unknown } = {}) {
  const { speed = 28, delay = 0, trigger } = opts;
  const [output, setOutput] = useState("");
  const frame = useRef(0);
  const queue = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      const old = "";
      const length = Math.max(old.length, target.length);
      queue.current = [];
      for (let i = 0; i < length; i++) {
        const from = old[i] || "";
        const to = target[i] || "";
        const s = Math.floor(Math.random() * speed);
        const e = s + Math.floor(Math.random() * speed);
        queue.current.push({ from, to, start: s, end: e });
      }
      frame.current = 0;
      const tick = () => {
        let out = "";
        let complete = 0;
        for (let i = 0; i < queue.current.length; i++) {
          const q = queue.current[i];
          if (frame.current >= q.end) {
            complete++;
            out += q.to;
          } else if (frame.current >= q.start) {
            if (!q.char || Math.random() < 0.28) q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
            out += q.char;
          } else {
            out += q.from;
          }
        }
        setOutput(out);
        if (complete < queue.current.length) {
          raf.current = requestAnimationFrame(tick);
          frame.current++;
        }
      };
      tick();
    };
    const t = setTimeout(start, delay);
    return () => {
      cancelled = true;
      clearTimeout(t);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, trigger]);

  return output;
}