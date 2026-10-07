"use client";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
  Sparkles,
  Rocket,
  BookOpen,
  Code2,
} from "lucide-react";
import Link from "next/link";
import { Phase, phases } from "../lib/phase";
import PhaseModules from "./phase-module";
import Logo from "@/components/logo";

const WA = "https://wa.me/2349167704504";
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function PhasePage({ phase: p }: { phase: Phase }) {
  const index = Number(p.number) - 1;
  const prev = phases[index - 1];
  const next = phases[index + 1];
  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#07152f]">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#07152f]/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Logo/>
          <div className="hidden items-center gap-5 text-sm font-bold md:flex">
            <Link href="/software-ai-engineering/#journey">All phases</Link>
            <a
              href="#curriculum"
              className="rounded-full bg-[#ffd429] px-5 py-2.5 text-[#07152f]"
            >
              Start Free Trial
            </a>
          </div>
          <a href={WA} target="_blank" rel="noreferrer" className="md:hidden">
            <MessageCircle />
          </a>
        </div>
      </nav>
      <section className="relative overflow-hidden bg-[#07152f] text-white">
        <div className={`absolute inset-0 bg-gradient-to-br ${p.color}`} />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-28">
          <div className="relative">
            <Link
              href="/software-ai-engineering/#journey"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white"
            >
              <ArrowLeft size={16} /> Back to 100-module journey
            </Link>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black">
              <span className="text-[#ffd429]">PHASE {p.number}</span>
              <span>•</span>
              <span>{p.age}</span>
            </div>
            <h1 className="mt-6 text-5xl font-black leading-[.95] tracking-[-.04em] sm:text-6xl lg:text-7xl">
              {p.emoji} {p.title}
            </h1>
            <p className="mt-5 text-2xl font-bold text-[#ffd429]">
              {p.subtitle}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {p.intro}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#curriculum"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ffd429] px-7 py-4 font-black text-[#07152f]"
              >
                Start 1-Week Free Trial <ArrowRight size={18} />
              </a>
              <a
                href="#curriculum"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-7 py-4 font-bold"
              >
                Explore this phase
              </a>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-full bg-[#4f7cff]/20 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[.07] p-6 backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-white p-7 text-[#07152f]">
                <div className="text-7xl">{p.emoji}</div>
                <p className="mt-8 text-xs font-black uppercase tracking-[.2em] text-[#4f7cff]">
                  The learner promise
                </p>
                <h2 className="mt-3 text-3xl font-black leading-tight">
                  {p.promise}
                </h2>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {p.skills.map((s:any) => (
                    <div
                      key={s}
                      className="rounded-2xl bg-[#f1f4f9] p-4 font-bold"
                    >
                      ✓ {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="curriculum" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="text-sm font-black uppercase tracking-[.2em] text-[#4f7cff]">
              What your child explores
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Knowledge that turns into{" "}
              <span className="text-[#4f7cff]">capability.</span>
            </h2>
          </Reveal>

          <Reveal className="mt-12">
            <PhaseModules phaseNumber={p.number} modules={p.modules} />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Reveal
              className="rounded-[2rem] border border-slate-200 p-7"
              delay={0.05}
            >
              <BookOpen className="text-[#4f7cff]" />
              <h3 className="mt-5 text-xl font-black">Learn</h3>
              <ul className="mt-5 space-y-3">
                {p.learn.map((x:any) => (
                  <li
                    key={x}
                    className="flex gap-3 text-sm font-semibold text-slate-600"
                  >
                    <Check className="shrink-0 text-emerald-500" size={18} />
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal
              className="rounded-[2rem] bg-[#07152f] p-7 text-white"
              delay={0.1}
            >
              <Code2 className="text-[#ffd429]" />
              <h3 className="mt-5 text-xl font-black">Build</h3>
              <ul className="mt-5 space-y-3">
                {p.build.map((x:any) => (
                  <li
                    key={x}
                    className="flex gap-3 text-sm font-semibold text-slate-300"
                  >
                    <Rocket className="shrink-0 text-[#ffd429]" size={18} />
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal
              className="rounded-[2rem] border border-slate-200 p-7"
              delay={0.15}
            >
              <Sparkles className="text-[#4f7cff]" />
              <h3 className="mt-5 text-xl font-black">Develop</h3>
              <ul className="mt-5 space-y-3">
                {p.outcomes.map((x:any) => (
                  <li
                    key={x}
                    className="flex gap-3 text-sm font-semibold text-slate-600"
                  >
                    <Check className="shrink-0 text-emerald-500" size={18} />
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fc] py-20">
        <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
          <Reveal>
            <p className="text-sm font-black uppercase tracking-[.2em] text-[#4f7cff]">
              How learning happens
            </p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">
              Learn it. Build it. Explain it. Improve it.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Every phase combines self-paced recorded lessons, practice,
              projects and live interaction so learning becomes something the
              student can demonstrate.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-4">
            {[
              "🎬 Recorded classes",
              "🧑‍🏫 3 live classes weekly",
              "📚 Book club",
              "🏆 Projects & challenges",
            ].map((x, i) => (
              <Reveal
                key={x}
                delay={i * 0.05}
                className="rounded-2xl bg-white p-5 font-black shadow-sm"
              >
                {x}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ffd429] py-20">
        <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
          <Reveal>
            <p className="text-sm font-black uppercase tracking-[.2em]">
              🎁 1-week free trial
            </p>
            <h2 className="mt-4 text-5xl font-black leading-none tracking-tight sm:text-6xl">
              See if this phase is right for your child.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-8 text-[#07152f]/75">
              Your child can experience the Global Genius learning environment
              before you commit. We can also help you choose the right starting
              phase based on age and readiness.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#07152f] px-7 py-4 font-black text-white"
              >
                Chat on WhatsApp <MessageCircle size={19} />
              </a>
              <Link
                href="/#journey"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 font-black"
              >
                Compare all phases <ArrowRight size={19} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#07152f] py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          {prev ? (
            <Link
              href={`/phases/${prev.slug}`}
              className="inline-flex items-center gap-2 font-bold text-slate-300 hover:text-white"
            >
              <ArrowLeft size={17} /> Phase {prev.number}: {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/software-ai-engineering/phases/${next.slug}`}
              className="inline-flex items-center gap-2 font-bold text-slate-300 hover:text-white"
            >
              Phase {next.number}: {next.title} <ArrowRight size={17} />
            </Link>
          ) : (
            <Link href={`/software-ai-engineering/phases/${phases[0].slug}`} className="font-bold text-[#ffd429]">
              Start the first phase  →
            </Link>
          )}
        </div>
      </section>
      <footer className="bg-[#07152f] px-5 pb-10 text-center text-sm text-slate-500">
        © 2026 The Global Genius • globalgenius.community • 09167704504 •
        08132658045
      </footer>
      <a
        href={WA}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl"
      >
        <MessageCircle />
      </a>
    </main>
  );
}
