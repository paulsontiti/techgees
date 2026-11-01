'use client'
import { phases } from "@/lib/content";
import { useState } from "react";
import Heading from "./heading";
import Reveal from "./reveal";
import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, Layers3, Rocket } from "lucide-react";
import { AnimatePresence,motion } from "framer-motion";
import Pill from "./pill";

export default function Curriculum() {
  const [index, setIndex] = useState(0);
  const active = phases[index];
  return (
    <section id="journey" className="bg-paper py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-9">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-5 mb-11">
          <Heading
            eyebrow="THE 100-MODULE SOFTWARE AND AI ACADEMY"
            title={
              <>
                10 phases.{" "}
                <span className="text-[#7862D8]">Limitless possibilities.</span>
              </>
            }
            description="Explore the disciplines that make up our comprehensive Software & AI Engineering curriculum—from computers and Python to cloud infrastructure and intelligent systems."
          />
          <Reveal>
            <div className="shrink-0 bg-ink rounded-2xl p-4 flex items-center gap-3">
              <Layers3 size={23} className="text-sun" />
              <div>
                <strong className="text-xl font-black">100</strong>
                <p className="text-[11px] font-semibold">Structured modules</p>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="grid lg:grid-cols-[.42fr_.58fr] gap-5 lg:gap-7 items-start">
          <Reveal className="grid grid-cols-2 lg:grid-cols-2 md:grid-cols-5 gap-2.5">
            {phases.map((phase, i) => (
              <button
                key={phase.number}
                type="button"
                aria-pressed={index === i}
                onClick={() => setIndex(i)}
                className={`text-left min-h-[86px] rounded-[18px] p-3.5 sm:p-4 border-2 transition-all duration-200 ${index === i ? "border-ink bg-in shadow-lg" : "border-transparent bg-white hover:border-[#D8DDEE] text-ink"}`}
              >
                <div
                  className={`text-[11px] font-black tracking-[.15em] ${index === i ? "text-sun" : "text-[#7862D8]"}`}
                >
                  PHASE {phase.number}
                </div>
                <div className="text-[12px] sm:text-[13px] font-extrabold mt-2 leading-snug">
                  {phase.title}
                </div>
              </button>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative bg-white rounded-[32px] p-7 sm:p-9 lg:p-11 min-h-[560px] border border-[#E8EBF2] shadow-card overflow-hidden">
              <div className="absolute -top-12 -right-10 h-48 w-48 rounded-full bg-[#F1EBFF] blur-2xl" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                  className="relative"
                >
                  <div className="flex justify-between items-start gap-4">
                    <Pill>THE CURRICULUM</Pill>
                    <span className="font-black text-[#E2E5EF] text-6xl sm:text-7xl leading-none">
                      {active.number}
                    </span>
                  </div>
                  <div className="mt-7 text-[#7862D8] text-xs font-black tracking-wider uppercase">
                    {active.modules}
                  </div>
                  <h3 className="mt-2 text-[clamp(1.9rem,3vw,3rem)] font-display leading-tight font-black max-w-[500px]">
                    {active.title}
                  </h3>
                  <p className="mt-3 text-[#7862D8] font-bold">
                    {active.short}
                  </p>
                  <p className="mt-5 text-sm sm:text-base leading-relaxed">
                    {active.why}
                  </p>
                  <div className="mt-7 rounded-[20px] bg-[#F4F3FF] px-5 py-4">
                    <div className="text-[11px] uppercase font-black tracking-[.13em] text-[#6853C5] mb-2">
                      WHAT YOU LEARN
                    </div>
                    <p className="text-[13px] sm:text-sm font-bold leading-relaxed">
                      {active.topics}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-5">
                    <div className="rounded-[20px] border border-[#EAECF3] p-5">
                      <div className="flex  gap-2 text-xs font-black items-center text-[#8060CA] mb-2">
                        <Rocket size={17} /> WHAT YOU CAN BUILD
                      </div>
                      <p className="text-[13px] leading-relaxed">
                        {active.build}
                      </p>
                    </div>
                    <div className="rounded-[20px] border border-[#EAECF3] p-5">
                      <div className="flex gap-2 text-xs font-black items-center text-[#24795B] mb-2">
                        <BadgeCheck size={17} /> WHAT YOU GAIN
                      </div>
                      <p className="text-[13px] leading-relaxed">
                        {active.outcome}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="relative flex justify-between items-center border-t border-[#E9EAF1] pt-5 mt-7">
                <span className="text-xs font-bold">
                  {index + 1} of 10 phases
                </span>
                <div className="flex gap-2">
                  <button
                    aria-label="Previous phase"
                    disabled={index === 0}
                    onClick={() => setIndex(Math.max(0, index - 1))}
                    className="h-10 w-10 rounded-full border border-[#E0E4ED] flex items-center justify-center disabled:opacity-30 hover:bg-[#F0F2F9]"
                  >
                    <ChevronLeft size={19} />
                  </button>
                  <button
                    aria-label="Next phase"
                    disabled={index === phases.length - 1}
                    onClick={() =>
                      setIndex(Math.min(phases.length - 1, index + 1))
                    }
                    className="h-10 w-10 rounded-full bg-ink flex items-center justify-center disabled:opacity-30 hover:bg-[#344265]"
                  >
                    <ChevronRight size={19} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-7 rounded-[22px] bg-[#EEEAFD] px-6 py-5 flex flex-wrap items-center gap-3 justify-between">
          <p className="text-sm font-semibold text-[#443E6E]">
            <span className="font-black">Big picture:</span> This is a
            progressive curriculum—not a promise to complete all 100 modules in
            a few weeks.
          </p>
          <a
            href="#pricing"
            className="text-sm inline-flex items-center gap-2 font-black text-[#6050BC]"
          >
            Explore enrolment <ArrowRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}