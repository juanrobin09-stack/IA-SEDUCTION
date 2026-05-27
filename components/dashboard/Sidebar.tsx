"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MessageSquare, BarChart2, User, Zap, Settings, LogOut, Flame, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

const NAV_ITEMS = [
  { href: "/dashboard/chat", icon: MessageSquare, label: "Chat Coach" },
  { href: "/dashboard/analyze", icon: BarChart2, label: "Analyser" },
  { href: "/dashboard/profile", icon: User, label: "Profil" },
  { href: "/dashboard/messages", icon: Zap, label: "Générateur" }
];

interface SidebarProps {
  userEmail?: string;
  plan?: string;
  credits?: number;
}

export function Sidebar({ userEmail, plan = "free", credits = 5 }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("Déconnecté");
    router.push("/");
    router.refresh();
  };

  const isPremium = plan === "premium" || plan === "vip";

  return (
    <aside className="w-64 min-h-screen glass-strong border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-accent-red rounded-lg flex items-center justify-center animate-pulse-glow">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold">DRAGUE<span className="text-accent-red">.ME</span></span>
        </Link>
      </div>

      {/* Credits bar */}
      {!isPremium && (
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-text-muted">Messages restants</span>
            <span className="font-semibold text-text-secondary">{credits}/5</span>
          </div>
          <div className="w-full h-1.5 bg-bg-hover rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-red rounded-full transition-all"
              style={{ width: `${(credits / 5) * 100}%` }}
            />
          </div>
          <Link href="/dashboard/settings" className="mt-2 flex items-center gap-1.5 text-xs text-accent-red hover:underline">
            <Crown className="w-3 h-3" />
            Passer Premium
          </Link>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              pathname === item.href
                ? "bg-accent-red text-white glow-red-sm"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
            )}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border space-y-1">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
            pathname === "/dashboard/settings"
              ? "bg-accent-red text-white"
              : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
          )}
        >
          <Settings className="w-4 h-4" />
          Paramètres
        </Link>

        <div className="px-3 py-2">
          <p className="text-xs text-text-muted truncate mb-0.5">{userEmail}</p>
          {isPremium && (
            <span className="text-xs font-medium text-accent-red">{plan === "vip" ? "VIP" : "Premium"}</span>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-red-400 hover:bg-red-900/10 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
