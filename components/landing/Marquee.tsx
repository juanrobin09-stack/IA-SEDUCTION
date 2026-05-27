"use client";

const RESULTS = [
  "🔥 Thomas — ghost résolu en 1 message",
  "✅ Alex — premier RDV après 4 jours de silence",
  "📈 Lucas — +73% de matchs en 2 semaines",
  "💬 Nathan — taux de réponse passé à 67%",
  "🎯 Julien — date confirmée vendredi",
  "⚡ Maxime — bio Tinder réécrite → 3x plus de likes",
  "🔥 Antoine — la relance parfaite a fonctionné",
  "✅ Romain — analyse de conv → erreur corrigée",
  "📈 Kevin — premier message → réponse en 8 min",
  "💬 Pierre — conversation relancée après 1 semaine",
];

export function Marquee() {
  const items = [...RESULTS, ...RESULTS];

  return (
    <div className="relative py-5 overflow-hidden border-y border-white/5">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee whitespace-nowrap gap-0">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6">
            <span className="text-sm text-white/50 font-medium">{item}</span>
            <span className="w-1 h-1 bg-accent-red/40 rounded-full flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
