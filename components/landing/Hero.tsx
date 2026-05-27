"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Zap, TrendingUp, Users, MessageSquare } from "lucide-react";

const FLOATING_BUBBLES = [
  { text: "Elle répond en 3 min 🔥", pos: "top-[20%] left-[5%]", delay: 0 },
  { text: "+73% de matchs cette semaine", pos: "top-[35%] right-[4%]", delay: 0.8 },
  { text: "RDV vendredi 🎯", pos: "bottom-[30%] left-[3%]", delay: 1.6 },
  { text: "Ghost résolu en 1 message", pos: "bottom-[20%] right-[5%]", delay: 2.4 },
];

const STATS = [
  { value: "50K+", label: "Utilisateurs", icon: Users },
  { value: "87%", label: "Taux de réponse", icon: TrendingUp, red: true },
  { value: "2M+", label: "Messages générés", icon: MessageSquare },
  { value: "4.9★", label: "Note moyenne", icon: Sparkles },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Deep background */}
      <div className="absolute inset-0 bg-[#030303]" />

      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="animate-orb-1 absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-accent-red/8 rounded-full blur-[160px]" />
        <div className="animate-orb-2 absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/6 rounded-full blur-[140px]" />
        <div className="absolute top-3/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/4 rounded-full blur-[120px]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Radial fade center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_40%,#030303_100%)]" />
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-red/30 to-transparent" />

      {/* Floating bubbles — desktop only */}
      {FLOATING_BUBBLES.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: b.delay + 1, duration: 0.5 }}
          className={`absolute hidden xl:flex ${b.pos} glass border border-white/10 px-4 py-2.5 rounded-2xl items-center gap-2 z-10 float-animation`}
          style={{ animationDelay: `${b.delay}s` }}
        >
          <span className="text-xs font-medium text-white/80">{b.text}</span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="glass border border-white/10 px-5 py-2 rounded-full inline-flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-white/50">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              1 247 actifs maintenant
            </span>
            <span className="w-px h-3 bg-white/15" />
            <span className="flex items-center gap-1 text-xs text-accent-red font-semibold">
              <Zap className="w-3 h-3" />
              GPT-4o
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="font-black tracking-tighter leading-[0.9] mb-4">
            <span className="block text-5xl sm:text-7xl lg:text-8xl text-white">Séduire,</span>
            <span className="block text-5xl sm:text-7xl lg:text-8xl text-gradient">c'est une science.</span>
            <span className="block text-3xl sm:text-5xl lg:text-6xl text-white/30 font-bold mt-2">
              On l'a maîtrisée pour toi.
            </span>
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-base sm:text-xl text-white/45 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          L'IA qui analyse tes conversations, génère les messages parfaits
          et transforme chaque interaction en opportunité.{" "}
          <span className="text-white/70 font-medium">Résultats en moins de 60 secondes.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <Link href="/signup">
            <Button
              size="lg"
              icon={<Sparkles className="w-4 h-4" />}
              className="shimmer min-w-[220px] text-base font-bold animate-pulse-glow"
            >
              Essai gratuit — 0€
            </Button>
          </Link>
          <a href="#demo">
            <Button
              variant="secondary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              className="min-w-[180px]"
            >
              Voir la démo
            </Button>
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="glass border-gradient-subtle rounded-2xl p-4 text-center card-hover cursor-default"
            >
              <stat.icon className={`w-4 h-4 mx-auto mb-1.5 ${stat.red ? "text-accent-red" : "text-white/40"}`} />
              <div className={`text-2xl font-black mb-0.5 ${stat.red ? "text-gradient" : "text-white"}`}>
                {stat.value}
              </div>
              <div className="text-xs text-white/35">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />
    </section>
  );
}
