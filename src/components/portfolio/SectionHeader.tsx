interface Props {
  index: string;
  eyebrow: string;
  title: string;
  kicker?: string;
}

const SectionHeader = ({ index, eyebrow, title, kicker }: Props) => (
  <div className="mb-14 md:mb-20">
    <div className="flex items-center gap-3 mb-5">
      <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">
        {index} · {eyebrow}
      </span>
      <span className="h-px flex-1 max-w-[140px] bg-gold/70" />
    </div>
    <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-[-0.015em] text-foreground max-w-3xl leading-[1.05]">
      {title}
    </h2>
    {kicker && (
      <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
        {kicker}
      </p>
    )}
  </div>
);

export default SectionHeader;