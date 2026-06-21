export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] px-6 py-8 text-center">
      <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-muted)]">
        © {new Date().getFullYear()} Rayane Benkradidja
      </p>
    </footer>
  );
}
