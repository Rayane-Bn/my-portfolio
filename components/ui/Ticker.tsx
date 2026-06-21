type TickerProps = {
  text: string;
};

/** Full-width inverted scrolling banner. Auto-inverts in dark mode since it reads colors from the ink/bg tokens. */
export function Ticker({ text }: TickerProps) {
  const items = Array(8).fill(text);

  return (
    <div className="overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-ink)] py-3">
      <div className="ticker-track flex w-max gap-6">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex flex-shrink-0 items-center gap-6 font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-bg)] uppercase"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
          </span>
        ))}
      </div>
    </div>
  );
}
