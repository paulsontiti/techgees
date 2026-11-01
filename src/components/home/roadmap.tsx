import { ArrowRight, BrainCircuit, Code2, Cpu, Gamepad2, Network, Terminal } from "lucide-react";
import Heading from "./heading";
import Reveal from "./reveal";

export default function Roadmap() {
  const steps = [
    { name: "SCRATCH", small: "Create", icon: Gamepad2 },
    { name: "PYTHON", small: "Code", icon: Terminal },
    { name: "COMPUTER SCIENCE", small: "Solve", icon: Cpu },
    { name: "SOFTWARE", small: "Engineer", icon: Code2 },
    { name: "ARTIFICIAL INTELLIGENCE", small: "Learn", icon: BrainCircuit },
    { name: "ADVANCED SYSTEMS", small: "Architect", icon: Network },
  ];
  return (
    <section className="bg-[#101A3C] text-white py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[.3]" />
      <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9 relative">
        <Heading
          centered
          light
          eyebrow="ONE COMPLETE JOURNEY"
          title={
            <>
              From your first line of code to{" "}
              <span className="gradient-text">what comes next.</span>
            </>
          }
          description="Our pathway grows with a learner’s readiness. No rush, no shortcuts—just meaningful progress, one project at a time."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.name} delay={i * 0.06}>
                <div className="h-full rounded-[22px] bg-white/[.075] border border-white/10 px-4 py-5 text-center relative hover:bg-white/[.12] transition-colors">
                  <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-sun flex items-center justify-center text-ink">
                    <Icon size={25} />
                  </div>
                  <span className="text-white/45 text-[10px] tracking-[.17em] font-bold">
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-2 text-[12px] font-black tracking-wide min-h-[34px]">
                    {step.name}
                  </div>
                  <p className="mt-1 text-white/50 text-xs">{step.small}</p>
                  {i < 5 && (
                    <ArrowRight
                      size={15}
                      className="hidden lg:block text-sun absolute top-[31%] right-[-13px] z-10"
                    />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm text-white/50">
          Ages and readiness guide entry points; every learner progresses at an
          individual pace.
        </p>
      </div>
    </section>
  );
}