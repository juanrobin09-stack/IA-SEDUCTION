"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message === "Invalid login credentials"
        ? "Email ou mot de passe incorrect"
        : error.message
      );
    } else {
      toast.success("Connexion réussie !");
      router.push("/dashboard/chat");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
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
          <h1 className="text-2xl font-bold mb-2">Bon retour</h1>
          <p className="text-text-secondary text-sm">Connecte-toi à ton coach IA</p>
        </div>

        <form onSubmit={handleLogin} className="glass-strong rounded-2xl p-6 space-y-4">
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
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            icon={<Lock className="w-4 h-4" />}
            required
          />
          <Button type="submit" loading={loading} className="w-full" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
            Se connecter
          </Button>
        </form>

        <p className="text-center text-text-muted text-sm mt-6">
          Pas encore de compte ?{" "}
          <Link href="/signup" className="text-accent-red hover:underline font-medium">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
