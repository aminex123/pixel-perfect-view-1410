import { createFileRoute } from "@tanstack/react-router";
import { EyeOff, KeyRound, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About verification — CertiVerify" },
      { name: "description", content: "How CertiVerify confirms credentials while protecting holder privacy." },
      { property: "og:title", content: "About verification — CertiVerify" },
      { property: "og:description", content: "How CertiVerify confirms credentials while protecting holder privacy." },
    ],
  }),
  component: About,
});

const items = [
  { icon: ShieldCheck, t: "Issuer records only", d: "This portal verifies only credentials issued by the organization operating it." },
  { icon: KeyRound, t: "Public verification IDs", d: "Results use random public tokens — internal record IDs are never exposed." },
  { icon: EyeOff, t: "Minimal disclosure", d: "Only fields configured as publicly verifiable are shown." },
];

function About() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <h1 className="text-4xl font-extrabold">About verification</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Independent verification portal — verify credentials issued by this organization.</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {items.map(({ icon: I, t, d }) => (
          <div key={t} className="rounded-3xl border bg-card p-6 shadow-card">
            <I className="h-6 w-6 text-primary" />
            <h2 className="mt-4 font-bold">{t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
