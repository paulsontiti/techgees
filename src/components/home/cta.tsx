'use client'


import PrimaryButton from "./primary-button";

export default function FinalCTA() {

  return (
    <section className="bg-sun py-20 md:py-24 relative overflow-hidden">
      <div className="absolute -right-24 -bottom-40 h-[420px] w-[420px] border-[55px] border-[#0B1333]/10 rounded-full" />
      <div className="max-w-4xl mx-auto px-5 sm:px-7 lg:px-9 relative flex flex-col gap-8 items-center justify-between">
        <div className="max-w-[810px] text-center lg:text-left">
          <span className="text-[11px] font-extrabold tracking-[.18em] uppercase">
            A SMALL START. A BIG POSSIBILITY.
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5.2vw,5.5rem)] font-black leading-[1.07] mt-4">
            The future isn&apos;t just something to watch.{" "}
            <span className="underline decoration-[6px] underline-offset-[7px]">
              Build it.
            </span>
          </h2>
          <p className="mt-5 text-[#53461D] text-base sm:text-lg">
            Make your next step a creative one. Start with a one-week trial and
            discover the right learning pathway.
          </p>
        </div>
        <PrimaryButton
          href="#courses"
          className={`shrink-0 !min-h-[60px] !px-8 `}
        >
          Start your free trial
        </PrimaryButton>
      </div>
    </section>
  );
}