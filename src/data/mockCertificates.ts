import portrait from "@/assets/portrait-demo.jpg";
import type { PublicCertificate } from "@/types/certificate";

/** MOCK DEMO records only — fictional identities. */
export type MockRecord = PublicCertificate & { publicToken: string };

export const mockCertificates: MockRecord[] = [
  {
    publicToken: "vf_8Kq2xTm4Lp9Za1",
    certificateNumber: "CRT-2026-002831",
    candidateNumber: "2634301",
    sessionDate: "2025-04-26",
    firstName: "Daniel",
    lastName: "Moreau",
    credentialName: "Language Proficiency Assessment",
    issuer: "CertiVerify Assessment Board",
    photo: portrait,
    status: "valid",
    assessments: [
      { name: "Listening comprehension", score: "405", level: "B2" },
      { name: "Reading comprehension", score: "525", level: "C1" },
      { name: "Written expression", score: "13/20", level: "B2" },
      { name: "Oral expression", score: "13/20", level: "B2" },
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
    issuer: "CertiVerify Assessment Board",
    status: "valid",
    assessments: [
      { name: "Listening comprehension", score: "560", level: "C1" },
      { name: "Reading comprehension", score: "612", level: "C2" },
      { name: "Written expression", score: "16/20", level: "C1" },
      { name: "Oral expression", score: "15/20", level: "C1" },
    ],
  },
];
