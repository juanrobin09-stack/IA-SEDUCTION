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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong py-3" : "py-5"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-accent-red rounded-lg flex items-center justify-center animate-pulse-glow">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            DRAGUE<span className="text-accent-red">.ME</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Fonctionnalités
          </a>
          <a href="#demo" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Démo
          </a>
          <a href="#pricing" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Tarifs
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Se connecter</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Essai gratuit</Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-text-secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-border px-4 py-4 flex flex-col gap-4">
          <a href="#features" className="text-sm text-text-secondary py-2" onClick={() => setMobileOpen(false)}>Fonctionnalités</a>
          <a href="#demo" className="text-sm text-text-secondary py-2" onClick={() => setMobileOpen(false)}>Démo</a>
          <a href="#pricing" className="text-sm text-text-secondary py-2" onClick={() => setMobileOpen(false)}>Tarifs</a>
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            <Link href="/login"><Button variant="outline" className="w-full">Se connecter</Button></Link>
            <Link href="/signup"><Button className="w-full">Essai gratuit</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}
