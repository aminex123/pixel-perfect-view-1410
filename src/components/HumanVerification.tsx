import { RefreshCw, ShieldCheck } from "lucide-react";

export type Challenge = { a: number; b: number };

export function newChallenge(): Challenge {
  return { a: Math.floor(Math.random() * 15) + 2, b: Math.floor(Math.random() * 15) + 2 };
}

type Props = {
  challenge: Challenge | null;
  value: string;
  onChange: (v: string) => void;
  onRefresh: () => void;
  error?: string;
};

export function HumanVerification({ challenge, value, onChange, onRefresh, error }: Props) {
  return (
    <fieldset className="rounded-2xl border bg-muted/60 p-4 sm:p-5">
      <legend className="sr-only">Human verification</legend>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-electric-soft text-primary">
            <ShieldCheck className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold">Human verification</p>
            <p className="text-xs text-muted-foreground">Solve the sum to continue</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="grid h-11 w-11 place-items-center rounded-xl text-muted-foreground transition hover:bg-card hover:text-foreground"
          aria-label="New challenge"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div
          className="flex h-12 min-w-28 select-none items-center justify-center rounded-xl border bg-card px-4 font-mono text-lg font-semibold tracking-wider"
          aria-live="polite"
        >
          {challenge ? `${challenge.a} + ${challenge.b} =` : "…"}
        </div>
        <label htmlFor="captcha" className="sr-only">
          {challenge ? `What is ${challenge.a} plus ${challenge.b}?` : "Answer"}
        </label>
        <input
          id="captcha"
          inputMode="numeric"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))}
          placeholder="?"
          aria-invalid={!!error}
          aria-describedby={error ? "captcha-error" : undefined}
          className={`h-12 w-full rounded-xl border bg-card px-4 font-mono text-lg outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 ${error ? "border-destructive" : "border-input"}`}
        />
      </div>
      {error && (
        <p id="captcha-error" role="alert" className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </fieldset>
  );
}
