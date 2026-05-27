"use client";

import { useEffect, useState } from "react";
import { Settings, Crown, CreditCard, Sparkles, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

interface Profile {
  plan: string;
  daily_messages_used: number;
  email?: string;
  full_name?: string;
}

const PLANS = [
  {
    id: "premium",
    name: "Premium",
    price: "29€/mois",
    icon: Sparkles,
    features: ["Messages illimités", "Analyse avancée", "Optimiseur de profil", "Générateur avancé"]
  },
  {
    id: "vip",
    name: "VIP",
    price: "99€/mois",
    icon: Crown,
    features: ["Tout Premium", "Coaching humain 1h/mois", "Audit profil", "WhatsApp support"]
  }
];

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("plan, daily_messages_used")
        .eq("id", user.id)
        .single();

      setProfile({
        plan: data?.plan ?? "free",
        daily_messages_used: data?.daily_messages_used ?? 0,
        email: user.email,
        full_name: user.user_metadata?.full_name
      });
    };

    fetchProfile();
  }, []);

  const handleUpgrade = async (plan: string) => {
    setLoading(plan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan })
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Erreur lors de la création du paiement");
      }
    } catch {
      toast.error("Erreur de connexion");
    } finally {
      setLoading(null);
    }
  };

  const isPremium = profile?.plan === "premium" || profile?.plan === "vip";
  const credits = Math.max(0, 5 - (profile?.daily_messages_used ?? 0));

  return (
    <div className="flex flex-col h-screen pb-16 md:pb-0 overflow-y-auto">
      <div className="flex-shrink-0 px-4 sm:px-6 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-bg-hover rounded-xl flex items-center justify-center">
            <Settings className="w-5 h-5 text-text-secondary" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Paramètres</h1>
            <p className="text-text-muted text-sm">Compte et abonnement</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 py-6 max-w-2xl space-y-6">
        {/* Account info */}
        <Card>
          <CardContent className="pt-5">
            <h2 className="font-semibold mb-4 text-sm uppercase tracking-wider text-text-muted">Mon compte</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Email</span>
                <span className="text-sm font-medium">{profile?.email || "—"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Prénom</span>
                <span className="text-sm font-medium">{profile?.full_name || "—"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Plan actuel</span>
                <Badge variant={isPremium ? "red" : "default"}>
                  {profile?.plan === "vip" ? "VIP" : profile?.plan === "premium" ? "Premium" : "Gratuit"}
                </Badge>
              </div>
              {!isPremium && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Messages restants aujourd'hui</span>
                  <span className="text-sm font-medium">{credits}/5</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upgrade plans */}
        {!isPremium && (
          <div>
            <h2 className="font-semibold mb-4 text-sm uppercase tracking-wider text-text-muted">
              Passer Premium
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {PLANS.map(plan => (
                <Card key={plan.id} className={plan.id === "premium" ? "border-gradient" : ""}>
                  <CardContent className="pt-5">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-8 h-8 bg-accent-red rounded-lg flex items-center justify-center">
                        <plan.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{plan.name}</p>
                        <p className="text-xs text-accent-red font-medium">{plan.price}</p>
                      </div>
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                          <Check className="w-3 h-3 text-accent-red flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.id === "premium" ? "primary" : "outline"}
                      size="sm"
                      className="w-full"
                      loading={loading === plan.id}
                      icon={<CreditCard className="w-3.5 h-3.5" />}
                      onClick={() => handleUpgrade(plan.id)}
                    >
                      Choisir {plan.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {isPremium && (
          <Card>
            <CardContent className="pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold mb-0.5">Abonnement actif</p>
                  <p className="text-sm text-text-muted">Gérer via Stripe</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                  onClick={async () => {
                    const res = await fetch("/api/stripe/portal", { method: "POST" });
                    const data = await res.json();
                    if (data.url) window.location.href = data.url;
                  }}
                >
                  Gérer
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
