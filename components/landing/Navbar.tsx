"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Flame, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled
        ? "glass-strong border-b border-white/5 py-3"
        : "bg-transparent py-5"
    )}>
      {/* Top red line when scrolled */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-red/50 to-transparent" />
      )}

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="w-8 h-8 bg-accent-red rounded-xl flex items-center justify-center animate-pulse-glow">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -inset-1 bg-accent-red/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-black text-lg tracking-tight">
            DRAGUE<span className="text-accent-red">.ME</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {["features", "demo", "pricing"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm text-white/40 hover:text-white transition-colors duration-200 capitalize"
            >
              {id === "features" ? "Fonctionnalités" : id === "demo" ? "Démo" : "Tarifs"}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-white/50 hover:text-white">
              Se connecter
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="shimmer font-semibold">
              Essai gratuit
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-white/40 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-white/6 px-4 py-5 flex flex-col gap-4">
          <a href="#features" className="text-sm text-white/50 py-2" onClick={() => setMobileOpen(false)}>Fonctionnalités</a>
          <a href="#demo" className="text-sm text-white/50 py-2" onClick={() => setMobileOpen(false)}>Démo</a>
          <a href="#pricing" className="text-sm text-white/50 py-2" onClick={() => setMobileOpen(false)}>Tarifs</a>
          <div className="flex flex-col gap-2 pt-3 border-t border-white/6">
            <Link href="/login"><Button variant="outline" className="w-full">Se connecter</Button></Link>
            <Link href="/signup"><Button className="w-full shimmer">Essai gratuit</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}
