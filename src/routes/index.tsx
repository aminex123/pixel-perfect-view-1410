import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageFrame } from "@/components/PageFrame";
import { VerificationForm } from "@/components/VerificationForm";
import { saveScanRef } from "@/lib/scanRef";
import { z } from "zod";

const searchSchema = z.object({
  ref: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Consultation d’une attestation — CertiVerify" },
      { name: "description", content: "Consultez et vérifiez une attestation avec CertiVerify." },
      { property: "og:title", content: "Consultation d’une attestation — CertiVerify" },
      { property: "og:description", content: "Consultez et vérifiez une attestation avec CertiVerify." },
    ],
  }),
  component: Index,
});

function Index() {
  const { ref: refFromUrl } = Route.useSearch();
  const [open, setOpen] = useState(false);

  // Quietly keep ?ref= for the scan flow — do not open the form automatically.
  useEffect(() => {
    if (refFromUrl?.trim()) saveScanRef(refFromUrl);
  }, [refFromUrl]);

  return (
    <PageFrame>
      {open ? (
        <>
          <h1 className="mt-6 font-[Arial,Helvetica,sans-serif] text-[21px] font-medium tracking-normal text-[#1d4e7a]">
            Consultation et vérification des résultats d’une attestation
          </h1>
          <VerificationForm />
        </>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 inline-flex h-9 items-center rounded-[3px] bg-[#1f6fbe] px-3 text-[14px] text-white hover:bg-[#185fa5]"
        >
          Pour contrôler l’authenticité de l’attestation cliquez-ici.
        </button>
      )}
    </PageFrame>
  );
}
