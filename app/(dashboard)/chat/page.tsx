"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Flame, Copy, Share2, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "Elle m'a pas répondu depuis 2 jours",
  "Que répondre à ce message ?",
  "Comment créer de la tension ?",
  "Analyse cette conversation",
  "Premier message sur Tinder",
  "Comment la relancer ?"
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const history = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, sessionId })
      });

      if (!res.ok) {
        const err = await res.json();
        if (res.status === 429) {
          toast.error("Limite atteinte. Passe Premium pour continuer !", { duration: 5000 });
        } else {
          toast.error(err.error || "Erreur");
        }
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content || "";
                fullContent += delta;
                setMessages(prev =>
                  prev.map(m =>
                    m.id === assistantMessage.id ? { ...m, content: fullContent } : m
                  )
                );
              } catch {}
            }
          }
        }
      }
    } catch {
      toast.error("Erreur de connexion");
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copié !");
  };

  const shareMessage = (content: string) => {
    const text = `Mon coach IA DRAGUE.ME m'a dit:\n\n${content}\n\nTeste sur drague.me`;
    navigator.clipboard.writeText(text);
    toast.success("Prêt à partager !");
  };

  const resetChat = () => {
    setMessages([]);
    toast.success("Nouvelle conversation");
  };

  return (
    <div className="flex flex-col h-screen md:h-screen pb-16 md:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent-red rounded-full flex items-center justify-center animate-pulse-glow">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm">Coach IA Séduction</p>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
              En ligne
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" icon={<RotateCcw className="w-3.5 h-3.5" />} onClick={resetChat}>
            Nouveau
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center py-12"
          >
            <div className="w-16 h-16 bg-accent-red-glow rounded-2xl flex items-center justify-center mb-6 animate-pulse-glow">
              <Flame className="w-8 h-8 text-accent-red" />
            </div>
            <h2 className="text-xl font-bold mb-2">Ton coach IA est là</h2>
            <p className="text-text-secondary text-sm max-w-xs mb-8 leading-relaxed">
              Décris ta situation, colle un message reçu, ou demande des conseils. Je suis direct et efficace.
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="glass border border-border text-sm text-text-secondary px-3 py-2 rounded-xl hover:border-accent-red/40 hover:text-text-primary transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} group`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 bg-accent-red rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <Flame className="w-3.5 h-3.5 text-white" />
                </div>
              )}

              <div className="max-w-[80%] sm:max-w-[70%]">
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-accent-red text-white rounded-tr-sm"
                      : "glass border border-border text-text-primary rounded-tl-sm"
                  }`}
                >
                  {msg.content || (
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {msg.role === "assistant" && msg.content && (
                  <div className="flex gap-1.5 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => copyMessage(msg.content)}
                      className="p-1.5 rounded-lg hover:bg-bg-hover text-text-muted hover:text-text-secondary transition-all"
                      title="Copier"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => shareMessage(msg.content)}
                      className="p-1.5 rounded-lg hover:bg-bg-hover text-text-muted hover:text-text-secondary transition-all"
                      title="Partager"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end gap-3"
          >
            <div className="w-8 h-8 bg-accent-red rounded-full flex items-center justify-center flex-shrink-0">
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

      {/* Input */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-4 border-t border-border">
        <div className="flex items-end gap-3 glass-strong rounded-2xl p-3 border border-border focus-within:border-accent-red/40 transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Décris ta situation ou colle un message..."
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted resize-none outline-none min-h-[24px] max-h-[120px] leading-relaxed"
            rows={1}
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            size="sm"
            icon={<Send className="w-3.5 h-3.5" />}
            className="flex-shrink-0"
          >
            <span className="hidden sm:inline">Envoyer</span>
          </Button>
        </div>
        <p className="text-xs text-text-muted mt-2 text-center flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" />
          GPT-4o • Réponse en moins de 3 secondes
        </p>
      </div>
    </div>
  );
}
