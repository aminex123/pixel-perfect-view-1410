import { mockCertificates, type MockRecord } from "@/data/mockCertificates";
import type { PublicCertificate, VerifyRequest, VerifyResponse } from "@/types/certificate";

/**
 * Verification service. Currently backed by local mock data.
 * Replace the bodies with `fetch("/api/v1/certificates/verify", { method: "POST", ... })`
 * when the real backend exists. Client-side throttling here is UX only, not security.
 */

const normalize = (s: string) => s.trim().toUpperCase().replace(/\s+/g, "");

function toPublic({ publicToken: _t, ...rest }: MockRecord): PublicCertificate {
  return rest;
}

const attempts: number[] = [];
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 10;

export async function verifyCertificate(req: VerifyRequest): Promise<VerifyResponse> {
  const now = Date.now();
  while (attempts.length && now - attempts[0] > WINDOW_MS) attempts.shift();
  if (attempts.length >= MAX_ATTEMPTS) return { verified: false, reason: "rate_limited" };
  attempts.push(now);

  await new Promise((r) => setTimeout(r, 900));

  const input = normalize(req.certificateNumber);
  const record = mockCertificates.find((c) => {
    const num = normalize(c.certificateNumber);
    // Accept full number or the part after the last dash
    const tail = num.split("-").pop();
    return (input === num || input === tail || input === c.candidateNumber) && c.sessionDate === req.sessionDate;
  });

  if (!record) return { verified: false, reason: "not_found" };
  return { verified: true, verificationId: record.publicToken, certificate: toPublic(record) };
}

export function getVerificationById(verificationId: string): PublicCertificate | null {
  const record = mockCertificates.find((c) => c.publicToken === verificationId);
  return record ? toPublic(record) : null;
}
