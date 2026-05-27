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
    badge: null,
    features: ["5 messages/jour", "Chat IA basique", "Générateur de messages (3/jour)"],
    cta: "Commencer gratuitement",
    href: "/signup",
    style: "border border-white/8 bg-[#0A0A0A]",
    btnVariant: "outline" as const,
  },
  {
    name: "Premium",
    price: 29,
    period: "/mois",
    icon: Sparkles,
    description: "Pour passer au niveau supérieur",
    badge: "LE PLUS POPULAIRE",
    features: [
      "Messages illimités",
      "Analyse de conversations",
      "Optimiseur de profil complet",
      "Générateur avancé (tous styles)",
      "Réponses prioritaires (<3s)",
      "Historique illimité",
    ],
    cta: "Passer Premium",
    href: "/signup?plan=premium",
    style: "border-gradient bg-[#0D0D0D] glow-red",
    btnVariant: "primary" as const,
  },
  {
    name: "VIP",
    price: 99,
    period: "/mois",
    icon: Crown,
    description: "Pour ceux qui veulent tout",
    badge: null,
    features: [
      "Tout Premium inclus",
      "Coaching humain 1h/mois",
      "Audit profil personnalisé",
      "Réponses personnalisées 24/7",
      "Support WhatsApp prioritaire",
    ],
    cta: "Rejoindre VIP",
    href: "/signup?plan=vip",
    style: "border border-white/8 bg-[#0A0A0A]",
    btnVariant: "outline" as const,
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,0,51,0.05),transparent)]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent-red text-xs font-bold uppercase tracking-[0.2em] mb-3">Tarifs</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Investis dans tes résultats
          </h2>
          <p className="text-white/40 text-sm">
            Moins cher qu'un café par jour. Plus efficace qu'un an de tentatives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-7 flex flex-col ${plan.style} ${i === 1 ? "md:scale-105 md:-mt-2 md:-mb-2" : ""} transition-all duration-300`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent-red text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-wider whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${i === 1 ? "bg-accent-red" : "bg-white/5"}`}>
                    <plan.icon className={`w-4.5 h-4.5 ${i === 1 ? "text-white" : "text-white/50"}`} />
                  </div>
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-5xl font-black ${i === 1 ? "text-gradient" : "text-white"}`}>
                    {plan.price}€
                  </span>
                  <span className="text-white/30 text-sm">{plan.period}</span>
                </div>
                <p className="text-white/35 text-xs">{plan.description}</p>
              </div>

              <ul className="space-y-3 flex-1 mb-7">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${i === 1 ? "bg-accent-red/20" : "bg-white/5"}`}>
                      <Check className={`w-2.5 h-2.5 ${i === 1 ? "text-accent-red" : "text-white/40"}`} />
                    </div>
                    <span className={i === 1 ? "text-white/70" : "text-white/35"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button variant={plan.btnVariant} className="w-full font-semibold">
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-white/20 text-xs mt-8">
          Annulation à tout moment · Paiement sécurisé Stripe · Aucun engagement
        </p>
      </div>
    </section>
  );
}
