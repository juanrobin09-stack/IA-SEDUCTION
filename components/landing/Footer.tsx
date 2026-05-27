import Link from "next/link";
import { Flame } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-accent-red rounded-lg flex items-center justify-center">
            <Flame className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold">DRAGUE<span className="text-accent-red">.ME</span></span>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
          <Link href="/privacy" className="hover:text-text-secondary transition-colors">Confidentialité</Link>
          <Link href="/terms" className="hover:text-text-secondary transition-colors">CGU</Link>
          <Link href="/contact" className="hover:text-text-secondary transition-colors">Contact</Link>
        </div>

        <p className="text-xs text-text-muted">© 2026 DRAGUE.ME. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
