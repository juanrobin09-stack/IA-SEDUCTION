import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Demo } from "@/components/landing/Demo";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Flame } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <HowItWorks />
      <Demo />
      <Testimonials />
      <Pricing />

      {/* Final CTA */}
      <section className="py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,0,51,0.08),transparent)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-red/30 to-transparent" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 bg-accent-red rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">
            <span className="text-white">Prêt à changer</span>
            <br />
            <span className="text-gradient">de niveau ?</span>
          </h2>
          <p className="text-white/40 mb-10 text-lg">
            50 000 hommes ont déjà transformé leur jeu.
          </p>
          <Link href="/signup">
            <Button size="lg" className="shimmer min-w-[260px] text-base font-bold animate-pulse-glow">
              Commencer gratuitement — 0€
            </Button>
          </Link>
          <p className="text-white/20 text-xs mt-5">Aucune CB requise · Résultats en 60 secondes</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
