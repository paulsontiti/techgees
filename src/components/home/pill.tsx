import { ReactNode } from "react";

export default function Pill({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] sm:text-[11px] font-extrabold tracking-[.17em] uppercase ${dark ? "bg-white/10 border border-white/15 text-white" : "bg-ink/5 text-ink"}`}
    >
      {children}
    </span>
  );
}