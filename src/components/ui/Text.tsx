import React from "react";
import type { JSX } from "react";

export const Heading = ({
  children,
  level = 1,
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const styles = {
    1: "text-5xl md:text-6xl font-extrabold tracking-tight text-dark",
    2: "text-3xl md:text-4xl font-bold text-dark",
    3: "text-xl font-semibold text-accent",
  };

  return <Tag className={styles[level]}>{children}</Tag>;
};
