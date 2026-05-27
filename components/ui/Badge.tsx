import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "red" | "green" | "yellow" | "blue";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-bg-hover text-text-secondary border-border",
    red: "bg-accent-red-glow text-accent-red border-accent-red/20",
    green: "bg-green-900/20 text-green-400 border-green-900/30",
    yellow: "bg-yellow-900/20 text-yellow-400 border-yellow-900/30",
    blue: "bg-accent-blue-glow text-accent-blue border-accent-blue/20"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
