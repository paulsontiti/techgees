'use client'

import { useState } from "react";
import Heading from "./heading";
import { faq } from "@/lib/content";
import Reveal from "./reveal";
import { ChevronDown } from "lucide-react";
import { AnimatePresence,motion } from "framer-motion";

export default function FAQs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-6 md:py-10 bg-paper">
      <div className="max-w-5xl mx-auto px-5 sm:px-7 lg:px-9">
        <Heading
          centered
          eyebrow="GOOD QUESTIONS, CLEAR ANSWERS"
          title={
            <>
              {`You've got questions.`}
              <span className="text-[#7862D8]">We get it.</span>
            </>
          }
          description="Here are some of the things parents, schools and new learners ask us most often."
        />
        <div className="mt-11 space-y-3">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i, 5) * 0.035}>
              <div className="rounded-[20px] border border-[#E7EAF2] overflow-hidden">
                <button
                  type="button"
                  className="w-full text-left px-5 sm:px-7 py-5 sm:py-6 flex justify-between items-center gap-5"
                  aria-expanded={open === i}
                  aria-controls={`answer-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-extrabold text-[14px] sm:text-base">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${open === i ? "bg-ink text-white" : "bg-paper text-ink"}`}
                  >
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${open === i ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      id={`answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-7 pb-6 text-sm leading-[1.85] max-w-[820px]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}