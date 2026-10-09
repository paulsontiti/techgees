
"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronDown,
  Code2,
  Cloud,
  Cpu,
  Database,
  GraduationCap,
  Layers3,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trophy,
  Workflow,
  ArrowUp,
} from "lucide-react";


const phases = [
  {
    number: 1,
    modules: "01–10",
    title: "Computer Foundations",
    outcome: "Command-Line Systems Developers",
    why: "Understand how computers work, how Linux and operating systems manage resources, how networking connects systems, and how Python instructs computers to perform tasks.",
    career:
      "Build foundational skills in programming, Linux administration, computer operations, and the technical concepts required for later software and AI engineering.",
    project:
      "Build computer tools, Python applications, a CLI Log Analyzer, and an automated file-management engine.",
    bigTech:
      "Develop the computer literacy and command-line skills needed to understand, operate, and troubleshoot the systems that power modern technology.",
    companies: [
      "Canonical",
      "Red Hat",
      "AWS",
      "DigitalOcean",
      "GitHub",
      "Google",
    ],
    icon: Terminal,
    color: "from-cyan-500 to-blue-600",
  },
  {
    number: 2,
    modules: "11–20",
    title: "Maths & Algorithms",
    outcome: "Algorithmic Problem Solvers",
    why: "Develop mathematical reasoning, computational thinking, data structures, and algorithms for solving increasingly complex problems.",
    career:
      "Build a strong foundation in discrete mathematics, algorithm design, complexity analysis, and efficient data organization.",
    project:
      "Build algorithms and problem-solving systems, including a Pathfinding Game Engine and an in-memory B-tree database indexer.",
    bigTech:
      "Efficient algorithms and data structures help applications process large amounts of information while managing execution time and memory usage.",
    companies: [
      "Google",
      "Meta",
      "Amazon",
      "Microsoft",
      "Bloomberg",
      "Goldman Sachs",
      "Palantir",
    ],
    icon: BrainCircuit,
    color: "from-violet-500 to-purple-700",
  },
  {
    number: 3,
    modules: "21–30",
    title: "Software Engineering",
    outcome: "Object-Oriented Software Architects",
    why: "Learn to design, build, test, and maintain reliable software using object-oriented programming, software architecture, and engineering principles.",
    career:
      "Develop practical skills in object-oriented design, testing, maintainability, reusable components, and architectural decision-making.",
    project:
      "Build professional software, including a pluggable payment-processing engine with support for dynamically integrated payment providers.",
    bigTech:
      "Well-designed software enables large engineering teams to collaborate, extend applications, test changes, and maintain complex systems reliably.",
    companies: [
      "Stripe",
      "Paystack",
      "Flutterwave",
      "Salesforce",
      "Oracle",
      "IBM",
      "Shopify",
    ],
    icon: Layers3,
    color: "from-orange-400 to-rose-600",
  },
  {
    number: 4,
    modules: "31–40",
    title: "Data & Machine Learning",
    outcome: "Data & Machine Learning Engineers",
    why: "Explore data processing, statistics, probability, and machine learning to understand how computers discover patterns and make predictions.",
    career:
      "Develop skills in data preparation, statistical analysis, feature engineering, classical machine learning, and predictive modeling.",
    project:
      "Build prediction systems, including an automated stock-analysis and financial-fraud detection system using classical machine-learning algorithms.",
    bigTech:
      "Reliable data and predictive models support recommendation engines, forecasting, fraud detection, risk assessment, and data-driven decisions.",
    companies: [
      "Netflix",
      "Spotify",
      "Uber",
      "Mastercard",
      "Visa",
      "Moniepoint",
      "Snowflake",
      "Databricks",
    ],
    icon: Database,
    color: "from-emerald-400 to-teal-700",
  },
  {
    number: 5,
    modules: "41–50",
    title: "Full-Stack Development",
    outcome: "Full-Stack AI Web Engineers",
    why: "Learn to build complete web applications by connecting user interfaces, backend services, APIs, databases, and AI capabilities.",
    career:
      "Develop frontend and backend engineering skills using modern web technologies, API design, authentication, databases, and deployment workflows.",
    project:
      "Build web and AI applications, including a real-time AI interface that streams language-model responses to users.",
    bigTech:
      "Modern digital products rely on responsive web interfaces, secure APIs, reliable backend services, and efficient communication between application components.",
    companies: [
      "Vercel",
      "Airbnb",
      "LinkedIn",
      "Meta",
      "X",
      "Stripe",
      "Figma",
      "Notion",
    ],
    icon: Code2,
    color: "from-blue-500 to-indigo-700",
  },
  {
    number: 6,
    modules: "51–60",
    title: "Deep Learning",
    outcome: "Deep Learning Specialists",
    why: "Understand neural networks, deep-learning mathematics, model training, and computer vision using modern frameworks such as PyTorch.",
    career:
      "Progress into neural-network development, model experimentation, computer vision, deep-learning evaluation, and AI performance optimization.",
    project:
      "Build AI and vision systems, including a real-time object-detection system and a custom image generator.",
    bigTech:
      "Deep learning powers image understanding, generative AI, robotics, medical imaging, and other applications that learn complex patterns from data.",
    companies: [
      "NVIDIA",
      "AMD",
      "Tesla",
      "Snap",
      "OpenAI",
      "Intuitive Surgical",
      "Pinterest",
    ],
    icon: Cpu,
    color: "from-fuchsia-500 to-purple-700",
  },
  {
    number: 7,
    modules: "61–70",
    title: "Mobile, Games & Edge AI",
    outcome: "Mobile & Edge AI Engineers",
    why: "Combine mobile application development, game programming, graphics, and AI that can run directly on supported devices.",
    career:
      "Develop skills in mobile engineering, game systems, interactive graphics, local model inference, and AI optimization for edge hardware.",
    project:
      "Build apps, games, and intelligent-device experiences, including an offline-first mobile fintech wallet with protected local storage and an on-device AI security prototype.",
    bigTech:
      "Mobile and edge technologies enable interactive applications, local intelligence, reduced latency, and experiences that can continue working without constant cloud connectivity.",
    companies: [
      "Apple",
      "Google",
      "Qualcomm",
      "Samsung",
      "Epic Games",
      "Unity Technologies",
    ],
    icon: Rocket,
    color: "from-pink-500 to-rose-700",
  },
  {
    number: 8,
    modules: "71–80",
    title: "Cloud & MLOps",
    outcome: "Cloud & MLOps Engineers",
    why: "Learn how databases, cloud infrastructure, containers, and automated deployment systems help applications operate reliably at scale.",
    career:
      "Develop practical skills in database management, cloud services, Docker, Kubernetes, infrastructure automation, CI/CD, and machine-learning operations.",
    project:
      "Build scalable applications and an automated cloud-infrastructure platform using Docker, Kubernetes, and Terraform.",
    bigTech:
      "Cloud infrastructure and MLOps help engineering teams deploy applications, manage workloads, monitor services, and operate software and machine-learning systems reliably.",
    companies: [
      "AWS",
      "Microsoft Azure",
      "Google Cloud",
      "HashiCorp",
      "Cloudflare",
      "Datadog",
    ],
    icon: Cloud,
    color: "from-sky-400 to-cyan-700",
  },
  {
    number: 9,
    modules: "81–90",
    title: "Systems & Computer Science",
    outcome: "Systems Programming Engineers",
    why: "Explore computer science fundamentals, low-level programming, operating systems, memory management, and compiler design.",
    career:
      "Develop skills in C, C++, Rust, systems programming, interpreters, compilation, runtime environments, and performance engineering.",
    project:
      "Build systems software, including a compiled scripting-language interpreter and a WebAssembly runtime engine.",
    bigTech:
      "Systems knowledge supports the development of operating systems, browsers, programming-language runtimes, game engines, and high-performance infrastructure.",
    companies: [
      "Mozilla",
      "Cloudflare",
      "Tesla",
      "Apple",
      "Intel",
      "Microsoft",
      "ARM",
      "ByteDance",
    ],
    icon: Workflow,
    color: "from-amber-400 to-orange-700",
  },
  {
    number: 10,
    modules: "91–100",
    title: "Generative AI & Architecture",
    outcome: "Advanced AI & Distributed Systems Architects",
    why: "Explore large language models, transformer architectures, retrieval-augmented generation, AI agents, and distributed systems.",
    career:
      "Develop advanced skills in generative AI engineering, LLM application development, agent orchestration, distributed architecture, and intelligent-platform design.",
    project:
      "Build intelligent platforms, including an autonomous multi-agent AI system and a distributed event-sourced messaging platform.",
    bigTech:
      "Advanced AI and distributed architecture help organizations develop intelligent applications, coordinate large workloads, and build resilient technology platforms.",
    companies: [
      "OpenAI",
      "Anthropic",
      "Google DeepMind",
      "Meta AI",
      "AWS Bedrock",
      "Cohere",
    ],
    icon: BrainCircuit,
    color: "from-violet-500 to-indigo-800",
  },
];

const capstones = [
  {
    number: "01",
    phaseNumber: 1,
    phase: "Computer Foundations",
    title: "Build a Virtual Computer Simulator",
    description:
      "Create an interactive simulator that demonstrates how binary numbers, memory, registers, the arithmetic logic unit, and basic CPU instructions work together to execute simple programs.",
    stack: ["Python", "Pygame", "Computer Architecture"],
    icon: Cpu,
  },
  {
    number: "02",
    phaseNumber: 2,
    phase: "Maths & Algorithms",
    title: "Algorithm Visualizer & Maze Solver",
    description:
      "Build an interactive application that visualizes sorting, searching, recursion, graph traversal, and pathfinding algorithms. Compare their performance using different inputs.",
    stack: ["Python", "Algorithms", "Data Structures"],
    icon: Workflow,
  },
  {
    number: "03",
    phaseNumber: 3,
    phase: "Software Engineering",
    title: "Student Assessment & Learning System",
    description:
      "Design a maintainable application with user roles, validation, reusable modules, automated tests, error handling, documentation, and version control.",
    stack: ["Python", "OOP", "Pytest", "Git"],
    icon: GraduationCap,
  },
  {
    number: "04",
    phaseNumber: 4,
    phase: "Data & Machine Learning",
    title: "Intelligent Financial Fraud Detection",
    description:
      "Build a machine-learning pipeline that cleans transaction data, engineers features, trains classification models, and evaluates suspicious transactions while measuring false positives and detection accuracy.",
    stack: ["Python", "Pandas", "Scikit-learn"],
    icon: ShieldCheck,
  },
  {
    number: "05",
    phaseNumber: 5,
    phase: "Full-Stack Development",
    title: "Full-Stack Learning & Mentorship Platform",
    description:
      "Build a learning platform with authentication, course modules, recorded lessons, progress tracking, assessments, mentor profiles, and a responsive dashboard.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    icon: Code2,
  },
  {
    number: "06",
    phaseNumber: 5,
    phase: "Full-Stack Development",
    title: "Real-Time Collaboration Workspace",
    description:
      "Create a collaborative workspace featuring real-time messaging, shared tasks, notifications, role-based permissions, persistent data, and live activity updates.",
    stack: ["Next.js", "WebSockets", "Redis"],
    icon: Workflow,
  },
  {
    number: "07",
    phaseNumber: 6,
    phase: "Deep Learning",
    title: "Computer Vision Recognition System",
    description:
      "Train and evaluate a neural network that classifies images or detects objects. Build an interface for testing predictions and examine model performance on unfamiliar data.",
    stack: ["Python", "PyTorch", "OpenCV"],
    icon: BrainCircuit,
  },
  {
    number: "08",
    phaseNumber: 7,
    phase: "Mobile, Games & Edge AI",
    title: "AI-Powered Mobile Learning Companion",
    description:
      "Develop a mobile application that helps learners track goals, complete quizzes, and access selected learning features offline. Add a lightweight on-device AI feature where supported.",
    stack: ["React Native", "SQLite", "ONNX Runtime"],
    icon: Rocket,
  },
  {
    number: "09",
    phaseNumber: 8,
    phase: "Cloud & MLOps",
    title: "Cloud Deployment & Model Monitoring Platform",
    description:
      "Containerize an application, automate testing and deployment, provision cloud infrastructure, and monitor application health and machine-learning model performance.",
    stack: ["Docker", "GitHub Actions", "Kubernetes"],
    icon: Cloud,
  },
  {
    number: "10",
    phaseNumber: 9,
    phase: "Systems & Computer Science",
    title: "Programming Language & Mini Compiler",
    description:
      "Design a small programming language with its own syntax, lexer, parser, abstract syntax tree, interpreter, error reporting, and automated test suite.",
    stack: ["Python or Rust", "Parsing", "Abstract Syntax Trees"],
    icon: Terminal,
  },
  {
    number: "11",
    phaseNumber: 10,
    phase: "Generative AI & Architecture",
    title: "Enterprise AI Knowledge Assistant",
    description:
      "Build a retrieval-augmented generation system that processes documents, creates embeddings, retrieves relevant information, and generates grounded answers with source references.",
    stack: ["Python", "LLM APIs", "Qdrant"],
    icon: BrainCircuit,
  },
  {
    number: "12",
    phaseNumber: 10,
    phase: "Generative AI & Architecture",
    title: "Autonomous Multi-Agent AI Platform",
    description:
      "Build a coordinated team of AI agents that plans tasks, uses approved tools, shares structured results, handles failures, and completes multi-step workflows with human approval and evaluation.",
    stack: ["Python", "LLM APIs", "LangGraph"],
    icon: Sparkles,
  },
];

const stats = [
  { value: "10", label: "Program phases" },
  { value: "100", label: "Learning modules" },
  { value: "12", label: "Master capstones planned" },
];

export default function ProgramPhases() {
  const [expanded, setExpanded] = useState<number | null>(1);
  const [showAll, setShowAll] = useState(false);

  return (
    <section
      id="program-phases"
      className="relative overflow-hidden bg-[#050B19] py-20 text-white sm:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -right-40 top-[45%] h-96 w-96 rounded-full bg-yellow-400/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-4xl text-center sm:mb-16"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">
            <Sparkles size={15} />
            The Software And AI Curriculum
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Deep Dive Into the{" "}
            <span className="text-yellow-400">10 Program Phases</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            A structured journey from Python and computer fundamentals to
            advanced AI, cloud infrastructure, and distributed systems.
            Learn the foundations, build real projects, and grow your
            engineering portfolio one phase at a time.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-[135px] rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-center backdrop-blur"
              >
                <div className="text-3xl font-black text-yellow-400">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Curriculum list */}
        <div className="mx-auto max-w-5xl space-y-4">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const isOpen = expanded === phase.number;

            return (
              <motion.article
                key={phase.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-yellow-400/40 bg-white/[0.055]"
                    : "border-white/10 bg-white/[0.025] hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpanded(isOpen ? null : phase.number)
                  }
                  aria-expanded={isOpen}
                  aria-controls={`phase-panel-${phase.number}`}
                  className="flex w-full items-center gap-4 p-4 text-left sm:gap-5 sm:p-6"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${phase.color} shadow-lg sm:h-14 sm:w-14`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-yellow-400 sm:text-xs">
                        Phase {String(phase.number).padStart(2, "0")}
                      </span>
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-400 sm:text-xs">
                        Modules {phase.modules}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold leading-6 text-white sm:text-lg">
                      {phase.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                      Become: {phase.outcome}
                    </p>
                  </div>

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
                      isOpen
                        ? "rotate-180 border-yellow-400 bg-yellow-400 text-[#050B19]"
                        : "border-white/15 text-slate-300"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`phase-panel-${phase.number}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 px-4 pb-5 pt-5 sm:px-6 sm:pb-7 sm:pt-6">
                        <div className="mb-6 grid gap-5 md:grid-cols-2">
                          <InfoBlock
                            icon={<GraduationCap size={18} />}
                            title="Why Take This Phase?"
                            text={phase.why}
                          />
                          <InfoBlock
                            icon={<Trophy size={18} />}
                            title="Career Importance"
                            text={phase.career}
                          />
                          <InfoBlock
                            icon={<Rocket size={18} />}
                            title="Practical Project"
                            text={phase.project}
                            highlight
                          />
                          <InfoBlock
                            icon={<Building2 size={18} />}
                            title="Why Big Tech Needs It"
                            text={phase.bigTech}
                          />
                        </div>

                        <div className="rounded-xl border border-white/10 bg-black/20 p-4 sm:p-5">
                          <div className="mb-3 flex items-center gap-2">
                            <Building2
                              size={17}
                              className="text-yellow-400"
                            />
                            <h4 className="text-sm font-bold text-white">
                              Companies Using These Skill Sets
                            </h4>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {phase.companies.map((company) => (
                              <span
                                key={company}
                                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300"
                              >
                                {company}
                              </span>
                            ))}
                          </div>
                          <p className="mt-3 text-[11px] leading-5 text-slate-500">
                            These are examples of companies working in
                            related areas, not a guarantee of employment or
                            recruitment eligibility.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        {/* Expand / collapse controls */}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setShowAll(!showAll);
              setExpanded(showAll ? 1 : null);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-yellow-400/50 hover:text-yellow-300"
          >
            {showAll ? "Show First Phase" : "Collapse All Phases"}
            {showAll ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </button>

          <button
            type="button"
            onClick={() => setExpanded(expanded === null ? 1 : null)}
            className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-black text-[#050B19] transition hover:bg-yellow-300"
          >
            {expanded === null ? "Explore Phase 1" : "Close Current Phase"}
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Portfolio section */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
              <CheckCircle2 size={15} />
              Build. Ship. Demonstrate.
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              Real-World{" "}
              <span className="text-yellow-400">Portfolio Capstones</span>
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Apply your knowledge to substantial engineering projects.
              Develop a portfolio that demonstrates your problem-solving,
              technical judgment, and ability to build working systems.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capstones.map((project, index) => {
              const Icon = project.icon;

              return (
                <motion.div
                  key={project.number}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/35 hover:bg-white/[0.06] sm:p-6"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-12 w-full gap-4 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 transition group-hover:bg-yellow-400 group-hover:text-[#050B19]">
                      <Icon size={23} /><span className="text-[10px] font-black uppercase tracking-[0.15em]  sm:text-xs">
                        {project.phase}
                      </span>
                    </div>
                    <span className="text-2xl font-black text-white/15">
                      {project.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold leading-7 text-white">
                    {project.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1.5 text-[11px] font-semibold text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-2xl border border-yellow-400/20 bg-gradient-to-r from-yellow-400/[0.09] to-transparent p-6 sm:flex-row sm:p-8">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-yellow-300">
                <Trophy size={18} />
                Your Engineering Portfolio
              </div>
              <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                Learn the concepts. Build the systems.
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                The full pathway targets 12 master capstones. 
              </p>
            </div>

            <a
              href="#journey"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-black text-[#050B19] transition hover:bg-yellow-300"
            >
              Explore Curriculum
              <ArrowUpRight size={17} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoBlock({
  icon,
  title,
  text,
  highlight = false,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-yellow-400/20 bg-yellow-400/[0.05]"
          : "border-white/[0.07] bg-white/[0.025]"
      }`}
    >
      <div className="mb-2 flex items-center gap-2.5">
        <span
          className={
            highlight ? "text-yellow-400" : "text-slate-400"
          }
        >
          {icon}
        </span>
        <h4 className="text-sm font-bold text-white">{title}</h4>
      </div>
      <p className="text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}