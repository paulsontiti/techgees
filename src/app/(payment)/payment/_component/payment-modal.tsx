"use client";

import React, { useEffect, useState } from "react";
import { DBUser } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShieldCheck, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import PaymentOption from "./payment-option";
import ComboPriceForm from "../combo/[courseId]/_components/price-form";



interface CoursePaymentModalProps {
  courseId: string;
  open: boolean;coursePrice?:number,subscriptionPrice?: number,
  onClose: () => void;
}

export default function CoursePaymentModal({
  courseId,coursePrice,subscriptionPrice,
  open,
  onClose,
}: CoursePaymentModalProps) {
  const [user, setUser] = useState<DBUser | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch logged-in user
   */
  useEffect(() => {
    //if (!open) return;

    const getUser = async () => {
      try {
        setLoading(true);

        const res = await axios.get("/api/user");
        setUser(res.data);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Unable to load your account"
        );
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  /**
   * Close with Escape
   */
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  /**
   * Prevent background scrolling
   */
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center"
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* =========================================================
              BACKDROP
          ========================================================= */}

          <motion.button
            type="button"
            aria-label="Close payment modal"
            className="absolute inset-0 cursor-default bg-[#020817]/70 backdrop-blur-md"
            variants={{
              closed: {
                opacity: 0,
              },
              open: {
                opacity: 1,
              },
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={onClose}
          />

          {/* =========================================================
              MODAL
          ========================================================= */}

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-modal-title"
            className="
              relative
              z-10
              flex
              w-full
              max-w-xl
              flex-col
              overflow-hidden
              rounded-t-[28px]
              bg-white
              shadow-2xl
              sm:max-h-[90vh]
              sm:rounded-[28px]
              sm:m-4
            "
            variants={{
              closed: {
                opacity: 0,
                y: 60,
                scale: 0.97,
              },
              open: {
                opacity: 1,
                y: 0,
                scale: 1,
              },
            }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 28,
              mass: 0.8,
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* =======================================================
                MOBILE DRAG INDICATOR
            ======================================================= */}

            <div className="flex justify-center pt-3 sm:hidden">
              <div className="h-1.5 w-12 rounded-full bg-slate-200" />
            </div>

            {/* =======================================================
                HEADER
            ======================================================= */}

            <div className="relative overflow-hidden border-b border-slate-100 bg-[#07152f] px-5 py-5 sm:px-7">
              {/* Decorative background */}
              <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#ffd429]/10 blur-2xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {/* Logo/Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ffd429] text-[#07152f] shadow-lg">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#ffd429]">
                      The Global Genius
                    </p>

                    <h2
                      id="payment-modal-title"
                      className="text-lg font-bold text-white sm:text-xl"
                    >
                      Complete Your Enrollment
                    </h2>

                    <p className="mt-1 max-w-sm text-sm leading-5 text-white/65">
                      Choose your preferred payment option and start your
                      learning journey.
                    </p>
                  </div>
                </div>

                {/* Close */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close payment modal"
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    text-white/70
                    transition
                    hover:bg-white/20
                    hover:text-white
                  "
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* =======================================================
                TRUST BAR
            ======================================================= */}

            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3 sm:px-7">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />

              <p className="text-xs font-medium text-slate-600">
                Secure enrollment • Flexible payment options • Instant access
              </p>
            </div>

            {/* =======================================================
                CONTENT
            ======================================================= */}

             <div className="min-h-0 flex-1 overflow-y-auto">
              {loading || user === undefined ? (
                <div className="space-y-4">
                  <Skeleton className="h-5 w-40" />

                  <Skeleton className="h-12 w-full rounded-xl" />

                  <Skeleton className="h-12 w-full rounded-xl" />

                  <Skeleton className="h-28 w-full rounded-xl" />
                </div>
              ) : (
                <PaymentOption
                >
                  <ComboPriceForm
                    email={user.email || undefined}
                    courseId={courseId} coursePrice={coursePrice} subscriptionPrice={subscriptionPrice}
                  />
                </PaymentOption>
              )}
            </div>
              {/* <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="px-5 py-6 sm:px-7">
            <PaymentOption
              courseId={courseId}
              redirectUrl={redirectUrl}
            >
              <ComboPriceForm
                email={user?.email || undefined}
                courseId={courseId} coursePrice={}
              />
            </PaymentOption>
          </div>
        </div> */}

            {/* =======================================================
                FOOTER
            ======================================================= */}

            <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-7">
              <p className="text-center text-xs leading-5 text-slate-500">
                By continuing, you agree to the enrollment terms and payment
                conditions of The Global Genius.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}