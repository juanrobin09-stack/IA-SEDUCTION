"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, BarChart2, User, Zap, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard/chat", icon: MessageSquare, label: "Chat" },
  { href: "/dashboard/analyze", icon: BarChart2, label: "Analyser" },
  { href: "/dashboard/profile", icon: User, label: "Profil" },
  { href: "/dashboard/messages", icon: Zap, label: "Messages" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" }
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border px-2 py-2 flex md:hidden">
      {NAV_ITEMS.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all duration-200",
            pathname === item.href
              ? "text-accent-red"
              : "text-text-muted"
          )}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px] font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
