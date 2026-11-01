import { bgPrimaryColor, textSecondaryColor } from "@/utils/colors";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

export default function PrimaryButton({
  children,
  onClick,
  href,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "yellow" | "dark" | "white" | "outline";
  className?: string;
}) {
  const styles = {
    default: `${bgPrimaryColor} ${textSecondaryColor}`,
    yellow: "bg-sun text-ink hover:bg-[#ffe28d]",
    dark: "bg-ink text-white hover:bg-[#202e56]",
    white: "bg-white text-ink hover:bg-[#eceefd]",
    outline: `border border-white bg-white/5 ${textSecondaryColor} hover:bg-white/10`,
  };
  const cls = `group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-6 text-[13px] font-extrabold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl  ${styles[variant]} ${className}`;
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cls}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}