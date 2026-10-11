import { Link } from "@tanstack/react-router";
import feiLogo from "@/assets/xxx.png";
import { readScanRef } from "@/lib/scanRef";

export function Header() {
  const ref = readScanRef();

  return (
    <header className="relative overflow-hidden bg-[#0d6cb5] text-white">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-72" aria-hidden>
        <div className="absolute -right-8 -top-20 h-56 w-56 rounded-full border-[16px] border-[#3ec6e0]/90" />
        <div className="absolute right-16 -top-6 h-36 w-36 rounded-full border-[12px] border-[#7fd4ea]/70" />
      </div>
      <div className="relative mx-auto flex h-[140px] max-w-[1100px] items-center gap-4 px-4 sm:px-6">
        <Link to="/" search={ref ? { ref } : undefined} className="flex items-center">
          <img
            src={feiLogo}
            alt="France Éducation international"
            className="h-[120px] w-auto max-w-[min(100%,520px)] object-contain object-left"
          />
        </Link>
      </div>
    </header>
  );
}
