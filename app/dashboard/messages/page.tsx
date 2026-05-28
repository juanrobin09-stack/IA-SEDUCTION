"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Sparkles, Copy, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface GeneratedMessage {
  style: string;
  message: string;
  why: string;
}

interface MessagesResult {
  messages: GeneratedMessage[];
  best_pick: number;
  tip: string;
}

const CATEGORIES = [
  { id: "first", label: "Premier message" },
  { id: "relance", label: "Relance" },
  { id: "flirt", label: "Flirt" },
  { id: "date", label: "Proposer un RDV" },
  { id: "reprise", label: "Reprendre contact" },
  { id: "sexualisation", label: "Monter l'attraction" }
];

const STYLES = [
  { id: "drôle", label: "Drôle", color: "text-amber-400" },
  { id: "alpha", label: "Alpha", color: "text-red-400" },
  { id: "mystérieux", label: "Mystérieux", color: "text-violet-400" },
  { id: "romantique", label: "Romantique", color: "text-pink-400" },
  { id: "confiant", label: "Confiant", color: "text-blue-400" }
];

export default function MessagesPage() {
  const [category, setCategory] = useState("first");
  const [context, setContext] = useState("");
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["drôle", "alpha", "mystérieux"]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MessagesResult | null>(null);

  const toggleStyle = (id: string) => {
    setSelectedStyles(prev =>
      prev.includes(id)
        ? prev.length > 1 ? prev.filter(s => s !== id) : prev
        : [...prev, id].slice(0, 3)
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, context, styles: selectedStyles })
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

  return (
    <div className="flex flex-col h-screen pb-16 md:pb-0 overflow-y-auto">
      <div className="flex-shrink-0 px-4 sm:px-6 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-900/40 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Générateur de messages</h1>
            <p className="text-text-muted text-sm">5 styles différents pour chaque situation</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 py-6 space-y-6 max-w-3xl">
        <div className="space-y-5">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Type de message</label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-sm font-medium border transition-all duration-200",
                    category === cat.id
                      ? "bg-accent-red border-accent-red text-white"
                      : "border-border text-text-secondary hover:border-accent-red/40"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Styles */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Styles (max 3)
            </label>
            <div className="flex gap-2 flex-wrap">
              {STYLES.map(style => (
                <button
                  key={style.id}
                  onClick={() => toggleStyle(style.id)}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-sm font-medium border transition-all duration-200",
                    selectedStyles.includes(style.id)
                      ? `bg-bg-hover border-white/20 ${style.color}`
                      : "border-border text-text-muted"
                  )}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Context */}
          <Input
            label="Contexte (optionnel)"
            placeholder="Ex: son prénom est Sophie, elle aime les voyages, profil Instagram..."
            value={context}
            onChange={e => setContext(e.target.value)}
          />

          <Button
            onClick={handleGenerate}
            loading={loading}
            icon={<Sparkles className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Générer les messages
          </Button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {result.tip && (
                <div className="glass rounded-xl px-4 py-3 border border-accent-red/20 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-accent-red mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-text-secondary">{result.tip}</p>
                </div>
              )}

              {result.messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Card className={i === result.best_pick ? "border-gradient" : ""}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant={i === result.best_pick ? "red" : "default"}>
                            {msg.style}
                          </Badge>
                          {i === result.best_pick && (
                            <Badge variant="red">
                              <Star className="w-2.5 h-2.5 fill-current" />
                              Meilleur
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Copy className="w-3.5 h-3.5" />}
                          onClick={() => {
                            navigator.clipboard.writeText(msg.message);
                            toast.success("Copié !");
                          }}
                        >
                          Copier
                        </Button>
                      </div>
                      <p className={cn(
                        "text-sm font-medium mb-2 px-3 py-2.5 rounded-xl",
                        i === result.best_pick ? "bg-accent-red-glow border border-accent-red/20" : "glass"
                      )}>
                        {msg.message}
                      </p>
                      <p className="text-xs text-text-muted">{msg.why}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
