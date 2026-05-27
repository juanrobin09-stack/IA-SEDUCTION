"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

const BENEFITS = [
  "5 messages gratuits dès maintenant",
  "Aucune CB requise",
  "Setup en 30 secondes"
];

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;
    if (password.length < 6) {
      toast.error("Mot de passe minimum 6 caractères");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Compte créé ! Vérifie ton email.");
      router.push("/dashboard/chat");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent-red/6 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 bg-accent-red rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">DRAGUE<span className="text-accent-red">.ME</span></span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Commence maintenant</h1>
          <p className="text-text-secondary text-sm">Gratuit — aucune CB requise</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {BENEFITS.map((b, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Check className="w-3 h-3 text-accent-red" />
              {b}
            </div>
          ))}
        </div>

        <form onSubmit={handleSignup} className="glass-strong rounded-2xl p-6 space-y-4">
          <Input
            label="Prénom"
            type="text"
            placeholder="Alex"
            value={name}
            onChange={e => setName(e.target.value)}
            icon={<User className="w-4 h-4" />}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="ton@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4" />}
            required
          />
          <Input
            label="Mot de passe"
            type="password"
            placeholder="Min. 6 caractères"
            value={password}
            onChange={e => setPassword(e.target.value)}
            icon={<Lock className="w-4 h-4" />}
            required
          />
          <Button type="submit" loading={loading} className="w-full" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Créer mon compte gratuitement
          </Button>
          <p className="text-xs text-text-muted text-center leading-relaxed">
            En créant un compte tu acceptes nos{" "}
            <Link href="/terms" className="underline">CGU</Link>
          </p>
        </form>

        <p className="text-center text-text-muted text-sm mt-6">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-accent-red hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
