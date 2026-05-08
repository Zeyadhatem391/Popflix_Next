import { cn } from "@/lib/cn";
import { ReactNode } from "react";

interface Props {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  variant?: "primary" | "secondary" | "alt" | "base" | "disabled";
  className?: string;
  center?: boolean;
  children: ReactNode;
}

export default function Text({
  size = "md",
  variant = "disabled",
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
  };

  const variants = {
    secondary: "ds-text-secondary",
    alt: "ds-text-alt ",
    base: "ds-text-base",
    primary: "ds-text-primary",
    disabled: "ds-text-disabled",
  };
  return (
    <p
      className={cn(
        sizes[size],
        variants[variant],
        center ? "text-center" : "",
        className,
      )}
    >
      {children}
    </p>
  );
}
