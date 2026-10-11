import portrait from "@/assets/portrait-badaoui.png";
import type { PublicCertificate } from "@/types/certificate";

/** MOCK DEMO records only — fictional identities. */
export type MockRecord = PublicCertificate & { publicToken: string };

export const mockCertificates: MockRecord[] = [
  {
    publicToken: "vf_8Kq2xTm4Lp9Za1",
    certificateNumber: "DGJFJTD7-2240-4D32-878D-FFFFCDH888YH",
    candidateNumber: "98765-093652-991880-7789",
    sessionDate: "2026-08-13",
    resultsDate: "2026-08-23",
    expiresAt: "2028-08-22",
    birthDate: "1981-03-21",
    centre: "Rabat, l’Institut Français de Rabat, Site de Rabat",
    firstName: "Chakib",
    lastName: "Badaoui",
    credentialName: "Attestation TCF",
    issuer: "France Éducation international",
    photo: portrait,
    status: "valid",
    assessments: [
      { name: "Listening comprehension", score: "524", level: "C1" },
      { name: "Reading comprehension", score: "502", level: "C1" },
      { name: "Oral expression", score: "15/20", level: "C1" },
      { name: "Written expression", score: "13/20", level: "B2" },
    ],
  },
  {
    publicToken: "vf_3Rb7Nw1Qc5Ye8D",
    certificateNumber: "CRT-2026-004417",
    candidateNumber: "2711958",
    sessionDate: "2026-03-14",
    firstName: "Amira",
    lastName: "Lindqvist",
    credentialName: "Language Proficiency Assessment",
    issuer: "France Éducation international",
    status: "valid",
    assessments: [
      { name: "Listening comprehension", score: "560", level: "C1" },
      { name: "Reading comprehension", score: "612", level: "C2" },
      { name: "Written expression", score: "16/20", level: "C1" },
      { name: "Oral expression", score: "15/20", level: "C1" },
    ],
  },
];
