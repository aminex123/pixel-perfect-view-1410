import { AlertCircle } from "lucide-react";

export type Challenge = { a: number; b: number };

const WORDS = [
  "",
  "Un",
  "Deux",
  "Trois",
  "Quatre",
  "Cinq",
  "Six",
  "Sept",
  "Huit",
  "Neuf",
  "Dix",
  "Onze",
  "Douze",
  "Treize",
  "Quatorze",
  "Quinze",
  "Seize",
];

export function newChallenge(): Challenge {
  return { a: Math.floor(Math.random() * 15) + 2, b: Math.floor(Math.random() * 15) + 2 };
}

type Props = {
  challenge: Challenge | null;
  value: string;
  onChange: (v: string) => void;
  onRefresh: () => void;
  error?: string | undefined;
};

export function HumanVerification({ challenge, value, onChange, error }: Props) {
  const left = challenge ? WORDS[challenge.a] : "…";
  const right = challenge ? WORDS[challenge.b] : "…";

  return (
    <div>
      <div
        className="relative inline-flex h-[52px] min-w-[210px] items-center justify-center overflow-hidden border border-[#c5c9c2] bg-[#eef1ea] px-3"
        aria-live="polite"
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          <line x1="8" y1="14" x2="190" y2="40" stroke="#9aa892" strokeWidth="1" />
          <line x1="20" y1="44" x2="200" y2="10" stroke="#b7c3ae" strokeWidth="1" />
          <line x1="40" y1="6" x2="160" y2="48" stroke="#8ea384" strokeWidth="0.6" />
          {Array.from({ length: 18 }, (_, i) => (
            <circle key={i} cx={12 + ((i * 37) % 190)} cy={8 + ((i * 13) % 36)} r={i % 3 === 0 ? 1.2 : 0.6} fill="#7d8c74" />
          ))}
        </svg>
        <p className="relative font-['Caveat',cursive] text-[34px] leading-none text-[#3e6b45]">
          <span className="inline-block -rotate-6">{left}</span>
          <span className="mx-2 inline-block font-sans text-[22px] text-[#6d7a66]">+</span>
          <span className="inline-block rotate-3">{right}</span>
        </p>
      </div>

      <p className="mb-1.5 mt-3 text-[13.5px] font-bold text-[#222]">Saisissez la somme des deux nombres en chiffres</p>
      <label htmlFor="captcha" className="sr-only">
        {challenge ? `Quelle est la somme de ${left} et ${right} ?` : "Somme en chiffres"}
      </label>
      <input
        id="captcha"
        inputMode="numeric"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))}
        placeholder="Somme en chiffres"
        aria-invalid={!!error}
        aria-describedby={error ? "captcha-error" : undefined}
        className={`h-9 w-full max-w-[340px] rounded-[3px] border bg-white px-3 text-[14px] text-[#222] outline-none placeholder:text-[#9aa3ab] focus:border-[#0d6cb5] ${error ? "border-[#c0392b]" : "border-[#cfd5db]"}`}
      />
      {error && (
        <p id="captcha-error" role="alert" className="mt-1.5 flex items-center gap-1 text-[13px] text-[#c0392b]">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}
