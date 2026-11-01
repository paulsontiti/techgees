'use client'

import { LucideIcon } from "lucide-react";

export default function IconBox({
  icon: Icon,
  tone = "gold",
}: {
  icon: LucideIcon;
  tone?: "gold" | "purple" | "blue" | "mint" | "white";
}) {
  const themes = {
    gold: "bg-[#FFF0BF] text-[#966300]",
    purple: "bg-[#ECE6FF] text-[#6951CE]",
    blue: "bg-[#E2F0FF] text-[#3577C7]",
    mint: "bg-[#DCFAE9] text-[#208D68]",
    white: "bg-white/10 text-white",
  };
  return (
    <div
      className={` size-12 rounded-[15px] flex items-center justify-center ${themes[tone]}`}
    >
      <Icon size={23} strokeWidth={2.2} />
    </div>
  );
}