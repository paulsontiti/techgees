'use client'

import { Check } from "lucide-react";
import Heading from "./heading";
import Pill from "./pill";
import Reveal from "./reveal";
import PrimaryButton from "./primary-button";
import { bgPrimaryColor, textSecondaryColor } from "@/utils/colors";
import useOpenEnrollModal from "../../../store/enrol-modal-store";

export default function Pricing() {
    const {openModal} = useOpenEnrollModal()
  return (
    <section id="pricing" className="bg-[#F7F8FC] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9">
        <Heading
          centered
          eyebrow="ACCESSIBLE LEARNING"
          title={
            <>
              A serious opportunity.{" "}
              <span className="text-[#7862D8]">Flexible ways to start.</span>
            </>
          }
          description="Explore our core academy and Community Edition options. Speak with us to confirm the most suitable pathway and current terms."
        />
        <div className="mt-12 grid md:grid-cols-2 gap-5 lg:gap-6 items-stretch">
          <Reveal className="h-full">
            <div className="bg-white border border-[#E4E7F0] rounded-[30px] p-7 lg:p-8 h-full flex flex-col">
              <Pill>TRY BEFORE YOU DECIDE</Pill>
              <h3 className="mt-6 text-2xl font-black">1-Week Free Trial</h3>
              <p className="mt-2 text-sm leading-relaxed">
                See how learning at The Global Genius works before joining a
                paid pathway.
              </p>
              <div className="my-7">
                <span className="text-[39px] font-black tracking-tight">
                  FREE
                </span>
                <p className="text-xs mt-1">
                  Trial access, subject to current availability
                </p>
              </div>
              <div className="space-y-3 mb-8 flex-1">
                {[
                  "Explore our learning experience",
                  "Get guidance on a suitable start",
                  "Begin at the right level",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex gap-2 text-[13px] text-[#535E76]"
                  >
                    <Check size={17} className="shrink-0 text-[#1C9D68]" />
                    {t}
                  </div>
                ))}
              </div>
              <PrimaryButton
                href="#courses"
              >
                Ask about free trial
              </PrimaryButton>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div
              className={`${bgPrimaryColor} ${textSecondaryColor} border border-ink rounded-[30px] p-7 lg:p-8 h-full flex flex-col shadow-float relative overflow-hidden`}
            >
              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#6350D4]/45 blur-[70px]" />
              <div className="relative">
                <span className="inline-flex rounded-full bg-sun text-ink text-[10px] font-black tracking-[.15em] px-4 py-2">
                  COMMUNITY EDITION
                </span>
                <h3 className="mt-6 text-2xl font-black">
                  Grow together, pay less.
                </h3>
                <p className="mt-2 text-white/60 text-sm leading-relaxed">
                  Start with a community membership and unlock a lower monthly
                  rate through qualifying member introductions.
                </p>
                <div className="mt-7">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black tracking-tight text-sun">
                      ₦10,000
                    </span>
                    <span className="text-xs text-white/55 mb-1">/month*</span>
                  </div>
                  {/* <p className="text-xs text-white/60 mt-2">
                    ₦20,000 entry fee
                  </p> */}
                </div>
                <div className="mt-7 mb-8 space-y-3 flex-1">
                  {[
                    "Access to all courses on our platform",
                    "Community mentoring",
                    "Community learning and support",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex gap-2 text-[13px] text-white/80"
                    >
                      <Check size={17} className="shrink-0 text-sun" />
                      {t}
                    </div>
                  ))}
                </div>
                <PrimaryButton
                  onClick={openModal}
                  className="w-full bg-white/20"
                >
                  Explore Community Edition
                </PrimaryButton>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.16} className="h-full">
            <div className="bg-white border border-[#E4E7F0] rounded-[30px] p-7 lg:p-8 h-full flex flex-col">
              <Pill>SOFTWARE & AI ACADEMY</Pill>
              <h3 className="mt-6 text-2xl font-black">Full Academy</h3>
              <p className="mt-2 text-sm leading-relaxed">
                A structured route through engineering foundations and advanced
                specializations.
              </p>
              <div className="my-7">
                <span className="text-[39px] font-black tracking-tight">
                  ₦20,000
                </span>
                <span className="text-xs"> /month</span>
                <p className="text-xs mt-1">Or ₦50,000 per module</p>
              </div>
              <div className="space-y-3 mb-8 flex-1">
                {[
                  "The 10-phase, 100-module pathway",
                  "Progressive engineering curriculum",
                  "Project-focused learning",
                  "Start from foundational modules",
                  "One on one mentoring",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex gap-2 text-[13px] text-[#535E76]"
                  >
                    <Check size={17} className="shrink-0 text-[#1C9D68]" />
                    {t}
                  </div>
                ))}
              </div>
              <PrimaryButton
                onClick={openModal}
              >
                Ask about the academy
              </PrimaryButton>
            </div>
          </Reveal>

          <Reveal delay={0.24} className="h-full">
            <div className="bg-white border border-[#E4E7F0] rounded-[30px] p-7 lg:p-8 h-full flex flex-col">
              <Pill>PAY AS YOU LEARN</Pill>
              <h3 className="mt-6 text-2xl font-black">One Module at a Time</h3>
              <p className="mt-2 text-sm leading-relaxed">
                A flexible option for learners who prefer to progress and pay
                module by module.
              </p>
              <div className="my-7">
                <span className="text-[39px] font-black tracking-tight">
                  ₦50,000
                </span>
                <span className="text-xs"> /module</span>
                <p className="text-xs mt-1">Move forward on your schedule</p>
              </div>
              <div className="space-y-3 mb-8 flex-1">
                {[
                  "One module at a time",
                  "Practical exercises and projects",
                  "Build before moving forward",
                  "Ask about current inclusions",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex gap-2 text-[13px] text-[#535E76]"
                  >
                    <Check size={17} className="shrink-0 text-[#1C9D68]" />
                    {t}
                  </div>
                ))}
              </div>
              <PrimaryButton
                onClick={openModal}
              >
                Explore pay-per-module
              </PrimaryButton>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="mt-6 px-2 text-[12px] leading-[1.8] max-w-5xl mx-auto text-center">
            *Community Edition: the publicly indexed academy page describes a
            ₦10,000 starting fee and a ₦5,000 monthly builder rate subject to
            successful member introductions, with ₦20,000/month applicable if
            conditions are not met. Confirm eligibility and recurring
            requirements before paying. Program-specific fees may differ.
          </div>
        </Reveal>
      </div>
    </section>
  );
}