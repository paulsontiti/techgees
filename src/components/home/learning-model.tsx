'use client'

import { BookOpen, Laptop2, MonitorPlay, Rocket, Users } from "lucide-react";
import Heading from "./heading";
import Reveal from "./reveal";
import { bgPrimaryColor, textPrimaryColor, textSecondaryColor } from "@/utils/colors";
import IconBox from "./icon-box";

export default function LearningModel() {
  const items = [
    {
      icon: MonitorPlay,
      title: "Learn at your pace",
      description:
        "Watch, pause, rewatch and practise structured recorded lessons on your schedule.",
      tone: "purple" as const,
    },
    {
      icon: Users,
      title: "Join live classes",
      description:
        "Three interactive sessions weekly provide space for questions, explanations and guidance.",
      tone: "gold" as const,
    },
    {
      icon: Rocket,
      title: "Build real projects",
      description:
        "Turn ideas into apps, stories, games and systems. Test, debug, improve, repeat.",
      tone: "mint" as const,
    },
    {
      icon: BookOpen,
      title: "Grow beyond coding",
      description:
        "Book clubs, independent learning and problem-solving help develop a lifelong learning mindset.",
      tone: "blue" as const,
    },
  ];
  return (
    <section id="how-it-works" className="py-6 bg-[#F1F3FA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9">
        <Heading
          centered
          eyebrow="A BETTER WAY TO LEARN"
          title={
            <>
              Built for real life.{" "}
              <span className="text-[#7862D8]">Designed for real growth.</span>
            </>
          }
          description="Flexible enough to fit around school or work. Structured enough to help students keep moving forward."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {items.map((i, n) => (
            <Reveal key={i.title} delay={n * 0.08}>
              <article className="p-6 sm:p-7 rounded-[27px] bg-white shadow-card h-full">
                <div className="flex gap-2 items-center">
                  <IconBox icon={i.icon} tone={i.tone} />
                  <h3 className=" text-xl font-black tracking-tight">
                    {i.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed">{i.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal
          className={`mt-9 flex flex-col lg:flex-row items-center gap-7 rounded-[28px] ${bgPrimaryColor} ${textSecondaryColor} px-7 py-8 lg:px-11 lg:py-10`}
        >
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[25px] bg-sun text-ink">
            <Laptop2 size={40} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-black">
              Learn from wherever you are.
            </h3>
            <p className="text-sm mt-2 leading-relaxed max-w-[680px]">
              Our learning platform is online. Lessons can be accessed from a
              phone, tablet or laptop. For larger programming projects, we
              recommend a laptop or desktop computer.
            </p>
          </div>
          <div
            className={`flex gap-2.5 text-xs font-bold flex-wrap ${textPrimaryColor}`}
          >
            <span className="rounded-full bg-white px-4 py-2">Phone</span>
            <span className="rounded-full bg-white px-4 py-2">Tablet</span>
            <span className="rounded-full bg-white px-4 py-2">Laptop</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}