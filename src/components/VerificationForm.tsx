import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, CalendarDays, ChevronDown, FileBadge, Loader2, Search, SearchX, Check } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { verifyCertificate } from "@/services/verificationService";
import { HumanVerification, newChallenge, type Challenge } from "./HumanVerification";

type Errors = Partial<Record<"number" | "date" | "captcha", string>>;
type Status = "idle" | "loading" | "success" | "not_found" | "rate_limited";

export function VerificationForm() {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [answer, setAnswer] = useState("");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => setChallenge(newChallenge()), []);

  const refresh = () => {
    setChallenge(newChallenge());
    setAnswer("");
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    const num = number.trim();
    if (!num) next.number = "Enter the certificate number.";
    else if (num.length > 40 || !/^[A-Za-z0-9-]+$/.test(num)) next.number = "Use only letters, numbers and dashes.";
    if (!date) next.date = "Select the session date.";
    if (!answer) next.captcha = "Enter the answer to the challenge.";
    else if (challenge && Number(answer) !== challenge.a + challenge.b)
      next.captcha = "The verification challenge is incorrect. Please try again.";
    setErrors(next);
    if (next.captcha && answer) refresh();
    if (Object.keys(next).length) return;

    setStatus("loading");
    const res = await verifyCertificate({ certificateNumber: num, sessionDate: date });
    if (res.verified) {
      setStatus("success");
      setTimeout(() => navigate({ to: "/verify/$verificationId", params: { verificationId: res.verificationId } }), 350);
    } else {
      setStatus(res.reason);
      refresh();
    }
  }

  const reset = () => {
    setStatus("idle");
    setErrors({});
  };

  const busy = status === "loading" || status === "success";

  if (status === "not_found" || status === "rate_limited") {
    return (
      <Card>
        <div className="animate-fade-up px-2 py-8 text-center" role="status">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-warning-soft text-warning">
            <SearchX className="h-6 w-6" aria-hidden />
          </span>
          <h2 className="mt-5 text-2xl font-bold">
            {status === "rate_limited" ? "Too many attempts" : "We couldn't verify this certificate."}
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
            {status === "rate_limited"
              ? "Please wait a minute before trying again."
              : "Check the certificate number and session date and try again."}
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={reset} className="min-h-12 rounded-xl bg-gradient-primary px-6 font-semibold text-primary-foreground shadow-glow transition hover:brightness-110">
              Try again
            </button>
            <a href="/help" className="flex min-h-12 items-center justify-center rounded-xl border px-6 font-medium transition hover:bg-muted">
              Contact support
            </a>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      {status === "loading" && (
        <div className="absolute inset-0 z-10 grid place-items-center rounded-3xl bg-card/85 backdrop-blur-sm" role="status" aria-live="polite">
          <div className="text-center">
            <div className="relative mx-auto h-14 w-14">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
              <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
              </span>
            </div>
            <p className="mt-4 font-medium">Checking verification records…</p>
          </div>
        </div>
      )}

      <div className="mb-7">
        <h2 className="text-2xl font-bold">Certificate verification</h2>
        <p className="mt-1 text-muted-foreground">Enter the information shown on the certificate.</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <Field id="cert" label="Certificate / Attestation number" error={errors.number} icon={<FileBadge className="h-4 w-4" />}>
          <input
            id="cert"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="e.g. CRT-2026-002831"
            autoComplete="off"
            maxLength={40}
            aria-invalid={!!errors.number}
            aria-describedby={errors.number ? "cert-error" : undefined}
            className={inputCls(!!errors.number)}
          />
        </Field>

        <Field id="date" label="Session date" error={errors.date} icon={<CalendarDays className="h-4 w-4" />}>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "date-error" : undefined}
            className={inputCls(!!errors.date)}
          />
        </Field>

        <div className="rounded-2xl border border-dashed">
          <button
            type="button"
            onClick={() => setHelpOpen((o) => !o)}
            aria-expanded={helpOpen}
            aria-controls="help-panel"
            className="flex min-h-11 w-full items-center justify-between px-4 text-sm font-medium text-primary"
          >
            Where can I find this information?
            <ChevronDown className={`h-4 w-4 transition-transform ${helpOpen ? "rotate-180" : ""}`} />
          </button>
          {helpOpen && (
            <p id="help-panel" className="animate-fade-up px-4 pb-4 text-sm text-muted-foreground">
              The certificate number and session date are printed on the credential provided by the issuing organization.
            </p>
          )}
        </div>

        <HumanVerification challenge={challenge} value={answer} onChange={setAnswer} onRefresh={refresh} error={errors.captcha} />

        <button
          type="submit"
          disabled={busy || !challenge}
          className="group flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary text-base font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "loading" ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> Verifying…</>
          ) : status === "success" ? (
            <><Check className="h-5 w-5" /> Verified</>
          ) : (
            <><Search className="h-5 w-5 transition group-hover:scale-110" /> Verify certificate</>
          )}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Demo: try <span className="font-mono">CRT-2026-002831</span> with session date 26/04/2025.
        </p>
      </form>
    </Card>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="relative rounded-3xl border bg-card p-6 shadow-elevated sm:p-9">{children}</div>;
}

const inputCls = (err: boolean) =>
  `h-12 w-full rounded-xl border bg-card pl-11 pr-4 text-[15px] outline-none transition placeholder:text-muted-foreground/70 hover:border-ring/50 focus:border-primary focus:ring-4 focus:ring-primary/15 ${err ? "border-destructive" : "border-input"}`;

function Field({ id, label, error, icon, children }: { id: string; label: string; error?: string | undefined; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}
