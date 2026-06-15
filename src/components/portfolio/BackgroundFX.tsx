const BackgroundFX = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Fine engineering grid */}
      <div className="absolute inset-0 bg-grid-fine" />

      {/* Aurora / gradient blobs — emerald + gold, very soft */}
      <div
        className="absolute -top-[20%] -left-[15%] h-[70vh] w-[70vh] rounded-full blur-3xl opacity-[0.35] animate-aurora-1"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.55), transparent 65%)",
        }}
      />
      <div
        className="absolute top-[10%] -right-[10%] h-[60vh] w-[60vh] rounded-full blur-3xl opacity-[0.30] animate-aurora-2"
        style={{
          background:
            "radial-gradient(circle at 70% 40%, hsl(var(--gold) / 0.50), transparent 65%)",
        }}
      />
      <div
        className="absolute -bottom-[20%] left-[20%] h-[65vh] w-[65vh] rounded-full blur-3xl opacity-[0.28] animate-aurora-3"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(var(--primary-glow) / 0.45), transparent 65%)",
        }}
      />

      {/* Paper grain */}
      <div className="absolute inset-0 paper-texture opacity-80" />
      <div className="absolute inset-0 bg-noise opacity-[0.18] mix-blend-multiply" />

      {/* Vignette to keep edges editorial */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, hsl(var(--background)) 100%)",
        }}
      />
    </div>
  );
};

export default BackgroundFX;