'use client'

import Image from "next/image";
import Reveal from "./reveal";
import { ArrowRight, Check, Lightbulb } from "lucide-react";
import Heading from "./heading";
import useOpenEnrollModal from "../../../store/enrol-modal-store";

export default function Intro() {

    const {openModal} = useOpenEnrollModal()

  return (
    <section className="py-20 md:py-28 bg-paper relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-9">
        <div className="grid md:grid-cols-2 gap-20 md:gap-10 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -top-5 -left-5 h-28 w-28 rounded-[32px] bg-sun rotate-[-13deg]" />
              <div className="relative overflow-hidden rounded-[32px] sm:rounded-[44px] aspect-[1.12/1] bg-[#E8DFFF]">
                <Image
                  src="/assets/teen-engineer.jpg"
                  alt="A young software engineering learner smiling as he works on a laptop"
                  fill
                  sizes="(max-width:1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 right-[-5px] sm:-right-5 rounded-[22px] shadow-float bg-white px-5 py-4 flex items-center gap-3">
                <span className="rounded-full p-2.5 bg-[#E7FAEF] text-[#1C9A62]">
                  <Lightbulb size={22} />
                </span>
                <div className="font-bold text-sm leading-tight">
                  Less passive scrolling.
                  <br />
                  <span className="text-[#6D58D9]">
                    More inspired creating.
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
          <div>
            <Heading
              eyebrow="WHY THE GLOBAL GENIUS"
              title={
                <>
                  A new kind of screen time.{" "}
                  <span className="text-[#7862D8]">
                    A better kind of future.
                  </span>
                </>
              }
              description="Technology is changing the world our children will inherit. We believe students should have the chance to understand it, shape it and build with it—not just consume it."
            />
            <Reveal delay={0.14}>
              <div className="mt-7 space-y-4">
                {[
                  [
                    "We start where they are",
                    "Age-appropriate, beginner-friendly learning paths.",
                  ],
                  [
                    "We make learning active",
                    "Build a game, write a program, solve a problem, improve it.",
                  ],
                  [
                    "We keep growing with them",
                    "One progressive journey from Scratch to advanced intelligent systems.",
                  ],
                ].map(([a, b]) => (
                  <div key={a} className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-full bg-[#E4F7EA] p-1.5 text-[#1E9261]">
                      <Check size={15} />
                    </span>
                    <p className=" leading-relaxed text-sm sm:text-base">
                      <strong className="text-ink">{a}.</strong> {b}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={openModal}
                className="mt-8 inline-flex items-center gap-2 font-black text-sm text-[#6350D4] hover:gap-3 transition-all"
              >
                Experience the difference <ArrowRight size={17} />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}