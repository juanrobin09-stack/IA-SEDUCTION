import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted",
            "focus:outline-none focus:ring-2 focus:ring-accent-red/40 focus:border-accent-red/50",
            "transition-all duration-200 resize-none",
            error && "border-red-500/50",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
