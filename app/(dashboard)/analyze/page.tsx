"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart2, AlertCircle, CheckCircle2, Sparkles, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import toast from "react-hot-toast";

interface AnalysisResult {
  score: number;
  verdict: string;
  strengths: string[];
  errors: Array<{ error: string; impact: string }>;
  suggested_reply: string;
  strategy: string;
}

export default function AnalyzePage() {
  const [conversation, setConversation] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!conversation.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation })
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Erreur d'analyse");
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

  const scoreColor = (score: number) => {
    if (score >= 7) return "text-green-400";
    if (score >= 5) return "text-yellow-400";
    return "text-accent-red";
  };

  const scoreLabel = (score: number) => {
    if (score >= 8) return { text: "Excellent", variant: "green" as const };
    if (score >= 6) return { text: "Correct", variant: "yellow" as const };
    if (score >= 4) return { text: "À améliorer", variant: "yellow" as const };
    return { text: "Danger", variant: "red" as const };
  };

  return (
    <div className="flex flex-col h-screen pb-16 md:pb-0 overflow-y-auto">
      <div className="flex-shrink-0 px-4 sm:px-6 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-violet-900/40 rounded-xl flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Analyse de conversation</h1>
            <p className="text-text-muted text-sm">Colle ta conversation pour un diagnostic complet</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 py-6 space-y-6 max-w-3xl">
        <div className="space-y-3">
          <Textarea
            label="Ta conversation"
            placeholder={"Colle ta conversation ici...\n\nExemple:\nToi: Salut comment tu vas ?\nElle: Bien et toi ?\nToi: Super ! Tu fais quoi ce weekend ?"}
            value={conversation}
            onChange={e => setConversation(e.target.value)}
            rows={8}
            className="font-mono text-xs"
          />
          <Button
            onClick={handleAnalyze}
            loading={loading}
            disabled={!conversation.trim()}
            icon={<Sparkles className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Analyser la conversation
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
              <Card className="overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-accent-red to-red-400" style={{ width: `${result.score * 10}%` }} />
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-4xl font-extrabold ${scoreColor(result.score)}`}>
                          {result.score}/10
                        </span>
                        <Badge variant={scoreLabel(result.score).variant}>
                          {scoreLabel(result.score).text}
                        </Badge>
                      </div>
                      <p className="text-text-secondary text-sm">{result.verdict}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Strengths */}
                <Card>
                  <CardContent className="pt-5">
                    <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Points forts
                    </h3>
                    <ul className="space-y-2">
                      {result.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">+</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Errors */}
                <Card>
                  <CardContent className="pt-5">
                    <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                      <AlertCircle className="w-4 h-4 text-accent-red" />
                      Erreurs détectées
                    </h3>
                    <ul className="space-y-3">
                      {result.errors.map((e, i) => (
                        <li key={i} className="text-sm">
                          <p className="text-text-primary font-medium">{e.error}</p>
                          <p className="text-text-muted text-xs mt-0.5">{e.impact}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Suggested reply */}
              <Card glow>
                <CardContent className="pt-5">
                  <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-accent-red" />
                    Message conseillé
                  </h3>
                  <div className="glass rounded-xl px-4 py-3 font-medium text-sm border border-accent-red/20 mb-3">
                    {result.suggested_reply}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={<Copy className="w-3.5 h-3.5" />}
                      onClick={() => {
                        navigator.clipboard.writeText(result.suggested_reply);
                        toast.success("Copié !");
                      }}
                    >
                      Copier
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Strategy */}
              <Card>
                <CardContent className="pt-5">
                  <h3 className="text-sm font-semibold mb-2">Stratégie conseillée</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{result.strategy}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
