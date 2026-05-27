"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Alex M.", age: 24, city: "Paris", avatar: "AM",
    text: "J'avais un ghost depuis 3 jours. Message suggéré → elle a répondu en 10 min. Date vendredi.",
    result: "Date en 10 min", stars: 5
  },
  {
    name: "Thomas R.", age: 28, city: "Lyon", avatar: "TR",
    text: "L'analyse m'a montré que je posais trop de questions. Correction immédiate. Ça a tout changé.",
    result: "+73% de matchs", stars: 5
  },
  {
    name: "Lucas D.", age: 22, city: "Bordeaux", avatar: "LD",
    text: "Taux de réponse passé de 20% à 67% sur Tinder en 2 semaines avec le générateur de messages.",
    result: "67% taux réponse", stars: 5
  },
  {
    name: "Nathan K.", age: 31, city: "Marseille", avatar: "NK",
    text: "Bio réécrite par l'IA → 3x plus de matchs la semaine suivante. Résultat immédiat et mesurable.",
    result: "3x plus de matchs", stars: 5
  },
  {
    name: "Julien F.", age: 26, city: "Lille", avatar: "JF",
    text: "Je pensais que c'était du bullshit. Maintenant je montre les screenshots à mes potes. Insane.",
    result: "Converti après 1 essai", stars: 5
  },
  {
    name: "Maxime V.", age: 29, city: "Toulouse", avatar: "MV",
    text: "Apprendre à créer de la tension au lieu de chercher l'approbation. Game changer littéral.",
    result: "Mindset transformé", stars: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(124,58,237,0.04),transparent)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-accent-red text-xs font-bold uppercase tracking-[0.2em] mb-3">Preuves réelles</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Ils ont transformé leur jeu
          </h2>
          <p className="text-white/35 text-sm">50 000+ utilisateurs. Des résultats mesurables.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative rounded-3xl border border-white/6 bg-[#0A0A0A] p-6 flex flex-col gap-4 card-hover overflow-hidden"
            >
              {/* Subtle corner glow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-red/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <Quote className="w-5 h-5 text-accent-red/30 flex-shrink-0" />

              <p className="text-sm text-white/55 leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-accent-red/15 border border-accent-red/25 flex items-center justify-center text-xs font-bold text-accent-red">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white/80">{t.name}, {t.age}</p>
                    <p className="text-[10px] text-white/25">{t.city}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-2.5 h-2.5 fill-accent-red text-accent-red" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-accent-red/70">{t.result}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
