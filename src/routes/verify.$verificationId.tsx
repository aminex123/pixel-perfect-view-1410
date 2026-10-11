import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SearchX } from "lucide-react";
import { useEffect } from "react";
import { PageFrame } from "@/components/PageFrame";
import { VerificationResult } from "@/components/VerificationResult";
import { resolveScanRef } from "@/lib/scanRef";
import { getVerificationById } from "@/services/verificationService";
import { z } from "zod";

const searchSchema = z.object({
  ref: z.string().optional(),
});

export const Route = createFileRoute("/verify/$verificationId")({
  validateSearch: searchSchema,
  loader: ({ params }) => {
    const cert = getVerificationById(params.verificationId);
    if (!cert) throw notFound();
    return { cert };
  },
  head: () => ({
    meta: [
      { title: "Verification result — CertiVerify" },
      { name: "description", content: "Credential verification result from CertiVerify." },
      { property: "og:title", content: "Verification result — CertiVerify" },
      { property: "og:description", content: "Credential verification result from CertiVerify." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResultPage,
  notFoundComponent: ResultNotFound,
});

function ResultPage() {
  const { cert } = Route.useLoaderData();
  const { verificationId } = Route.useParams();
  const { ref } = Route.useSearch();

  useEffect(() => {
    resolveScanRef(ref);
  }, [ref]);

  return (
    <PageFrame>
      <VerificationResult cert={cert} verificationId={verificationId} />
    </PageFrame>
  );
}

function ResultNotFound() {
  const { ref } = Route.useSearch();
  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-warning-soft text-warning">
        <SearchX className="h-6 w-6" />
      </span>
      <h1 className="mt-5 text-2xl font-bold">We couldn't verify this certificate.</h1>
      <p className="mt-2 text-muted-foreground">
        This verification link is not recognized. Check the certificate number and session date and try again.
      </p>
      <Link
        to="/"
        search={ref ? { ref } : undefined}
        className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-gradient-primary px-6 font-semibold text-primary-foreground shadow-glow"
      >
        Try again
      </Link>
    </div>
  );
}
