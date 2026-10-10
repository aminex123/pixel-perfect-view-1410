import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & contact — CertiVerify" },
      { name: "description", content: "Answers to common questions about verifying a credential, and how to contact support." },
      { property: "og:title", content: "Help & contact — CertiVerify" },
      { property: "og:description", content: "Common questions about credential verification and support contact." },
    ],
  }),
  component: Help,
});

const faqs = [
  ["Where do I find the certificate number?", "The certificate number and session date are printed on the credential provided by the issuing organization."],
  ["What if my certificate isn't found?", "Double-check the number and session date. A missing match does not mean a credential is invalid — contact support if the issue persists."],
  ["Is my data shared?", "Only fields the issuer has configured as publicly verifiable are shown on a result."],
];

function Help() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-4xl font-extrabold">Help</h1>
      <p className="mt-3 text-muted-foreground">Everything you need to verify a credential.</p>
      <div className="mt-10 space-y-4">
        {faqs.map(([q, a]) => (
          <details key={q} className="group rounded-2xl border bg-card p-5 shadow-card">
            <summary className="cursor-pointer list-none font-semibold">{q}</summary>
            <p className="mt-3 text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
      <div className="mt-10 flex items-center gap-4 rounded-3xl border bg-electric-soft p-6">
        <Mail className="h-6 w-6 text-primary" />
        <div>
          <p className="font-semibold">Contact support</p>
          <p className="text-sm text-muted-foreground">support@certiverify.example</p>
        </div>
      </div>
    </div>
  );
}
