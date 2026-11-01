'use client'
import { bgPrimaryColor } from "@/utils/colors";
import useOpenEnrollModal from "../../../store/enrol-modal-store";
import Heading from "./heading";
import PrimaryButton from "./primary-button";
import Reveal from "./reveal";
import { whatsappLink } from "@/lib/content";
import { CheckCircle2, School } from "lucide-react";

export default function Schools() {
    const {openModal} = useOpenEnrollModal()
  return (
    <section
      id="schools"
      className="bg-[#161F46] py-20 md:py-24 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 marquee-lines" />
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[#6558D7]/25 blur-[85px]" />
      <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9 relative grid lg:grid-cols-[1fr_.9fr] gap-12 items-center">
        <div>
          <Heading
            light
            eyebrow="FOR SCHOOLS & EDUCATION LEADERS"
            title={
              <>
                Give your students an advantage.{" "}
                <span className="gradient-text">
                  {`Grow your school's impact.`}
                </span>
              </>
            }
            description="Bring a structured Software & AI learning pathway into your school without having to create a technology academy from scratch."
          />
          <Reveal className="mt-7 flex flex-wrap gap-3">
            <PrimaryButton onClick={openModal} className={`${bgPrimaryColor}`}>
              Discuss a school partnership
            </PrimaryButton>
            <PrimaryButton
              href={whatsappLink(
                "Hello The Global Genius! Our school would like a technology education partnership proposal.",
              )}
              variant="outline"
            >
              Request a proposal
            </PrimaryButton>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div
            className={`rounded-[31px] border ${bgPrimaryColor}  md:p-6 p-3 backdrop-blur-lg`}
          >
            <div className="flex items-center md:gap-4 mb-7">
              <div className="rounded-2xl bg-sun p-3 text-ink">
                <School size={27} />
              </div>
              <div>
                <p className=" font-black">A partnership built for progress</p>
                <p className="text-white/50 text-sm">
                  Digital skills + new opportunities
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                [
                  "A progressive curriculum",
                  "Scratch, Python, Software Engineering and AI.",
                ],
                [
                  "Flexible student learning",
                  "Recorded lessons, live support and practical projects.",
                ],
                [
                  "School visibility",
                  "A proposed model including school-facing progress support.",
                ],
                [
                  "20% revenue share",
                  "Our proposed share for eligible school partnerships.",
                ],
              ].map(([a, b]) => (
                <div
                  key={a}
                  className="flex items-start gap-3 border-t border-white/10 pt-4"
                >
                  <CheckCircle2
                    className="text-sun mt-0.5 shrink-0"
                    size={19}
                  />
                  <div>
                    <strong className="text-sm">{a}</strong>
                    <p className="text-white/55 text-xs leading-relaxed mt-1">
                      {b}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}