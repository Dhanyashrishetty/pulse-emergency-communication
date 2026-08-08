type Props = {
  eyebrow: string;
  index: string;
  title: string;
  subtitle?: string;
};

export function SectionHeader({ eyebrow, index, title, subtitle }: Props) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-pulse font-semibold">{index}</span>
        <span className="h-px w-8 bg-border" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-ink-dim leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
