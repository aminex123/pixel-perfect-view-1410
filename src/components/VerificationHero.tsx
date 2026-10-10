import { BadgeCheck, Lock, ShieldCheck, Zap } from "lucide-react";

export function VerificationHero() {
  return (
    <section className="relative overflow-hidden bg-hero pb-40 pt-14 text-navy-foreground md:pt-20">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.15fr_1fr] lg:px-8">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/15 bg-navy-foreground/5 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-navy-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-electric" /> SECURE VERIFICATION
          </span>
          <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Verify a certificate <span className="text-electric">in seconds.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-navy-muted sm:text-lg">
            Confirm the authenticity and details of a credential using its verification information.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {[
              { icon: ShieldCheck, t: "Secure verification" },
              { icon: Zap, t: "Instant results" },
              { icon: Lock, t: "Privacy protected" },
            ].map(({ icon: I, t }) => (
              <li key={t} className="flex items-center gap-2 text-navy-foreground/90">
                <I className="h-4 w-4 text-electric" aria-hidden /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative hidden h-80 lg:block" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy-foreground/10" />
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy-foreground/5" />
          <div className="animate-float-slow absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-navy-foreground/15 bg-navy-foreground/[0.06] p-6 backdrop-blur-md">
            <div className="animate-scan absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-electric/20 to-transparent" />
            <div className="flex items-center justify-between">
              <div className="h-9 w-9 rounded-xl bg-gradient-primary" />
              <span className="rounded-full bg-success/20 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-success">VERIFIED</span>
            </div>
            <div className="mt-6 space-y-2.5">
              <div className="h-2.5 w-3/4 rounded-full bg-navy-foreground/30" />
              <div className="h-2 w-1/2 rounded-full bg-navy-foreground/15" />
            </div>
            <div className="mt-6 grid grid-cols-4 gap-2">
              {["B2", "C1", "B2", "B2"].map((l, i) => (
                <div key={i} className="rounded-lg border border-navy-foreground/10 py-2 text-center text-xs font-semibold text-navy-foreground/80">{l}</div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-navy-muted">
              <BadgeCheck className="h-4 w-4 text-electric" /> Record matched
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
