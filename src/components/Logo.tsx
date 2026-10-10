export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span className={`relative grid place-items-center rounded-xl bg-gradient-primary shadow-glow ${className}`} aria-hidden>
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.5 4.5 5.5v6c0 4.6 3.1 8.4 7.5 10 4.4-1.6 7.5-5.4 7.5-10v-6L12 2.5Z" />
        <path d="m8.5 12 2.5 2.5 4.5-5" />
      </svg>
    </span>
  );
}
