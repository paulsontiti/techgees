"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import type { DBUser } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, Sparkles, X } from "lucide-react";
import axios from "axios";

import { Skeleton } from "@/components/ui/skeleton";
import PaymentOption from "./payment-option";
import ComboPriceForm from "../combo/[courseId]/_components/price-form";

interface CoursePaymentModalProps {
  courseId: string;
  open: boolean;
  coursePrice?: number;
  subscriptionPrice?: number;
  onClose: () => void;
}

export default function CoursePaymentModal({
  courseId,
  coursePrice,
  subscriptionPrice,
  open,
  onClose,
}: CoursePaymentModalProps) {
  const titleId = useId();
  const descriptionId = useId();

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Portals need the browser document.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load the account once per mount, or when retrying.
  useEffect(() => {
    const controller = new AbortController();
    async function getUser() {
      setLoading(true);
      setError(null);

      try {
       
        const response = await axios.get<DBUser | null>("/api/user", {
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        setUser(response.data);

        if (!response.data) {
          setError("Please sign in to continue your enrollment.");
        }
      } catch (err: unknown) {
        if (controller.signal.aborted) return;

        setUser(null);

        if (axios.isAxiosError<{ message?: string }>(err)) {
          setError(
            err.response?.data?.message ||
              "Unable to load your account. Please try again."
          );
        } else {
          setError("Unable to load your account. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void getUser();

    return () => controller.abort();
  }, [retryCount]);

  // Close with Escape.
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Lock background scrolling and compensate for the scrollbar.
  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const existingPadding =
      Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;

    body.style.overflow = "hidden";

    // Recheck after locking to account for a stable scrollbar gutter.
    const recoveredWidth = Math.max(
      0,
      document.documentElement.clientWidth -
        (window.innerWidth - scrollbarWidth)
    );

    if (recoveredWidth > 0) {
      body.style.paddingRight = `${existingPadding + recoveredWidth}px`;
    }

    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          key="course-payment-modal"
          className="fixed inset-0 z-[9999] isolate flex items-end justify-center sm:items-center sm:p-4"
          onClick={(event) => event.stopPropagation()}
        >
          {/* Backdrop */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-[#020817]/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          {/* Animate the dialog, leaving the fixed wrapper stationary. */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="
              relative z-10 flex
              h-[min(740px,92dvh)] w-full max-w-xl
              flex-col overflow-hidden
              rounded-t-[28px] bg-white shadow-2xl
              sm:rounded-[28px]
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Mobile indicator */}
            <div className="flex shrink-0 justify-center bg-[#07152f] pt-3 sm:hidden">
              <div className="h-1.5 w-12 rounded-full bg-white/25" />
            </div>

            {/* Header */}
            <div className="relative shrink-0 overflow-hidden bg-[#07152f] px-5 py-5 sm:px-7">
              <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-[#ffd429]/10 blur-2xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ffd429] text-[#07152f]">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#ffd429]">
                      The Global Genius
                    </p>

                    <h2
                      id={titleId}
                      className="text-lg font-bold text-white sm:text-xl"
                    >
                      Complete Your Enrollment
                    </h2>

                    <p
                      id={descriptionId}
                      className="mt-1 max-w-sm text-sm leading-5 text-white/65"
                    >
                      Choose your preferred payment option and start your
                      learning journey.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close payment modal"
                  className="
                    flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-full bg-white/10 text-white/70
                    transition-colors hover:bg-white/20 hover:text-white
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-[#ffd429]
                  "
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Trust bar */}
            <div className="flex shrink-0 items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3 sm:px-7">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />

              <p className="text-xs font-medium text-slate-600">
                Secure enrollment • Flexible payment options • Instant access
              </p>
            </div>

            {/* Content */}
            <div
              aria-busy={loading}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7"
            >
              {loading ? (
                <div role="status" className="space-y-4">
                  <span className="sr-only">Loading payment options…</span>

                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-28 w-full rounded-xl" />
                </div>
              ) : error ? (
                <div
                  role="alert"
                  className="flex min-h-60 flex-col items-center justify-center gap-4 text-center"
                >
                  <p className="max-w-sm text-sm text-slate-600">
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={() => setRetryCount((count) => count + 1)}
                    className="
                      rounded-xl bg-[#07152f] px-5 py-3
                      text-sm font-semibold text-white
                      transition-colors hover:bg-[#12284d]
                    "
                  >
                    Try again
                  </button>
                </div>
              ) : user ? (
                <PaymentOption>
                  <ComboPriceForm
                    email={user.email || undefined}
                    courseId={courseId}
                    coursePrice={coursePrice}
                    subscriptionPrice={subscriptionPrice}
                  />
                </PaymentOption>
              ) : null}
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-7">
              <p className="text-center text-xs leading-5 text-slate-500">
                By continuing, you agree to the enrollment terms and payment
                conditions of The Global Genius.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}