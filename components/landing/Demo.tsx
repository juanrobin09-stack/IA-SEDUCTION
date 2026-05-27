"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

const DEMO_CONVERSATION = [
  {
    role: "user",
    text: "Elle m'a pas répondu depuis 2 jours après un super rendez-vous... Qu'est-ce que je fais ?",
    delay: 0
  },
  {
    role: "coach",
    text: "2 jours après un super RDV → elle teste ta réaction. Si tu relances maintenant, tu passes pour quelqu'un qui attend.\n\nEnvoie ça demain matin, pas ce soir :\n\n**\"Hé, tu gères un zoo ou quoi ? J'ai besoin de savoir si mon emploi du temps de la semaine prochaine peut contenir une autre aventure de ce calibre 😄\"**\n\nCourt, léger, humour qui sous-entend que t'as une vie. Elle répond dans 80% des cas.",
    delay: 1200
  },
  {
    role: "user",
    text: "Wow, et si elle répond juste 'haha' ?",
    delay: 200
  },
  {
    role: "coach",
    text: "\"haha\" = elle est intéressée mais teste ton frame.\n\nRéponds avec une invitation directe :\n**\"Mardi soir → tu es libre ?\"**\n\nTu passes de la vibe à l'action. Pas de question ouverte, pas de smiley. Direct. C'est ça qui attire.",
    delay: 1000
  }
];

export function Demo() {
  const [messages, setMessages] = useState<typeof DEMO_CONVERSATION>([]);
  const [typing, setTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex >= DEMO_CONVERSATION.length) return;

    const msg = DEMO_CONVERSATION[currentIndex];
    const timer = setTimeout(() => {
      if (msg.role === "coach") {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setMessages(prev => [...prev, msg]);
          setCurrentIndex(i => i + 1);
        }, 1200);
      } else {
        setMessages(prev => [...prev, msg]);
        setCurrentIndex(i => i + 1);
      }
    }, msg.delay + (currentIndex === 0 ? 600 : 0));

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const bestReply = "\"Hé, tu gères un zoo ou quoi ? J'ai besoin de savoir si mon emploi du temps de la semaine prochaine peut contenir une autre aventure de ce calibre 😄\"";

  const handleCopy = () => {
    navigator.clipboard.writeText(bestReply);
    toast.success("Message copié !");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`DRAGUE.ME m'a donné ce message parfait:\n\n${bestReply}\n\nTeste ici: drague.me`);
    toast.success("Lien copié — partage sur TikTok !");
  };

  return (
    <section id="demo" className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent-red text-sm font-semibold uppercase tracking-widest mb-3">Démo live</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Vois l'IA en action
          </h2>
          <p className="text-text-secondary">Une vraie conversation, des vrais conseils.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl overflow-hidden border border-border"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <div className="w-9 h-9 bg-accent-red rounded-full flex items-center justify-center animate-pulse-glow">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">Coach IA Séduction</p>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                En ligne
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="p-5 space-y-4 min-h-[340px] max-h-[400px] overflow-y-auto chat-scroll">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "coach" && (
                    <div className="w-7 h-7 bg-accent-red rounded-full flex items-center justify-center mr-2.5 flex-shrink-0 mt-1">
                      <Flame className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-accent-red text-white rounded-tr-sm"
                        : "glass border border-border text-text-primary rounded-tl-sm"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-accent-red">$1</strong>')
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-end gap-2"
              >
                <div className="w-7 h-7 bg-accent-red rounded-full flex items-center justify-center flex-shrink-0">
                  <Flame className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="glass border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Action bar */}
          <div className="border-t border-border px-5 py-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-text-muted">Message suggéré prêt à envoyer</p>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" icon={<Copy className="w-3.5 h-3.5" />} onClick={handleCopy}>
                Copier
              </Button>
              <Button size="sm" icon={<Share2 className="w-3.5 h-3.5" />} onClick={handleShare}>
                Partager
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
