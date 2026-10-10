import { Link } from "@tanstack/react-router";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr] lg:px-8">
        <div className="flex items-start gap-3">
          <LogoMark />
          <div>
            <p className="font-display font-bold">CertiVerify</p>
            <p className="text-sm text-muted-foreground">Credential Verification Platform</p>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Independent verification portal — verify credentials issued by this organization.
            </p>
          </div>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-sm md:justify-end">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Verification</Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground">Privacy</Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground">Terms</Link>
          <Link to="/help" className="text-muted-foreground hover:text-foreground">Help</Link>
          <Link to="/help" className="text-muted-foreground hover:text-foreground">Contact</Link>
        </nav>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between lg:px-8">
          <p>© 2026 CertiVerify. All rights reserved.</p>
          <p>Independent credential verification platform.</p>
        </div>
      </div>
    </footer>
  );
}
