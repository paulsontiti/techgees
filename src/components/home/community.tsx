import { YOUTUBE } from "@/lib/content";
import PrimaryButton from "./primary-button";
import { bgPrimaryColor, bgSecondaryColor, textSecondaryColor } from "@/utils/colors";
import { PlayCircle } from "lucide-react";
import Reveal from "./reveal";

export default function Community() {
  return (
    <section className="py-16 md:py-20 ">
      <div className="max-w-4xl mx-auto px-5 sm:px-7 lg:px-9">
        <Reveal>
          <div
            className={`rounded-[32px] ${bgSecondaryColor} p-7 md:p-10 lg:p-12 flex flex-col gap-7 items-center justify-between`}
          >
            <div className="">
              <div className="flex items-center gap-2 text-[11px] font-black tracking-[.15em] uppercase mb-4">
                <PlayCircle size={17} /> LEARN WITH US FOR FREE
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-[46px] leading-[1.1]">
                Join our live Python classes on YouTube.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#5D4E2A] leading-relaxed">
                Start learning with the community on{" "}
                <strong>
                  Mondays, Wednesdays and Fridays at 6:00 PM (WAT)
                </strong>
                , subject to our published schedule. Live coding, explanations
                and projects for beginners.
              </p>
            </div>
            <PrimaryButton
              href={YOUTUBE}
              className={`shrink-0 ${bgPrimaryColor} ${textSecondaryColor}`}
            >
              Visit our YouTube channel
            </PrimaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}