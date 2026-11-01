import { ReactNode } from "react";
import Reveal from "./reveal";

export default function Heading({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  centered?: boolean;
  light?: boolean;
}) {
  return (
    <Reveal
      className={`${centered ? "text-center mx-auto" : ""} max-w-[790px]`}
    >
      <span
        className={`text-xs font-extrabold tracking-[.19em] uppercase ${light ? "text-sun" : "text-[#6E5BD3]"}`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-3 font-display text-[clamp(2.2rem,4vw,4rem)] leading-[1.1] font-black text-balance ${light ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base md:text-lg leading-relaxed 
            
          `}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}