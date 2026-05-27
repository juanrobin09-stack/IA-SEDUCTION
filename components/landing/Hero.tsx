"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-red/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent-red" />
          <span className="text-xs text-text-secondary font-medium">Propulsé par GPT-4o • 50 000+ utilisateurs</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tighter leading-none mb-6"
        >
          <span className="text-white">Ton coach IA</span>
          <br />
          <span className="text-gradient">séduction 24/7</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Analyse tes conversations, génère les messages parfaits, optimise ton profil Tinder.
          <br className="hidden sm:block" />
          <span className="text-white font-medium"> L'IA qui transforme tes interactions en rendez-vous.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/signup">
            <Button size="lg" icon={<Sparkles className="w-4 h-4" />} className="min-w-[220px]">
              Essai gratuit — 5 msg/jour
            </Button>
          </Link>
          <a href="#demo">
            <Button variant="secondary" size="lg" icon={<ArrowRight className="w-4 h-4" />} className="min-w-[200px]">
              Voir la démo
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted"
        >
          {[
            "Aucune CB requise",
            "Setup en 30 secondes",
            "Résultats immédiats"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-accent-red fill-accent-red" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
