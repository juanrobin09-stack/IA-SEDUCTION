"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Crown, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const PLANS = [
  {
    name: "Gratuit",
    price: 0,
    period: "",
    icon: Zap,
    description: "Pour tester et voir les résultats",
    features: [
      "5 messages/jour",
      "Chat IA basique",
      "Générateur de messages (3/jour)",
      "Accès communauté"
    ],
    cta: "Commencer gratuitement",
    href: "/signup",
    variant: "outline" as const,
    popular: false
  },
  {
    name: "Premium",
    price: 29,
    period: "/mois",
    icon: Sparkles,
    description: "Pour passer au niveau supérieur",
    features: [
      "Messages illimités",
      "Analyse de conversations",
      "Optimiseur de profil complet",
      "Générateur avancé (tous styles)",
      "Réponses prioritaires (<3s)",
      "Historique illimité",
      "Export des analyses"
    ],
    cta: "Passer Premium",
    href: "/signup?plan=premium",
    variant: "primary" as const,
    popular: true
  },
  {
    name: "VIP",
    price: 99,
    period: "/mois",
    icon: Crown,
    description: "Pour ceux qui veulent le maximum",
    features: [
      "Tout Premium inclus",
      "Coaching humain 1h/mois",
      "Audit profil personnalisé",
      "Réponses personnalisées 24/7",
      "Accès Beta nouvelles features",
      "Support prioritaire WhatsApp"
    ],
    cta: "Rejoindre VIP",
    href: "/signup?plan=vip",
    variant: "outline" as const,
    popular: false
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent-red text-sm font-semibold uppercase tracking-widest mb-3">Tarifs</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Investis dans ton jeu
          </h2>
          <p className="text-text-secondary">
            Un café coûte 4€. Un abonnement DRAGUE.ME = des résultats mesurables.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.popular
                  ? "border-gradient glow-red bg-bg-card"
                  : "glass-strong"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-red text-white text-xs font-bold px-4 py-1 rounded-full">
                  POPULAIRE
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    plan.popular ? "bg-accent-red" : "bg-bg-hover"
                  }`}>
                    <plan.icon className={`w-4 h-4 ${plan.popular ? "text-white" : "text-text-secondary"}`} />
                  </div>
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold">{plan.price}€</span>
                  <span className="text-text-muted text-sm">{plan.period}</span>
                </div>
                <p className="text-text-muted text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-accent-red flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button variant={plan.variant} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-text-muted text-xs mt-8">
          Annulation à tout moment • Pas d'engagement • Paiement sécurisé Stripe
        </p>
      </div>
    </section>
  );
}
