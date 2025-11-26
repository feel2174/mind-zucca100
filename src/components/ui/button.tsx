import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClassMap: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50",
  secondary:
    "bg-white text-slate-800 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600",
  ghost: "bg-transparent text-white/90 hover:text-white",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild, type = "button", ...props }, ref) => {
    const Component = (asChild ? "span" : "button") as React.ElementType;

    return (
      <Component
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-5 py-3 text-base font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed",
          variantClassMap[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

