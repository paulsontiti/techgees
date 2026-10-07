"use client";

import Logo from "@/components/logo";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Check,
  ChevronDown,
  Code2,
  Gamepad2,
  Globe2,
  Layers3,
  Menu,
  MessageCircle,
  Play,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { phases } from "../lib/phase";
import { useRouter } from "next/navigation";
import PaymentPlans from "@/app/(course)/courses/components/paypent-plan";
import Link from "next/link";

const WA = "https://wa.me/2349167704504";
export const ChatOnWhatsApp = ()=>{
  return   <Link
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-7 py-4 font-bold"
              >
                Chat on WhatsApp <MessageCircle size={18} />
              </Link>
}

const ages = [
  {
    age: "5–7",
    title: "Scratch Explorer",
    tag: "CREATE • PLAY • DISCOVER",
    color: "from-yellow-300 to-amber-100",
    items: [
      "Stories & animation",
      "Simple games",
      "Logic & creativity",
      "Computational thinking",
    ],
  },
  {
    age: "8–10",
    title: "Scratch Creator",
    tag: "CODE • BUILD • EXPERIMENT",
    color: "from-blue-200 to-indigo-100",
    items: [
      "Variables & loops",
      "Game mechanics",
      "Conditions & events",
      "Transition toward Python",
    ],
  },
  {
    age: "11–14",
    title: "Engineering Foundation",
    tag: "UNDERSTAND • SOLVE • BUILD",
    color: "from-violet-200 to-fuchsia-100",
    items: [
      "Python & algorithms",
      "Web development",
      "Data structures",
      "AI foundations",
    ],
  },
  {
    age: "15+",
    title: "Advanced Engineering",
    tag: "ENGINEER • SPECIALIZE • CREATE",
    color: "from-emerald-200 to-cyan-100",
    items: [
      "Machine learning",
      "Generative AI",
      "Cloud & systems",
      "AI architecture",
    ],
  },
];

const builds = [
  [
    Gamepad2,
    "Games",
    "From simple Scratch games to advanced interactive systems.",
  ],
  [Globe2, "Web Apps", "Modern websites, APIs and full-stack applications."],
  [Brain, "AI Projects", "Machine learning, RAG, agents and intelligent apps."],
  [
    Layers3,
    "Systems",
    "Cloud applications, systems software and architecture.",
  ],
];

export function Reveal({
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const goToPhase = (slug: string) => {
    router.push(`/software-ai-engineering/phases/${slug}`);
  };
  return (
    <main className="overflow-hidden">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07152f]/90 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Logo />
          <div className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <a href="#journey">Journey</a>
            <a href="#ages">Age Paths</a>
            <a href="#projects">Projects</a>
            <a href="#how">How It Works</a>
            <a href="#payment">Payment Plans</a>
            <a
              href="#trial"
              className="rounded-full bg-[#ffd429] px-5 py-2.5 text-[#07152f]"
            >
              Start Free Trial
            </a>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="border-t border-white/10 px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4 font-semibold">
              <a onClick={() => setOpen(false)} href="#journey">
                Journey
              </a>
              <a onClick={() => setOpen(false)} href="#ages">
                Age Paths
              </a>
              <a onClick={() => setOpen(false)} href="#projects">
                Projects
              </a>
              <a onClick={() => setOpen(false)} href="#how">
                How It Works
              </a>
              <a
                href="#trial"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-[#ffd429] px-5 py-3 text-center text-[#07152f]"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        )}
      </nav>

      <section
        id="top"
        className="hero-glow grid-bg relative min-h-[760px] bg-[#07152f] pt-28 text-white"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-28">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold"
            >
              <Sparkles size={16} className="text-[#ffd429]" /> 1-WEEK FREE
              TRIAL
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-4xl text-5xl font-black leading-[.98] tracking-[-.04em] sm:text-6xl lg:text-7xl"
            >
              Start your child’s{" "}
              <span className="text-[#ffd429]">technology journey</span> at age
              5.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
            >
              A progressive online learning journey from{" "}
              <strong className="text-white">
                Scratch → Python → Software Engineering → AI → Intelligent
                Systems.
              </strong>
            </motion.p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#trial"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ffd429] px-7 py-4 font-black text-[#07152f] shadow-lg shadow-yellow-400/20"
              >
                Start 1-Week Free Trial{" "}
                <ArrowRight
                  size={19}
                  className="transition group-hover:translate-x-1"
                />
              </a>
            <ChatOnWhatsApp/>
            </div>
            <div className="mt-10 flex flex-wrap gap-3 text-sm font-semibold text-slate-300">
              <span>🌍 100% Online</span>
              <span>•</span>
              <span>🎬 Self-Paced</span>
              <span>•</span>
              <span>👨‍🏫 3 Live Classes Weekly</span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-[#4f7cff]/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-[#f7f9fc] p-5 text-[#07152f]">
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-black">THE TECHNOLOGY JOURNEY</span>
                  <span className="rounded-full bg-[#ffd429] px-3 py-1 text-xs font-black">
                    AGES 5+
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    ["🌱", "Scratch", "Create & discover"],
                    ["🐍", "Python", "Code & understand"],
                    ["🧠", "Computer Science", "Think & solve"],
                    ["💻", "Software Engineering", "Design & build"],
                    ["🤖", "Artificial Intelligence", "Learn & create"],
                    ["🏗️", "Intelligent Systems", "Engineer & architect"],
                  ].map((x, i) => (
                    <motion.div
                      key={x[1]}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.1 }}
                      className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-xl">
                        {x[0]}
                      </span>
                      <div>
                        <div className="font-black">{x[1]}</div>
                        <div className="text-xs text-slate-500">{x[2]}</div>
                      </div>
                      <ArrowRight
                        className="ml-auto text-slate-300"
                        size={17}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f7f9fc] to-transparent" />
      </section>

      <section className="bg-[#f7f9fc] py-20">
        <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
          <Reveal>
            <p className="text-sm font-black uppercase tracking-[.2em] text-[#4f7cff]">
              A different kind of technology education
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              What if your child could{" "}
              <span className="text-[#4f7cff]">create</span> with technology?
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Children already use technology every day. We want to help them
              move from simply consuming digital products to understanding,
              building, explaining and improving them.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <div className="text-3xl">👀</div>
              <h3 className="mt-4 font-black">Curious</h3>
              <p className="mt-2 text-sm text-slate-500">
                Ask questions and explore how things work.
              </p>
            </div>
            <div className="rounded-3xl bg-[#07152f] p-7 text-white shadow-xl">
              <div className="text-3xl">🛠️</div>
              <h3 className="mt-4 font-black">Builders</h3>
              <p className="mt-2 text-sm text-slate-300">
                Turn ideas into real projects.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <div className="text-3xl">🧠</div>
              <h3 className="mt-4 font-black">Thinkers</h3>
              <p className="mt-2 text-sm text-slate-500">
                Develop problem-solving and learning habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="ages" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-[.2em] text-[#4f7cff]">
                Ages 5+
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                The right starting point for every stage.
              </h2>
              <p className="mt-5 text-lg text-slate-600">
                Children can start where they are and progress as their
                confidence, skills and readiness grow.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {ages.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06}>
                <div
                  className={`h-full rounded-[2rem] bg-gradient-to-br ${a.color} p-7`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/70 px-3 py-1 text-sm font-black">
                      AGES {a.age}
                    </span>
                    <span className="text-2xl">
                      {i === 0 ? "🌱" : i === 1 ? "🚀" : i === 2 ? "🧑‍💻" : "🧠"}
                    </span>
                  </div>
                  <h3 className="mt-8 text-2xl font-black">{a.title}</h3>
                  <p className="mt-2 text-xs font-black tracking-widest opacity-70">
                    {a.tag}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm font-semibold">
                    {a.items.map((x) => (
                      <li key={x} className="flex gap-2">
                        <Check size={17} className="mt-0.5 shrink-0" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="journey" className="bg-[#07152f] py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[.2em] text-[#ffd429]">
                  The long-term pathway
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                  100 modules. 10 phases.{" "}
                  <span className="text-[#ffd429]">One journey.</span>
                </h2>
              </div>
              <p className="max-w-xl text-slate-300">
                A serious technology foundation developed layer by layer — not a
                race to finish lessons, but a progressive path that can grow
                with the learner.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {phases.map((phase, i) => (
              <Reveal key={phase.number} delay={i * 0.03}>
                <div
                  onClick={() => {
                    goToPhase(phase.slug);
                  }}
                  className="relative hover:cursor-pointer group h-full rounded-3xl border border-white/10 bg-white/[.06] p-5 transition hover:-translate-y-1 hover:bg-white/[.1]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#ffd429]">
                      PHASE {phase.number}
                    </span>
                    <span className="text-2xl">{phase.emoji}</span>
                  </div>
                  <h3 className="mt-4 font-black">{phase.title}</h3>
                  <h5 className="mt-2 text-xs">{phase.subtitle}</h5>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {phase.intro}
                  </p>
                  <div className="mt-5 mb-4 border-t border-white/10 pt-4 text-xs font-bold text-slate-300">
                    {phase.promise}
                  </div>
                  <span className="absolute bottom-2 right-4  text-[#ffd429]">Explore →</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <PaymentPlans  freeTrialUrl="/software-ai-engineering/#journey"/>

      <section id="projects" className="bg-[#f7f9fc] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-black uppercase tracking-[.2em] text-[#4f7cff]">
                Learning by building
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                {`Don't just watch.`} <span className="text-[#4f7cff]">Build.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
                Students progressively turn concepts into projects they can
                explain, improve and add to their portfolio.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {builds.map(([Icon, title, desc], i) => {
              const I = Icon as typeof Code2;
              return (
                <Reveal key={title as string} delay={i * 0.06}>
                  <div className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-slate-100">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#07152f] text-[#ffd429]">
                      <I size={27} />
                    </div>
                    <h3 className="mt-7 text-xl font-black">
                      {title as string}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {desc as string}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3 text-sm font-bold">
            {[
              "Games",
              "Websites",
              "APIs",
              "Data Systems",
              "ML Models",
              "Neural Networks",
              "Mobile Apps",
              "Cloud Apps",
              "RAG Systems",
              "AI Agents",
            ].map((x) => (
              <span
                key={x}
                className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200"
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-black uppercase tracking-[.2em] text-[#4f7cff]">
                Built for modern family life
              </p>
              <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                Flexible learning. Real interaction.
              </h2>
            </div>
          </Reveal>
          {/* <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                Play,
                "Self-Paced",
                "Watch → pause → practice → rewatch → build.",
              ],
              [
                Code2,
                "3 Live Classes Weekly",
                "Ask questions, review projects and get guidance.",
              ],
              [
                "📚",
                "Book Club",
                "Build the habit of reading, thinking and discussing.",
              ],
              [
                Zap,
                "Challenges",
                "Turn learning into action through projects and challenges.",
              ],
            ].map(([Icon, title, desc], i) => {
              const C =
                typeof Icon === "string" ? null : (Icon as typeof Code2);
              return (
                <Reveal key={title as string} delay={i * 0.05}>
                  <div className="rounded-3xl border border-slate-200 p-7">
                    <div className="text-3xl">
                      {typeof Icon === "string" ? (
                        Icon
                      ) : (
                        <C size={27} className="text-[#4f7cff]" />
                      )}
                    </div>
                    <h3 className="mt-6 font-black">{title as string}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {desc as string}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div> */}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#07152f] py-24 text-white">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#4f7cff]/20 blur-3xl" />
        <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
          <Reveal>
            <div className="mx-auto mb-7 grid h-16 w-16 place-items-center rounded-2xl bg-[#ffd429] text-[#07152f]">
              <Sparkles />
            </div>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Skills first. Certificates later.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              As students mature, the pathway can prepare them to explore
              relevant certifications. But the foundation comes first:
              understanding, projects and real skills.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                "PCEP",
                "PCAP",
                "GitHub Foundations",
                "AWS",
                "Azure",
                "Google Cloud",
                "Linux",
                "Kubernetes",
                "Terraform",
              ].map((x) => (
                <span
                  key={x}
                  className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold"
                >
                  {x}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="trial" className="bg-[#ffd429] py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_.8fr] lg:px-8 lg:items-center">
          <Reveal>
            <p className="text-sm font-black uppercase tracking-[.2em]">
              🎁 1-week free trial
            </p>
            <h2 className="mt-4 text-5xl font-black leading-none tracking-tight sm:text-6xl">
              Let your child <span className="text-[#4f7cff]">try it.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-[#07152f]/75">
              Start with Scratch Foundation or explore the Software & AI
              Engineering pathway if your child is ready. Experience the
              platform before you commit.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#07152f] px-7 py-4 font-black text-white shadow-xl"
              >
                Start on WhatsApp <MessageCircle size={19} />
              </a>
              <a
                href="https://globalgenius.community"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 font-black text-[#07152f]"
              >
                Visit Platform <ArrowRight size={19} />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"
            >
              <h3 className="text-2xl font-black">Parent enquiry</h3>
              <p className="mt-2 text-sm text-slate-500">
                {`Tell us a little about your child and we'll help you choose a
                starting point.`}
              </p>
              <div className="mt-6 space-y-4">
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-[#4f7cff]"
                  placeholder="Parent's name"
                />
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-[#4f7cff]"
                  placeholder="WhatsApp / phone number"
                />
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-[#4f7cff]"
                  placeholder="Child's age"
                />
                <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none focus:border-[#4f7cff]">
                  <option>Scratch Foundation</option>
                  <option>Python</option>
                  <option>Software & AI Engineering</option>
                  <option>Not sure — I need guidance</option>
                </select>
                <button className="w-full rounded-xl bg-[#07152f] px-5 py-4 font-black text-white">
                  Request Free Trial 🚀
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#07152f] px-5 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 font-black">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ffd429] text-[#07152f]">
                G
              </span>
              The Global Genius
            </div>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
              Software & AI Engineering Academy for the next generation of
              builders, thinkers and creators.
            </p>
          </div>
          <div className="text-sm text-slate-400">
            <div>🌐 globalgenius.community</div>
            <div className="mt-2">📱 09167704504 • 08132658045</div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs text-slate-500">
          © 2026 The Global Genius. Learn. Build. Earn. Grow.
        </div>
      </footer>

      <a
        href={WA}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105"
      >
        <MessageCircle />
      </a>
    </main>
  );
}
