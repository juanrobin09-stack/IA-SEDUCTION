"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Flame, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-accent-red/10 border border-accent-red/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Flame className="w-8 h-8 text-accent-red" />
        </div>
        <h1 className="text-3xl font-black mb-3 text-white">Oups, une erreur</h1>
        <p className="text-white/40 text-sm mb-8">
          Quelque chose s&apos;est mal passé. Essaie de recharger.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-red text-white rounded-xl font-semibold text-sm hover:bg-accent-red/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-white/60 rounded-xl font-semibold text-sm hover:text-white hover:border-white/20 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
