"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, icon, children, disabled, ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-red/50 disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variants = {
      primary: "bg-accent-red hover:bg-accent-red-dim text-white glow-red-sm hover:glow-red active:scale-[0.98]",
      secondary: "bg-bg-card hover:bg-bg-hover text-text-primary border border-border",
      ghost: "text-text-secondary hover:text-text-primary hover:bg-bg-hover",
      danger: "bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/30",
      outline: "border border-border hover:border-accent-red/50 text-text-primary hover:bg-bg-hover"
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-7 py-3.5 text-base"
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
