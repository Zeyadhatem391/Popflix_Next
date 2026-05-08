import { cn } from "@/lib/cn";
import { ReactNode } from "react";

interface Props {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" |  "4xl" | "5xl";
  variant?: "base";
  className?: string;
  center?: boolean;
  children: ReactNode;
}

export default function Title({
  size = "md",
  variant = "base",
  className,
  center = false,
  children,
}: Props) {
  const sizes = {
    sm: "ds-text-sm",
    md: "ds-text-base",
    lg: "ds-text-lg",
    xl: "ds-text-xl",
    "2xl": "ds-text-2xl",
    "3xl": "ds-text-3xl",
    "4xl": "ds-text-4xl",
    "5xl": "ds-text-5xl",
  };

  const variants = {
    base: "ds-text-base",
  };
  return (
    <h2
      className={cn(
        sizes[size],
        variants[variant],
        center ? "text-center" : "",
        className,
      )}
    >
      {children}
    </h2>
  );
}
