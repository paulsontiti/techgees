'use client'

import { ArrowRight, ArrowUpRight, Blocks, BrainCircuit, CheckCircle2, Code2, Gamepad2, WandSparkles } from "lucide-react";
import useOpenEnrollModal from "../../../store/enrol-modal-store";
import Heading from "./heading";
import Reveal from "./reveal";
import PrimaryButton from "./primary-button";
import { pathways } from "@/lib/content";
import Link from "next/link";

export default function Programs() {
  const tones = [
    "bg-[#FFEDB0]",
    "bg-[#EAE4FF]",
    "bg-[#DFECFF]",
    "bg-[#DCF6E8]",
  ];
  const icons = [Gamepad2, WandSparkles,Blocks, Code2, BrainCircuit];

  const {openModal} = useOpenEnrollModal()
  return (
    <section id="programs" className=" bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-9">
        <div className="flex flex-col lg:justify-between gap-5 mb-20">
          <Heading
            eyebrow="LEARNING FOR EVERY AGE"
            title={
              <>
                Every big future starts{" "}
                <span className="text-[#7862D8]">somewhere.</span>
              </>
            }
            description="Whether they are five or fifty, there is a starting point made for their experience and curiosity."
          />
          <Reveal>
            <PrimaryButton className={` mb-4 md:w-1/2`} onClick={openModal}>
              Find your starting point
            </PrimaryButton>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {pathways.map((path, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={path.title} delay={i * 0.07} className="h-full">
                <div
                  className={`group h-full rounded-[29px] p-6 xl:p-7 ${tones[i]} hover:-translate-y-2 transition-transform duration-300 flex flex-col relative overflow-hidden`}
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-white/70 rounded-full px-3 py-1.5 text-[10px] font-black tracking-[.1em]">
                      {path.range}
                    </span>
                    <span className="text-5xl font-black opacity-[.12] tracking-tighter">
                      {path.symbol}
                    </span>
                  </div>
                  <div className="h-16 w-16 rounded-[22px] bg-white/70 flex items-center justify-center mt-6 mb-6">
                    <Icon size={31} strokeWidth={1.8} />
                  </div>
                  <p className="uppercase text-[11px] font-black tracking-[.12em] opacity-60">
                    {path.subtitle}
                  </p>
                  <h3 className="mt-2 text-2xl font-black leading-tight tracking-tight">
                    {path.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#3F4560] leading-[1.7]">
                    {path.note}
                  </p>
                  <div className="mt-5 pt-5 border-t border-ink/10 space-y-2 flex-1">
                    {path.skills.map((s) => (
                      <div
                        key={s}
                        className="flex items-center gap-2 text-[12px] font-bold"
                      >
                        <CheckCircle2 size={15} />
                        {s}
                      </div>
                    ))}
                  </div>
                  <PrimaryButton
                    href={path.courseLink}
                    className="mt-8 flex items-center justify-between text-[13px] font-black"
                  >
                    Explore pathway{" "}
                    {/* <span className="h-9 w-9 rounded-full bg-ink text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
                      <ArrowUpRight size={18} />
                    </span> */}
                  </PrimaryButton>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-9 rounded-2xl bg-[#F7F8FC] border border-[#E8EBF4] flex flex-col md:flex-row items-start sm:items-center justify-between gap-5 p-5 sm:p-6">
          <p className="text-sm leading-relaxed">
            <span className="font-black text-ink">Not just for children.</span>{" "}
            University students, career changers and working professionals can
            begin from the foundations and grow into advanced engineering.
          </p>
          <a
            href="#journey"
            className="shrink-0 inline-flex items-center gap-2 text-xs font-black text-[#6C58D6]"
          >
            See the academy pathway <ArrowRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}