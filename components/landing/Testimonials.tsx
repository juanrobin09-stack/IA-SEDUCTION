"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Alex M.",
    age: 24,
    city: "Paris",
    avatar: "AM",
    text: "J'avais un ghost depuis 3 jours. J'ai utilisé le message suggéré et elle m'a répondu en 10 minutes. On a un date vendredi.",
    rating: 5,
    highlight: "Résultats en 10 minutes"
  },
  {
    name: "Thomas R.",
    age: 28,
    city: "Lyon",
    avatar: "TR",
    text: "L'analyse de conversation est dingue. Elle m'a montré que je posais trop de questions et que j'étais trop disponible. Ça a tout changé.",
    rating: 5,
    highlight: "+73% de matchs en 2 semaines"
  },
  {
    name: "Lucas D.",
    age: 22,
    city: "Bordeaux",
    avatar: "LD",
    text: "Le générateur de premier message est insane. Mon taux de réponse est passé de 20% à 67% sur Tinder.",
    rating: 5,
    highlight: "67% de taux de réponse"
  },
  {
    name: "Nathan K.",
    age: 31,
    city: "Marseille",
    avatar: "NK",
    text: "J'ai optimisé ma bio Tinder avec l'IA. 3x plus de matchs la semaine suivante. Le ROI est réel.",
    rating: 5,
    highlight: "3x plus de matchs"
  },
  {
    name: "Julien F.",
    age: 26,
    city: "Lille",
    avatar: "JF",
    text: "Je pensais que c'était du bullshit. Maintenant je montre les screenshots à mes potes. C'est littéralement le meilleur investissement de ma vie sociale.",
    rating: 5,
    highlight: "Converti après 1 essai"
  },
  {
    name: "Maxime V.",
    age: 29,
    city: "Toulouse",
    avatar: "MV",
    text: "Le coach m'a appris à créer de la tension au lieu de chercher l'approbation. Game changer au sens littéral.",
    rating: 5,
    highlight: "Mindset transformé"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent-red text-sm font-semibold uppercase tracking-widest mb-3">Témoignages</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Ils ont transformé leur jeu
          </h2>
          <p className="text-text-secondary">50 000+ utilisateurs. Des résultats mesurables.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass-strong rounded-2xl p-5 flex flex-col gap-4"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-accent-red text-accent-red" />
                ))}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-accent-red/20 border border-accent-red/30 rounded-full flex items-center justify-center text-xs font-bold text-accent-red">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold">{t.name}, {t.age}</p>
                    <p className="text-xs text-text-muted">{t.city}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-accent-red bg-accent-red-glow px-2 py-0.5 rounded-full">
                  {t.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
