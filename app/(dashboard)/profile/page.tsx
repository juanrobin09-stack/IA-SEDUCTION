"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Star, Sparkles, Copy, CheckCircle2, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import toast from "react-hot-toast";

interface ProfileResult {
  score: number;
  summary: string;
  bio_rewritten: string;
  improvements: Array<{ aspect: string; current: string; suggestion: string; why: string }>;
  photo_tips: string[];
  keywords: string[];
}

export default function ProfilePage() {
  const [bio, setBio] = useState("");
  const [platform, setPlatform] = useState("tinder");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProfileResult | null>(null);

  const handleOptimize = async () => {
    if (!bio.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio, platform })
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Erreur");
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch {
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const stars = result ? Math.round(result.score / 2) : 0;

  return (
    <div className="flex flex-col h-screen pb-16 md:pb-0 overflow-y-auto">
      <div className="flex-shrink-0 px-4 sm:px-6 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-900/40 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Optimiseur de profil</h1>
            <p className="text-text-muted text-sm">Maximise tes matchs avec une bio béton</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 py-6 space-y-6 max-w-3xl">
        <div className="space-y-4">
          {/* Platform selector */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Plateforme</label>
            <div className="flex gap-2 flex-wrap">
              {["tinder", "instagram", "bumble", "hinge"].map(p => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 capitalize ${
                    platform === p
                      ? "bg-accent-red border-accent-red text-white"
                      : "border-border text-text-secondary hover:border-accent-red/40"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <Textarea
            label="Ta bio actuelle"
            placeholder={`Colle ta bio ${platform} ici...\n\nExemple : "Passionné de voyages et de bonne bouffe. 1m82. Lyon. Cherche quelqu'un pour partager des bons moments 😊"`}
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={5}
          />

          <Button
            onClick={handleOptimize}
            loading={loading}
            disabled={!bio.trim()}
            icon={<Sparkles className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Optimiser mon profil
          </Button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Score */}
              <Card>
                <CardContent className="pt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < stars ? "text-accent-red fill-accent-red" : "text-text-muted"}`}
                          />
                        ))}
                        <span className="ml-2 text-2xl font-bold">{result.score}/10</span>
                      </div>
                      <p className="text-text-secondary text-sm">{result.summary}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {result.keywords.map((kw, i) => (
                      <Badge key={i} variant="red">{kw}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Rewritten bio */}
              <Card glow>
                <CardContent className="pt-5">
                  <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-accent-red" />
                    Bio réécrite par l'IA
                  </h3>
                  <div className="glass rounded-xl px-4 py-4 text-sm leading-relaxed border border-accent-red/20 mb-3">
                    {result.bio_rewritten}
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<Copy className="w-3.5 h-3.5" />}
                    onClick={() => {
                      navigator.clipboard.writeText(result.bio_rewritten);
                      toast.success("Bio copiée !");
                    }}
                  >
                    Copier la bio
                  </Button>
                </CardContent>
              </Card>

              {/* Improvements */}
              {result.improvements.length > 0 && (
                <Card>
                  <CardContent className="pt-5">
                    <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Améliorations détaillées
                    </h3>
                    <div className="space-y-4">
                      {result.improvements.map((imp, i) => (
                        <div key={i} className="border-l-2 border-accent-red/30 pl-3">
                          <p className="text-sm font-medium text-accent-red mb-1">{imp.aspect}</p>
                          {imp.current && (
                            <p className="text-xs text-text-muted line-through mb-1">"{imp.current}"</p>
                          )}
                          <p className="text-sm text-text-secondary mb-1">{imp.suggestion}</p>
                          <p className="text-xs text-text-muted">{imp.why}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Photo tips */}
              {result.photo_tips.length > 0 && (
                <Card>
                  <CardContent className="pt-5">
                    <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                      <Camera className="w-4 h-4 text-blue-400" />
                      Conseils photos
                    </h3>
                    <ul className="space-y-2">
                      {result.photo_tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="text-blue-400 font-bold mt-0.5">{i + 1}.</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
