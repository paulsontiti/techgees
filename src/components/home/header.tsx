'use client'

import { bgPrimaryColor, textSecondaryColor } from "@/utils/colors";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import Logo from "../logo";
import PrimaryButton from "./primary-button";
import Account from "../account";
import { AnimatePresence,motion } from "framer-motion";
import useOpenEnrollModal from "../../../store/enrol-modal-store";
import Link from "next/link";


const navigation = [
  { text: "Programs", href: "#programs" },
  { text: "Explore courses", href: "#courses" },
  { text: "Software & AI academy", href: "#journey" },

  { text: "Pricing", href: "#pricing" },
  { text: "For schools", href: "#schools" },
  { text: "Start a Free Trial", href: "#courses" },
];

export default function Header() {
 const [open, setOpen] = useState(false);
  
  const { openModal } = useOpenEnrollModal();
  
  return (
    <>
      <div className="relative z-[60] bg-sun text-ink text-center text-[11px] md:text-xs font-bold px-4 py-2.5">
        <span className="inline-flex flex-wrap items-center justify-center gap-2">
          <Sparkles size={14} /> Your next chapter starts here.{" "}
          <strong>Explore The Global Genius for one week.</strong>
          <Link
          href="#courses"
            className="underline underline-offset-[3px] font-black"
            
          >
            Explore the free trial →
          </Link>
        </span>
      </div>
      <header
        className={`sticky top-0 z-50 border-b border-white/10 ${bgPrimaryColor} ${textSecondaryColor} backdrop-blur-xl`}
      >
        <div className="mx-auto max-w-7xl lg:mx-0 lg:min-w-full h-[76px] flex items-center justify-between gap-6 px-5 sm:px-7 lg:px-9">
          {/* <a
            href="#home"
            aria-label="Global Genius home"
            className="flex shrink-0 items-center"
          >
          </a> */}
            <Logo />
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-7 xl:gap-9"
          >
            {navigation.map((item) => (
              <a
                key={item.text}
                href={item.href}
                className="text-[13px] hover:text-white transition-colors font-semibold"
              >
                {item.text}
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4">
            <PrimaryButton
              onClick={openModal}
              variant="outline"
              className="!min-h-[42px] !px-5"
            >
              Consult Us
            </PrimaryButton>
            <Account />
          </div>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl bg-white/10"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-white/10 bg-[#0B1333] px-6"
            >
              <div className="flex flex-col py-4">
                {navigation.map((x) => (
                  <a
                    key={x.text}
                    href={x.href}
                    onClick={() => setOpen(false)}
                    className="py-3 border-b border-white/10 text-sm font-semibold "
                  >
                    {x.text}
                  </a>
                ))}
                {/* <button
                  onClick={() => {
                    setOpen(false);
                    onEnroll();
                  }}
                  className="my-4 rounded-full bg-sun px-6 py-3 font-bold text-ink"
                >
                  Start free trial
                </button> */}
                <div className="my-4 flex justify-center gap-4 w-full">
                  <PrimaryButton
                    onClick={openModal}
                    variant="outline"
                    className="!min-h-[42px] !px-5"
                  >
                    Consult Us
                  </PrimaryButton>
                  <Account />
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}