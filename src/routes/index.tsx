import { createFileRoute } from "@tanstack/react-router";
import { VerificationHero } from "@/components/VerificationHero";
import { VerificationForm } from "@/components/VerificationForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Verify a certificate — CertiVerify" },
      { name: "description", content: "Confirm the authenticity and details of a credential in seconds with CertiVerify." },
      { property: "og:title", content: "Verify a certificate — CertiVerify" },
      { property: "og:description", content: "Confirm the authenticity and details of a credential in seconds." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <VerificationHero />
      <div className="relative -mt-28 mx-auto max-w-2xl px-5">
        <VerificationForm />
      </div>
    </>
  );
}
