"use client";

import { motion } from "framer-motion";
import { MessageSquare, BarChart2, User, Zap, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: MessageSquare,
    tag: "Core",
    title: "Chat IA Coach",
    description: "Ton coach séduction dispo 24/7. Analyse de situation, conseils psychologiques, réponses prêtes en 3 secondes.",
    detail: "Propulsé par GPT-4o",
    color: "text-accent-red",
    bg: "from-accent-red/15 to-accent-red/5",
    border: "border-accent-red/20 hover:border-accent-red/40",
    glow: "hover:shadow-[0_0_40px_rgba(255,0,51,0.12)]",
    big: true,
  },
  {
    icon: BarChart2,
    tag: "Analyse",
    title: "Score d'attraction",
    description: "Colle ta conv. L'IA la décortique et te donne un score + le message parfait à envoyer.",
    detail: "Score 0-10 + erreurs détectées",
    color: "text-violet-400",
    bg: "from-violet-500/15 to-violet-500/5",
    border: "border-violet-500/20 hover:border-violet-500/40",
    glow: "hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]",
  },
  {
    icon: User,
    tag: "Profil",
    title: "Optimiseur Tinder",
    description: "Bio réécrite, photos optimisées, mots-clés d'attraction. Jusqu'à 3x plus de matchs.",
    detail: "Tinder • Bumble • Hinge • Insta",
    color: "text-cyan-400",
    bg: "from-cyan-500/15 to-cyan-500/5",
    border: "border-cyan-500/20 hover:border-cyan-500/40",
    glow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.12)]",
  },
  {
    icon: Zap,
    tag: "Générateur",
    title: "Messages clé en main",
    description: "6 situations × 5 styles. Du premier message jusqu'au rendez-vous. Copier-coller direct.",
    detail: "Drôle • Alpha • Mystérieux • Confiant",
    color: "text-amber-400",
    bg: "from-amber-500/15 to-amber-500/5",
    border: "border-amber-500/20 hover:border-amber-500/40",
    glow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.12)]",
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent-red text-xs font-bold uppercase tracking-[0.2em] mb-3">Arsenal complet</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Tout ce qu'il faut pour gagner
          </h2>
          <p className="text-white/40 max-w-md mx-auto text-sm">
            Du premier message au rendez-vous. Chaque étape couverte.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl border bg-[#0A0A0A] p-7 overflow-hidden group transition-all duration-300 cursor-default ${f.border} ${f.glow}`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Scan line on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scan-line" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-11 h-11 rounded-2xl bg-[#111] border border-white/8 flex items-center justify-center`}>
                    <f.icon className={`w-5 h-5 ${f.color}`} />
                  </div>
                  <span className="text-xs font-semibold text-white/25 border border-white/8 px-2.5 py-1 rounded-full">
                    {f.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed mb-4">{f.description}</p>

                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${f.color} opacity-70`}>{f.detail}</span>
                  <ArrowRight className={`w-4 h-4 ${f.color} opacity-0 group-hover:opacity-70 transition-all group-hover:translate-x-1`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
