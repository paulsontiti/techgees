import { BrainCircuit, Cloud, Code2, Compass, Gamepad2, LucideIcon, Sparkles, Wallet } from "lucide-react";
import Heading from "./heading";
import Pill from "./pill";
import { capstones } from "@/lib/content";
import Reveal from "./reveal";

export default function Projects() {
  const iconMap: Record<string, LucideIcon> = {
    brain: BrainCircuit,
    wallet: Wallet,
    code: Code2,
    game: Gamepad2,
    eye: Compass,
    cloud: Cloud,
  };
  return (
    <section id="projects" className=" bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-9">
        <div className="flex flex-col lg:flex-row lg:items-end md:justify-between gap-6 mb-11">
          <Heading
            eyebrow="NOT JUST TUTORIALS"
            title={
              <>
                Learn it. Build it.{" "}
                <span className="text-[#7862D8]">Show it.</span>
              </>
            }
            description="The most important part of learning is what you can do with it. Students work toward a portfolio of practical projects as their skills grow."
          />
          <Pill>
            <Sparkles size={13} /> PROJECT-FIRST LEARNING
          </Pill>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capstones.map((project, i) => {
            const Icon = iconMap[project.icon];
            const themes = [
              "bg-[#F1EAFE]",
              "bg-[#E1F4FF]",
              "bg-[#FFF1C8]",
              "bg-[#EAF6EE]",
              "bg-[#FFE6EB]",
              "bg-[#E5EBFF]",
            ];
            return (
              <Reveal key={project.title} delay={(i % 3) * 0.08}>
                <div className="group rounded-[26px] border border-[#E8EAF2] bg-[#FDFDFE] p-5 sm:p-6 h-full hover:shadow-card hover:-translate-y-1 transition-all">
                  <div
                    className={`rounded-2xl ${themes[i]} h-36 relative flex items-center justify-center overflow-hidden`}
                  >
                    <div className="absolute h-28 w-28 border border-ink/10 rounded-3xl rotate-12" />
                    <div className="absolute h-20 w-20 border border-ink/10 rounded-3xl -rotate-12" />
                    <Icon
                      size={57}
                      strokeWidth={1.35}
                      className="relative text-ink"
                    />
                  </div>
                  <div className="mt-6 text-[10px] font-black text-[#7862D8] tracking-[.16em]">
                    {project.tag}
                  </div>
                  <h3 className="mt-2 font-black text-[21px] tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed mt-2">
                    {project.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="text-center my-9">
          <p className=" text-sm">
            Projects grow in complexity with each learner. Advanced examples are
            curriculum goals, not projects expected from beginners.
          </p>
        </Reveal>
      </div>
    </section>
  );
}