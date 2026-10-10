import { Link } from "@tanstack/react-router";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import { LogoMark } from "./Logo";

const nav = [
  { to: "/", label: "Verify" },
  { to: "/about", label: "About verification" },
  { to: "/help", label: "Help" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-navy-foreground/10 bg-navy/85 text-navy-foreground backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-3 rounded-lg">
          <LogoMark />
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-bold tracking-tight">CertiVerify</span>
            <span className="block text-[11px] text-navy-muted">Credential Verification Platform</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="rounded-lg px-3.5 py-2 text-sm text-navy-muted transition-colors hover:bg-navy-foreground/5 hover:text-navy-foreground data-[status=active]:text-navy-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <label className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm text-navy-muted hover:text-navy-foreground">
            <Globe className="h-4 w-4" aria-hidden />
            <span className="sr-only">Language</span>
            <select className="cursor-pointer bg-transparent outline-none [&>option]:text-foreground" defaultValue="en">
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="ar">AR</option>
            </select>
          </label>
          <Link
            to="/help"
            className="rounded-xl border border-navy-foreground/15 bg-navy-foreground/5 px-4 py-2 text-sm font-medium transition hover:bg-navy-foreground/10"
          >
            Contact
          </Link>
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-xl hover:bg-navy-foreground/10 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-navy-foreground/10 px-5 py-3 md:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="flex min-h-11 items-center rounded-lg px-3 text-sm text-navy-muted hover:bg-navy-foreground/5 hover:text-navy-foreground">
              {n.label}
            </Link>
          ))}
          <Link to="/help" onClick={() => setOpen(false)} className="mt-2 flex min-h-11 items-center justify-center rounded-xl bg-gradient-primary text-sm font-medium text-primary-foreground">
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
