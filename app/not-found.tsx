import Link from "next/link";
import { Flame } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-accent-red/10 border border-accent-red/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Flame className="w-8 h-8 text-accent-red" />
        </div>
        <p className="text-accent-red font-bold text-sm uppercase tracking-widest mb-3">404</p>
        <h1 className="text-3xl font-black mb-3 text-white">Page introuvable</h1>
        <p className="text-white/40 text-sm mb-8">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-red text-white rounded-xl font-semibold text-sm hover:bg-accent-red/90 transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
