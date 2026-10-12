import type { PublicCertificate } from "@/types/certificate";

const MONTHS_FR = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

const fmtDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

const fmtDateLong = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const month = MONTHS_FR[m - 1] ?? "";
  return `${d} ${month.charAt(0).toUpperCase()}${month.slice(1)} ${y}`;
};

const LABELS: Record<string, string> = {
  "Listening comprehension": "Compréhension orale",
  "Reading comprehension": "Compréhension écrite",
  "Written expression": "Expression écrite",
  "Oral expression": "Expression orale",
};

export function VerificationResult({ cert }: { cert: PublicCertificate; verificationId: string }) {
  return (
    <div className="mt-5 font-[Arial,Helvetica,sans-serif]">
      <h1 className="font-[Arial,Helvetica,sans-serif] text-[21px] font-medium tracking-normal text-[#1d4e7a]">
        Consultation et vérification des résultats du TCF
      </h1>

      <div className="mt-4 border border-[#f0e2a8] bg-[#fff6d8] px-4 py-3 text-[14px] leading-snug text-[#3a3420]">
        <p>
          Résultats pour le «{" "}
          <span className="text-[15.5px] font-bold">TCF Québec - Test de conaissance du français pour le Québec</span> » du{" "}
          <span className="font-bold">{fmtDate(cert.sessionDate)}</span>{" "}
          pour le candidat n°
          <span className="font-bold">{cert.candidateNumber}</span>.
        </p>
        <p>
          Nom : <span className="font-bold uppercase">{cert.lastName}</span>
        </p>
        <p>
          Prénom : <span className="font-bold uppercase">{cert.firstName}</span>
        </p>
       
      </div>

      <div className="mt-4 flex w-full flex-col gap-5">
        <div className="w-full border border-black bg-[#f3f4f5]">
          {cert.photo ? (
            <img src={cert.photo} alt="" className="h-[280px] w-full object-cover object-center sm:h-[320px]" />
          ) : (
            <div className="grid h-[280px] w-full place-items-center text-[12px] text-[#6b7780] sm:h-[320px]">Photo</div>
          )}
        </div>

        <table className="w-full border-collapse border border-black text-left text-[17px] text-[#222] sm:text-[18px]">
          <thead>
            <tr className="border-b border-black">
              <th className="border-r border-black px-3 py-3.5 font-bold sm:px-4 sm:py-4">Épreuve</th>
              <th className="border-r border-black px-3 py-3.5 font-bold sm:px-4 sm:py-4">Score/Note</th>
              <th className="px-3 py-3.5 font-bold sm:px-4 sm:py-4">Niveau CECRL</th>
            </tr>
          </thead>
          <tbody>
            {cert.assessments.map((a) => (
              <tr key={a.name} className="border-b border-black last:border-b-0">
                <td className="border-r border-black px-3 py-3.5 sm:px-4 sm:py-4">{LABELS[a.name] ?? a.name}</td>
                <td className="border-r border-black px-3 py-3.5 text-[18px] font-bold sm:px-4 sm:py-4 sm:text-[20px]">
                  {a.score.replace("/20", "")}
                </td>
                <td className="px-3 py-3.5 text-[18px] font-bold sm:px-4 sm:py-4 sm:text-[20px]">{a.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
