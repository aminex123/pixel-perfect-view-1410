import { Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Building2, CalendarDays, CheckCircle2, Clock, Fingerprint, Hash, Info, Printer, User } from "lucide-react";
import { useEffect, useState } from "react";
import type { CefrLevel, PublicCertificate } from "@/types/certificate";

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function VerificationResult({ cert, verificationId }: { cert: PublicCertificate; verificationId: string }) {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    setNow(new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }));
  }, []);
  const fullName = `${cert.firstName} ${cert.lastName}`;

  return (
    <div className="mx-auto max-w-6xl px-5 lg:px-8">
      {/* Status */}
      <section className="animate-fade-up rounded-3xl border bg-card p-6 shadow-elevated sm:p-9">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1 text-xs font-bold tracking-wider text-success">
              <CheckCircle2 className="h-3.5 w-3.5" /> VERIFIED CREDENTIAL
            </span>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Certificate successfully verified</h1>
            <p className="mt-2 max-w-xl text-muted-foreground">
              The information below matches a credential stored in our verification system.
            </p>
          </div>
          <dl className="grid gap-3 text-sm sm:grid-cols-2 md:grid-cols-1 md:text-right">
            <div>
              <dt className="text-xs text-muted-foreground">Verified on</dt>
              <dd className="font-medium">{now || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Reference ID</dt>
              <dd className="font-mono font-medium">{verificationId}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Holder */}
      <section className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]" aria-label="Credential holder">
        <figure className="animate-fade-up rounded-3xl border bg-card p-3 shadow-card">
          {cert.photo ? (
            <img src={cert.photo} alt={`Photograph of ${fullName}`} width={768} height={960} className="aspect-[4/5] w-full rounded-2xl object-cover" />
          ) : (
            <div className="grid aspect-[4/5] w-full place-items-center rounded-2xl bg-muted text-muted-foreground">
              <User className="h-16 w-16" aria-hidden />
            </div>
          )}
          <figcaption className="px-2 pb-1 pt-3 text-center text-xs text-muted-foreground">
            Identity photograph associated with the credential
          </figcaption>
        </figure>

        <div className="animate-fade-up rounded-3xl border bg-card p-6 shadow-card sm:p-8">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground">CREDENTIAL HOLDER</p>
          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{fullName}</h2>
          <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <Info2 icon={Hash} label="Certificate number" value={cert.certificateNumber} mono />
            <Info2 icon={Fingerprint} label="Candidate ID" value={cert.candidateNumber} mono />
            <Info2 icon={CalendarDays} label="Session date" value={fmtDate(cert.sessionDate)} />
            <Info2 icon={BadgeCheck} label="Credential" value={cert.credentialName} />
            <Info2 icon={Building2} label="Issuing organization" value={cert.issuer} />
            <div>
              <dt className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> Certificate status</dt>
              <dd className="mt-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-0.5 text-sm font-semibold capitalize text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> {cert.status}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Results */}
      <section className="mt-6 animate-fade-up rounded-3xl border bg-card p-6 shadow-card sm:p-8" aria-labelledby="results-h">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="results-h" className="text-xl font-bold">Assessment results</h2>
          <p className="text-xs text-muted-foreground">CEFR scale A1 → C2</p>
        </div>

        <table className="mt-6 hidden w-full text-left md:table">
          <thead>
            <tr className="border-b text-xs uppercase tracking-wider text-muted-foreground">
              <th className="pb-3 font-medium">Assessment</th>
              <th className="pb-3 font-medium">Score</th>
              <th className="pb-3 font-medium">Level</th>
              <th className="pb-3 font-medium"><span className="sr-only">Scale</span></th>
            </tr>
          </thead>
          <tbody>
            {cert.assessments.map((a) => (
              <tr key={a.name} className="border-b last:border-0 transition-colors hover:bg-muted/50">
                <td className="py-4 font-medium">{a.name}</td>
                <td className="py-4 font-mono">{a.score}</td>
                <td className="py-4"><LevelBadge level={a.level} /></td>
                <td className="w-64 py-4"><LevelScale level={a.level} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="mt-5 space-y-3 md:hidden">
          {cert.assessments.map((a) => (
            <li key={a.name} className="rounded-2xl border p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">{a.name}</p>
                <LevelBadge level={a.level} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Score <span className="font-mono text-foreground">{a.score}</span></p>
              <div className="mt-3"><LevelScale level={a.level} /></div>
            </li>
          ))}
        </ul>
      </section>

      {/* Details + security */}
      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="animate-fade-up rounded-3xl border bg-card p-6 shadow-card sm:p-8">
          <h2 className="text-xl font-bold">Verification details</h2>
          <div className="mt-6 flex flex-col gap-8 sm:flex-row">
            <dl className="grid flex-1 gap-4 text-sm">
              <Row k="Status" v={<span className="font-semibold text-success">Valid</span>} />
              <Row k="Record matched" v="Yes" />
              <Row k="Verified on" v={now || "—"} />
              <Row k="Verification ID" v={<span className="font-mono">{verificationId}</span>} />
              <Row k="Issuer" v={cert.issuer} />
            </dl>
            <div className="flex flex-col items-center gap-2">
              <QrPlaceholder seed={verificationId} />
              <p className="max-w-40 text-center text-[11px] text-muted-foreground">/verify/{verificationId}</p>
            </div>
          </div>
        </div>
        <aside className="animate-fade-up rounded-3xl border border-primary/20 bg-electric-soft p-6">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-card text-primary"><Info className="h-5 w-5" /></span>
          <h3 className="mt-4 font-bold">Check the address</h3>
          <p className="mt-2 text-sm text-accent-foreground/80">
            For security, always make sure you are using the official verification domain of the organization that issued your credential.
          </p>
        </aside>
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className="flex min-h-12 items-center justify-center gap-2 rounded-xl border bg-card px-5 font-medium transition hover:bg-muted">
          <ArrowLeft className="h-4 w-4" /> Verify another certificate
        </Link>
        <button onClick={() => window.print()} className="flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground">
          <Printer className="h-4 w-4" /> Print
        </button>
      </div>
    </div>
  );
}

function Info2({ icon: I, label, value, mono }: { icon: typeof Hash; label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs text-muted-foreground"><I className="h-3.5 w-3.5" /> {label}</dt>
      <dd className={`mt-1 font-medium ${mono ? "font-mono" : ""}`}>{value}</dd>
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b pb-3 last:border-0">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right font-medium">{v}</dd>
    </div>
  );
}

function LevelBadge({ level }: { level: CefrLevel }) {
  const high = level.startsWith("C");
  return (
    <span className={`inline-flex h-7 min-w-10 items-center justify-center rounded-lg px-2 text-sm font-bold ${high ? "bg-navy text-navy-foreground" : "bg-electric-soft text-primary"}`}>
      {level}
    </span>
  );
}

function LevelScale({ level }: { level: CefrLevel }) {
  const idx = LEVELS.indexOf(level);
  return (
    <div className="flex gap-1" role="img" aria-label={`Level ${level} on the A1 to C2 scale`}>
      {LEVELS.map((l, i) => (
        <span key={l} className={`h-1.5 flex-1 rounded-full ${i <= idx ? "bg-gradient-primary" : "bg-muted"}`} />
      ))}
    </div>
  );
}

function QrPlaceholder({ seed }: { seed: string }) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const cells = Array.from({ length: 121 }, (_, i) => {
    const x = i % 11, y = Math.floor(i / 11);
    const finder = (x < 3 && y < 3) || (x > 7 && y < 3) || (x < 3 && y > 7);
    if (finder) return !(x % 10 === 1 && y % 10 === 1) && !((x === 9 && y === 1) || (x === 1 && y === 9));
    h = (h * 1103515245 + 12345) >>> 0;
    return (h >> 16) % 3 === 0;
  });
  return (
    <div className="grid h-36 w-36 grid-cols-11 gap-px rounded-2xl border bg-card p-3" aria-label="QR code placeholder" role="img">
      {cells.map((on, i) => <span key={i} className={on ? "rounded-[2px] bg-navy" : ""} />)}
    </div>
  );
}
