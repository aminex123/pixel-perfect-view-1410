export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type Assessment = {
  name: string;
  score: string;
  level: CefrLevel;
};

/** Only fields intentionally configured as publicly verifiable. */
export type PublicCertificate = {
  certificateNumber: string;
  candidateNumber: string;
  sessionDate: string; // ISO yyyy-mm-dd
  firstName: string;
  lastName: string;
  credentialName: string;
  issuer: string;
  photo?: string;
  status: "valid" | "expired" | "revoked";
  assessments: Assessment[];
};

export type VerifyRequest = {
  certificateNumber: string;
  sessionDate: string;
};

export type VerifyResponse =
  | { verified: true; verificationId: string; certificate: PublicCertificate }
  | { verified: false; reason: "not_found" | "rate_limited" };
