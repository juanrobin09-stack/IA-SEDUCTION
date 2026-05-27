import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Demo } from "@/components/landing/Demo";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      <Hero />
      <Features />
      <Demo />
      <Testimonials />
      <Pricing />

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-strong rounded-3xl p-10 glow-red">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Prêt à changer de niveau ?
            </h2>
            <p className="text-text-secondary mb-8">
              5 minutes pour setup. Résultats dès le premier message.
            </p>
            <Link href="/signup">
              <Button size="lg" icon={<Sparkles className="w-4 h-4" />} className="min-w-[240px]">
                Commencer gratuitement
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
