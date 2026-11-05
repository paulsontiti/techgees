'use client'

import { CatalogCategory, courseCatalog } from "@/lib/content";
import { ArrowUpRight, BookOpen, BrainCircuit, Code2, Gamepad2, MonitorCog, ShieldCheck, Terminal, Workflow } from "lucide-react";
import { useState } from "react";
import Heading from "./heading";
import Reveal from "./reveal";
import { bgPrimaryColor, textSecondaryColor } from "@/utils/colors";
import Link from "next/link";
import PrimaryButton from "./primary-button";
import useOpenEnrollModal from "../../../store/enrol-modal-store";
import { GiSecurityGate } from "react-icons/gi";

const catalogFilters: ("All courses" | CatalogCategory)[] = [
  "All courses",
  "Kids & Scratch",
  "Python",
  "Web development",
  "Frontend Development", "Backend Development", "Computer Science", "AI & foundations", "IT & Software",
];

export default function RealCourseCatalog({url}:{url:string}) {
  const [filter, setFilter] =
    useState<(typeof catalogFilters)[number]>("All courses");
  const catalog =
    filter === "All courses"
      ? courseCatalog
      : courseCatalog.filter((c) => c.category === filter);
  const icons = {
    game: Gamepad2,
    code: Code2,
    brain: BrainCircuit,
    terminal: Terminal,shieldcheck:ShieldCheck,workflow:Workflow,monitorcog:MonitorCog
  };

  const {openModal} = useOpenEnrollModal()
  return (
    <section id="courses" className="bg-[#F5F7FC] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9">
        <div className="flex flex-col lg:flex-row gap-5 justify-between items-start lg:items-end">
          <Heading
            eyebrow="EXPLORE REAL COURSES"
            title={
              <>
                A course for your{" "}
                <span className="text-[#7862D8]">next big step.</span>
              </>
            }
            description="From visual coding to professional software development, discover subjects listed in our existing learning platform. Select an area to find a course you’d enjoy."
          />
          <Reveal>
            <div className="rounded-full bg-white shadow-sm border border-[#E7EAF3] px-4 py-3 flex gap-2 items-center shrink-0 text-xs font-black">
              <BookOpen size={17} className="text-[#6D58D6]" />
              {courseCatalog.length} featured course options
            </div>
          </Reveal>
        </div>
        <div
          role="group"
          aria-label="Filter courses by topic"
          className="mt-10 flex gap-2.5 overflow-x-auto pb-2 hide-scrollbar"
        >
          {catalogFilters.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={t === filter}
              onClick={() => setFilter(t)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-extrabold transition-colors ${t === filter ? `${bgPrimaryColor} ${textSecondaryColor}` : "bg-white border-[#E2E5EE] hover:border-[#7862D8]"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {catalog.map((course, i) => {
            const Icon = icons[course.icon];
            return (
              <article
                key={course.courseLink}
                className="group rounded-[23px] p-6 sm:p-7 bg-white border border-[#E8EAF2] hover:shadow-card hover:-translate-y-1 transition-all flex flex-col min-h-[215px]"
              >
                <div className="flex gap-3 justify-between items-start">
                  <div className="flex items-center justify-center h-12 w-12 rounded-[16px] bg-[#F3EFFF] text-[#6951CE]">
                    <Icon size={24} />
                  </div>
                  <span className="rounded-full bg-[#F7F7FA] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-[#727A8E]">
                    {course.category}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-black tracking-tight leading-snug">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed">
                  {course.takeaway}
                </p>
                <div className="mt-auto pt-6 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-bold text-[#6A738B]">
                    {course.audience}
                  </span>
                  <Link
                  href={`${url}${course.courseLink}`}
                    // href={whatsappLink(
                    //   `Hello The Global Genius! Please tell me how to join ${course.title}.`,
                    // )}
                    //target="_blank"
                    //rel="noopener noreferrer"
                    aria-label={`Free trial classes on ${course.title}`}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#6854CD] hover:gap-2 transition-all"
                  >
                    Start a Free Trial <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-8 flex flex-col lg:flex-row items-start sm:items-center justify-between gap-5 rounded-[24px] bg-ink px-6 py-7 sm:px-8">
          <div>
            <div className="text-xs font-black tracking-[.14em] uppercase">
              Want a guided recommendation?
            </div>
            <h3 className="mt-2 text-2xl font-black">
              You don’t have to choose alone.
            </h3>
            <p className="text-sm mt-2">
              Tell us your age, experience and goal. We’ll help you choose a
              sensible starting point.
            </p>
          </div>
          <PrimaryButton
            onClick={openModal}
            className={`${bgPrimaryColor} ${textSecondaryColor} shrink-0 md:w-1/2`}
          >
            Find my course
          </PrimaryButton>
        </div>

        <p className="text-[11px] mt-4 text-center">
          Courses shown reflect the publicly indexed catalog. Current cohorts,
          prices, and places should be confirmed with admissions.
        </p>
      </div>
    </section>
  );
}