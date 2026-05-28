"use client";

import { motion } from "framer-motion";
import { MessageSquare, Zap, Calendar } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Décris ta situation",
    description: "Colle ton message, ta bio ou ta conversation. L'IA comprend le contexte en 2 secondes.",
    color: "text-accent-red",
    bg: "bg-accent-red/10 border-accent-red/20"
  },
  {
    number: "02",
    icon: Zap,
    title: "L'IA analyse et génère",
    description: "GPT-4o détecte les erreurs, score l'attraction et génère la réponse optimale.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20"
  },
  {
    number: "03",
    icon: Calendar,
    title: "Tu copies, tu envoies",
    description: "Un clic pour copier. La réponse est prête. Tu envoies. Elle répond.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20"
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(255,0,51,0.04),transparent)]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-accent-red text-xs font-bold uppercase tracking-[0.2em] mb-3">Processus</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Simple comme envoyer un SMS
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">3 étapes. 60 secondes. Des résultats réels.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              <div className="glass rounded-3xl p-7 border border-white/6 card-hover h-full">
                {/* Step number */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${step.bg} border flex items-center justify-center`}>
                    <step.icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  <span className="text-4xl font-black text-white/5 tabular-nums">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>

                {/* Arrow */}
                {i < 2 && (
                  <div className="hidden md:flex absolute -right-4 top-12 w-8 h-8 items-center justify-center z-10">
                    <div className="w-6 h-px bg-gradient-to-r from-white/20 to-white/5" />
                    <div className="w-0 h-0 border-l-4 border-l-white/20 border-y-2 border-y-transparent" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
