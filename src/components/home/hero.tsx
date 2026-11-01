"use client";

import { CheckCircle2, Gamepad2, Sparkles } from "lucide-react";
import Reveal from "./reveal";
import { textPrimaryColor, textSecondaryColor } from "@/utils/colors";
import Image from "next/image";
import PrimaryButton from "./primary-button";
import Pill from "./pill";

export default function Hero() {
  return (
    <section
      id="home"
      className="overflow-hidden bg-[#0B1333] text-white relative"
    >
      <div className="absolute inset-0 bg-grid opacity-[.36] pointer-events-none" />
      <div className="absolute -top-44 right-[10%] h-[650px] w-[650px] rounded-full bg-[#5F4FE3]/20 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-52 left-[-9%] h-[440px] w-[440px] rounded-full bg-[#FFD34B]/10 blur-[100px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-9 pt-16 pb-16 md:pt-20 lg:pt-24 lg:pb-20">
        <div className="grid lg:grid-cols-[1.06fr_.94fr] gap-12 lg:gap-8 items-center">
          <div className="max-w-[700px] relative z-10">
            <Reveal>
              <Pill dark>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD34B]" />{" "}
                CODING • SOFTWARE • ARTIFICIAL INTELLIGENCE
              </Pill>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display mt-7 text-[clamp(3.35rem,6vw,6.6rem)] leading-[1.02] font-black tracking-[-.065em] text-balance">
                From first game to future engineer.{" "}
                <span className="gradient-text">Build what&apos;s next.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-7 text-white/68 text-base sm:text-[18px] max-w-[580px] leading-[1.78]">
                Children as young as five can start creating games with Scratch.
                Teens and adults can learn Python, build websites, and explore
                our complete Software &amp; AI Engineering pathway. Real
                courses. Real projects. Learning that grows with you.
              </p>
            </Reveal>
            <Reveal
              delay={0.28}
              className="mt-8 flex flex-col md:flex-row gap-3"
            >
              <PrimaryButton href="#courses">
                Start your 1-week free trial
              </PrimaryButton>
              <PrimaryButton href="#courses" variant="outline">
                Browse our courses
              </PrimaryButton>
            </Reveal>
            <Reveal
              delay={0.34}
              className="mt-8 grid md:grid-cols-2 gap-6 gap-y-3 text-[12px] sm:text-sm text-white/60 font-semibold"
            >
              <span className="inline-flex gap-2 items-center">
                <CheckCircle2 size={17} className="text-sun" /> Beginners
                friendly
              </span>
              <span className="inline-flex gap-2 items-center">
                <CheckCircle2 size={17} className="text-sun" /> 100% online
              </span>
              <span className="inline-flex gap-2 items-center">
                <CheckCircle2 size={17} className="text-sun" /> 3 Self-paced
                recorded classes
              </span>
              <span className="inline-flex gap-2 items-center">
                <CheckCircle2 size={17} className="text-sun" /> 3 live classes
                each week
              </span>
            </Reveal>
          </div>
          <Reveal
            delay={0.18}
            className="relative w-full max-w-[580px] mx-auto lg:ml-auto lg:mr-0 "
          >
            <div className="relative aspect-[1.02/1] rounded-[35px] sm:rounded-[48px] overflow-hidden border-[8px] border-white/10 bg-[#C5C6FD] shadow-[0_30px_100px_rgba(0,0,0,.4)]">
              <Image
                src="/assets/young-builders.jpg"
                alt="Two young learners smiling with laptops"
                fill
                priority
                sizes="(max-width:1024px) 100vw, 43vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080E2A]/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-7 right-7 text-white">
                <p className="text-xs font-black tracking-[.2em] text-sun uppercase mb-2">
                  Start young. Build strong.
                </p>
                <p className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Curiosity today.
                  <br />
                  Possibility tomorrow.
                </p>
              </div>
            </div>
            <div
              className={` ${textPrimaryColor} floating hidden sm:flex absolute -left-11 top-[5%] items-center gap-3 rounded-2xl bg-white text-ink p-3.5 pr-6 shadow-float rotate-[-5deg]`}
            >
              <div className="bg-[#e8e4ff] text-[#624fcd] rounded-xl p-3">
                <Gamepad2 size={23} />
              </div>
              <div>
                <div className="font-extrabold text-[13px]">My first game!</div>
                <div className={`text-[11px] ${textSecondaryColor} mt-0.5`}>
                  Made with Scratch ✨
                </div>
              </div>
            </div>
            <div className="floating-delay absolute -right-3 -bottom-20 md:bottom-[12%] rounded-2xl bg-[#171E3B] border border-white/15 p-4 shadow-float max-w-[225px]">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-2 h-2 bg-[#FF7D88] rounded-full" />
                <span className="w-2 h-2 bg-[#FFC75B] rounded-full" />
                <span className="w-2 h-2 bg-[#5FD6AE] rounded-full" />
                <span className="ml-auto text-[10px] text-white/40">
                  hello.py
                </span>
              </div>
              <code className="font-mono text-[11px] sm:text-xs">
                <span className="text-[#D9A8FF]">print</span>
                <span className="text-white/80">(</span>
                <span className="text-[#FFE48D]">
                  &quot;Hello, future!&quot;
                </span>
                <span className="text-white/80">)</span>
              </code>
              <div className="mt-3 rounded-md bg-white/5 text-[#95f0c4] text-[10px] px-2 py-1.5 font-mono">
                → Hello, future!
              </div>
            </div>
            <div className="absolute top-[-20px] right-[-15px] rotate-12 rounded-2xl bg-sun text-ink p-3.5 shadow-float">
              <Sparkles size={28} />
            </div>
          </Reveal>
        </div>
        <Reveal
          delay={0.3}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-20 pt-8 border-t border-white/15"
        >
          {[
            ["5+", "Start as young as age"],
            ["100", "Modules in our academy"],
            ["3×", "Live classes each week"],
            ["1 week", "Try before you enrol"],
          ].map(([value, label]) => (
            <div key={value} className="flex items-center gap-3.5 sm:gap-4">
              <strong className="text-3xl sm:text-4xl font-black text-sun tracking-tight">
                {value}
              </strong>
              <span className="max-w-[130px] text-white/55 text-[11px] sm:text-xs leading-snug font-semibold">
                {label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
