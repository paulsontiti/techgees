'use client'

import { ArrowRight, Code2, Heart, MessageCircle, School } from "lucide-react";
import { useState } from "react";
import useOpenEnrollModal from "../../../store/enrol-modal-store";

export default function AudienceNavigator() {
  const choices = [
    {
      label: "I’m a parent",
      heading: "Turn their screen time into creative time.",
      copy: "Explore Scratch for ages 5–10 and age-appropriate programming for older children.",
      cta: "See age-based programs",
      href: "#programs",
      icon: Heart,
    },
    {
      label: "I’m a learner",
      heading: "Build skills you can use to create.",
      copy: "Start with Python or web development, then grow into full-stack and AI engineering.",
      cta: "Browse available courses",
      href: "#courses",
      icon: Code2,
    },
    {
      label: "I represent a school",
      heading: "Bring practical tech education to your students.",
      copy: "Explore online lessons, guided projects and a potential school partnership.",
      cta: "Explore partnerships",
      href: "#schools",
      icon: School,
    },
  ];
  const [chosen, setChosen] = useState(0);
  const selected = choices[chosen];
  const I = selected.icon;

  const {openModal} = useOpenEnrollModal()
  return (
    <section
      aria-label="Find your learning path"
      className="relative z-10 bg-[#FFFDF8] py-10 md:py-14 border-b border-[#E7E5DD]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9">
        <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-7 items-center">
          <div>
            <span className="text-[#7862D8] text-[11px] tracking-[.16em] font-black">
              START HERE
            </span>
            <h2 className="text-[clamp(1.65rem,3vw,2.55rem)] font-black font-display mt-2">
              Different journeys. One place to begin.
            </h2>
            <p className="text-sm mt-3 text-muted leading-relaxed">
              Tell us who you’re here for and find the best next step.
            </p>
          </div>
          <div className="rounded-[26px] border border-[#E8E6E1] bg-white shadow-sm p-2">
            <div
              role="tablist"
              aria-label="I am here as"
              className="flex flex-col md:flex-row gap-2"
            >
              {choices.map((c, i) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === chosen}
                  key={c.label}
                  onClick={() => setChosen(i)}
                  className={`rounded-full px-4 py-2.5 text-xs font-black transition-colors ${i === chosen ? "bg-ink text-white" : "bg-[#F2F3F8] text-[#58627B] hover:bg-[#E8E9F3]"}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div
              role="tabpanel"
              className="flex flex-col sm:flex-row items-start gap-4 mt-6"
            >
              <div className="p-3 rounded-2xl bg-[#FFF0BF] text-ink shrink-0">
                <I size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black">{selected.heading}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {selected.copy}
                </p>
                <div className="flex flex-wrap gap-4 mt-5">
                  <a
                    href={selected.href}
                    className="inline-flex items-center gap-2 text-[#6550D0] text-sm font-black hover:gap-3 transition-all"
                  >
                    {selected.cta}
                    <ArrowRight size={16} />
                  </a>
                  <button
                    type="button"
                    onClick={openModal}
                    className="inline-flex items-center gap-2 text-ink text-sm font-black"
                  >
                    Ask an advisor <MessageCircle size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}