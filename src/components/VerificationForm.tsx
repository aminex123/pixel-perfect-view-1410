import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, Loader2, Search } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { resolveScanRef, saveScanRef } from "@/lib/scanRef";
import { verifyCertificate } from "@/services/verificationService";
import { HumanVerification, newChallenge, type Challenge } from "./HumanVerification";

type Errors = Partial<Record<"number" | "date" | "captcha", string>>;
type Status = "idle" | "loading" | "success" | "not_found" | "rate_limited";

const toIso = (value: string) => {
  const match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const [, dd, mm, yyyy] = match;
  const day = Number(dd);
  const month = Number(mm);
  const year = Number(yyyy);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return `${yyyy}-${mm}-${dd}`;
};

export function VerificationForm() {
  const navigate = useNavigate();
  const picker = useRef<HTMLInputElement>(null);
  const [number, setNumber] = useState("");
  const [dateText, setDateText] = useState("");
  const [answer, setAnswer] = useState("");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => setChallenge(newChallenge()), []);

  const refresh = () => {
    setChallenge(newChallenge());
    setAnswer("");
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    const num = number.trim();
    const iso = toIso(dateText);
    if (!num) next.number = "Saisissez le numéro d’attestation.";
    else if (num.length > 48 || !/^[A-Za-z0-9-]+$/.test(num)) next.number = "Utilisez uniquement des lettres, des chiffres et des tirets.";
    if (!dateText.trim()) next.date = "Saisissez la date de la session.";
    else if (!iso) next.date = "La date doit être au format jj/mm/aaaa.";
    if (!answer) next.captcha = "Saisissez la somme des deux nombres.";
    else if (challenge && Number(answer) !== challenge.a + challenge.b) next.captcha = "La somme est incorrecte.";
    setErrors(next);
    if (next.captcha && answer) refresh();
    if (Object.keys(next).length || !iso) return;

    setStatus("loading");
    const res = await verifyCertificate({ certificateNumber: num, sessionDate: iso });
    if (res.verified) {
      setStatus("success");
      const refToKeep = resolveScanRef() || num;
      saveScanRef(refToKeep);
      setTimeout(
        () =>
          navigate({
            to: "/verify/$verificationId",
            params: { verificationId: res.verificationId },
            search: { ref: refToKeep },
          }),
        200,
      );
    } else {
      setStatus(res.reason);
      refresh();
    }
  }

  const busy = status === "loading" || status === "success";

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4 max-w-[560px] font-[Arial,Helvetica,sans-serif]">
      <div className="rounded-[2px] border border-[#cfd6dc]">
        <div className="border-b border-[#e3e8ec] bg-[#f7f8f9] px-3 py-2 text-[13px] text-[#3a4650]">
          Renseignez les informations présentes sur l’attestation
        </div>

        <div className="space-y-3 px-4 py-4">
          <Field label="Numéro d’attestation" htmlFor="cert" error={errors.number}>
            <input
              id="cert"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              autoComplete="off"
              maxLength={48}
              aria-invalid={!!errors.number}
              className={inputCls(!!errors.number, "w-[230px]")}
            />
          </Field>

          <Field label="Date de la session" htmlFor="date" error={errors.date}>
            <div className="relative w-[168px]">
              <input
                id="date"
                value={dateText}
                onChange={(e) => setDateText(e.target.value)}
                placeholder="dd/mm/yyyy"
                inputMode="numeric"
                aria-invalid={!!errors.date}
                className={inputCls(!!errors.date, "w-full pr-9")}
              />
              <button
                type="button"
                className="absolute right-1.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center text-[#5c6b76]"
                aria-label="Ouvrir le calendrier"
                onClick={() => picker.current?.showPicker()}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
                  <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
                </svg>
              </button>
              <input
                ref={picker}
                type="date"
                tabIndex={-1}
                className="pointer-events-none absolute h-0 w-0 opacity-0"
                onChange={(e) => {
                  const [y, m, d] = e.target.value.split("-");
                  if (y && m && d) setDateText(`${d}/${m}/${y}`);
                }}
              />
            </div>
          </Field>

          <div className="rounded-[4px] border border-[#b9d4ee] bg-[#d9ebfa] px-3 py-3 text-[13.5px] leading-snug text-[#24384a]">
            <p className="flex gap-2 font-bold text-[#1a3f66]">
              <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-[#1a3f66] text-[11px] leading-none">?</span>
              Où trouver le numéro d’attestation et la date de session ?
            </p>
            <p className="mt-2">
              Attention, pour le numéro d’attestation, vous ne devez saisir que la partie qui se trouve après le dernier tiret (« - »).
            </p>
            <ul className="mt-2 list-disc pl-5 text-[#1a66c2]">
              <li>
                <a href="/help" className="hover:underline">
                  Cliquez ici pour voir où se trouve le numéro d’attestation et la date de session sur l’attestation dématérialisée
                </a>
              </li>
            </ul>
          </div>

          <HumanVerification challenge={challenge} value={answer} onChange={setAnswer} onRefresh={refresh} error={errors.captcha} />

          {status === "not_found" && (
            <p role="status" className="text-[13.5px] text-[#c0392b]">
              Aucune attestation ne correspond à ces informations.
            </p>
          )}
          {status === "rate_limited" && (
            <p role="status" className="text-[13.5px] text-[#c0392b]">
              Trop de tentatives. Patientez une minute avant de réessayer.
            </p>
          )}

          <button
            type="submit"
            disabled={busy || !challenge}
            className="inline-flex h-9 items-center gap-2 rounded-[3px] bg-[#1f6fbe] px-3 text-[14px] font-medium text-white hover:bg-[#185fa5] disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Rechercher l’attestation
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="grid items-center gap-3 sm:grid-cols-[210px_1fr]">
        <label htmlFor={htmlFor} className="text-[14px] font-bold text-[#222]">
          {label}
        </label>
        {children}
      </div>
      {error && (
        <p role="alert" className="mt-1 flex items-center gap-1 text-[13px] text-[#c0392b] sm:pl-[222px]">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (err: boolean, width: string) =>
  `h-9 ${width} rounded-[3px] border bg-white px-3 text-[14px] text-[#222] outline-none placeholder:text-[#9aa3ab] focus:border-[#0d6cb5] ${err ? "border-[#c0392b]" : "border-[#cfd5db]"}`;
