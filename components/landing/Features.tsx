"use client";

import { motion } from "framer-motion";
import { MessageSquare, BarChart2, User, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "Chat IA Coach",
    description: "Parle à ton coach IA 24/7. Analyse tes situations, reçois des conseils psychologiques et des réponses prêtes à copier.",
    color: "text-accent-red",
    bg: "bg-accent-red-glow"
  },
  {
    icon: BarChart2,
    title: "Analyse de conversation",
    description: "Colle ta conversation. L'IA la décortique : score d'attraction, erreurs détectées, message optimisé conseillé.",
    color: "text-violet-400",
    bg: "bg-violet-900/20"
  },
  {
    icon: User,
    title: "Optimiseur de profil",
    description: "Bio Tinder, photos, description Insta. L'IA note et réécrit tout pour maximiser tes matchs.",
    color: "text-blue-400",
    bg: "bg-blue-900/20"
  },
  {
    icon: Zap,
    title: "Générateur de messages",
    description: "Premier message, relance, flirt, date. 5 styles différents (alpha, drôle, mystérieux...) pour chaque situation.",
    color: "text-amber-400",
    bg: "bg-amber-900/20"
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent-red text-sm font-semibold uppercase tracking-widest mb-3">Fonctionnalités</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Tout ce dont tu as besoin
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Du premier message au rendez-vous. DRAGUE.ME couvre chaque étape de la séduction moderne.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong rounded-2xl p-6 group hover:border-white/10 transition-all duration-300 cursor-default"
            >
              <div className={`w-11 h-11 ${feature.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
