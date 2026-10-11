import type { ReactNode } from "react";

export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-[calc(100vh-140px)] bg-[#e6eef2] font-[Arial,Helvetica,sans-serif] tracking-normal">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-56 overflow-hidden" aria-hidden>
        <div className="absolute -left-28 top-6 h-80 w-80 rounded-full border border-white" />
        <div className="absolute -left-14 top-20 h-64 w-64 rounded-full border border-white/80" />
        <div className="absolute -left-20 top-36 h-44 w-44 rounded-full border border-[#d7e3ea]" />
      </div>

      <div className="relative bg-white">
        <div className="mx-auto w-full max-w-[980px] px-5 pb-3 pt-5 sm:px-8 sm:pt-6">
          <aside className="border border-[#f0e2a8] bg-[#fff6d8] px-4 py-3 text-[13.5px] leading-snug text-[#5c4a16]">
            <p className="font-bold">ATTENTION</p>
            <p className="mt-1">
            Il est impératif de bien vérifier que l'URL sur laquelle mène le QR Code est bien https://controle.france-education-international.fr/
            Veuillez porter une attention vigilante à ce qu'il n'y ait pas une lettre de moins ou de plus (par exemple : 2 "l" ou un "e" à la fin de "international").            </p>
          </aside>
          {children}
          <div className="mt-8 flex flex-wrap items-center justify-end gap-x-6 gap-y-1 pb-1 text-[12px] text-[#5c6b76]">
            <a href="/help" className="text-[#1a73c7] hover:underline">
              Accessibilité
            </a>
            <span>© France Éducation international</span>
          </div>
        </div>
      </div>
    </div>
  );
}
