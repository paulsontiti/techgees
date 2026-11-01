"use client";

import { PHONE_ONE, PHONE_TWO, whatsappLink } from "@/lib/content";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import useOpenEnrollModal from "../../../store/enrol-modal-store";

export default function EnrolModal()
  {

    const {modalOpen,closeModal} = useOpenEnrollModal()

  const [audience, setAudience] = useState("Parent / guardian");
  const [program, setProgram] = useState("Help me choose a pathway");
  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [modalOpen, closeModal]);
  const message = `Hello The Global Genius! I'd like to enquire about the one-week free trial. I'm enquiring as: ${audience}. Program interest: ${program}. Please send me the next steps and current enrolment details.`;
  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-[#060B22]/80 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="trial-title"
            initial={{ y: 30, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 15, opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="relative z-10 bg-white w-full max-w-[515px] max-h-[90vh] overflow-y-auto rounded-[29px] px-6 sm:px-9 py-8 sm:py-10 shadow-float"
          >
            <button
              type="button"
              aria-label="Close trial enquiry"
              className="absolute top-5 right-5 h-9 w-9 bg-paper rounded-full flex items-center justify-center"
              onClick={closeModal}
            >
              <X size={18} />
            </button>
            <div className="h-14 w-14 rounded-2xl bg-[#FFF0C0] flex items-center justify-center text-ink">
              <Sparkles size={28} />
            </div>
            <h2
              id="trial-title"
              className="mt-6 text-3xl font-display font-black"
            >
              Your next chapter starts here.
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              Tell us a little about what you&apos;re looking for. We&apos;ll
              open a WhatsApp conversation with your choices prefilled—no
              account or form submission required.
            </p>
            <label
              className="block mt-6 text-xs font-extrabold text-ink"
              htmlFor="learner-type"
            >
              Who are you enquiring for?
            </label>
            <select
              id="learner-type"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="mt-2 block w-full p-3.5 rounded-xl border border-[#DCE1EC] bg-paper text-sm font-semibold text-ink"
            >
              <option>Parent / guardian</option>
              <option>Student aged 11–14</option>
              <option>Teenager aged 15+</option>
              <option>Adult learner / career changer</option>
              <option>School representative</option>
            </select>
            <label
              className="block mt-5 text-xs font-extrabold text-ink"
              htmlFor="program-interest"
            >
              What interests you?
            </label>
            <select
              id="program-interest"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="mt-2 block w-full p-3.5 rounded-xl border border-[#DCE1EC] bg-paper text-sm font-semibold text-ink"
            >
              <option>Help me choose a pathway</option>
              <option>Scratch Explorers (5–7)</option>
              <option>Scratch Creators (8–10)</option>
              <option>Scratch Developers (11–14)</option>
              <option>Python Programming</option>
              <option>100 Days Frontend or Backend</option>
              <option>100-Module Software & AI Engineering Academy</option>
              <option>Community Edition</option>
              <option>School partnership</option>
            </select>
            <a
              className="mt-7 w-full min-h-[54px] rounded-full bg-ink flex justify-center gap-3 items-center font-black text-sm hover:bg-[#27365C] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              href={whatsappLink(message)}
              onClick={closeModal}
            >
              Continue to WhatsApp <ArrowUpRight size={19} />
            </a>
            <p className="text-center text-xs mt-4">
              Or call {PHONE_ONE} / {PHONE_TWO}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
