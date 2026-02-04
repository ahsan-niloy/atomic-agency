import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
}: Props) {
  const baseStyles =
    "px-6 py-3 font-bold rounded-lg transition-all duration-200 active:scale-95 cursor-pointer";

  const variants = {
    primary:
      "bg-primary text-white hover:brightness-110 shadow-lg shadow-primary/20",
    secondary: "bg-secondary text-dark hover:brightness-105",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
