"use client";

import { motion } from "framer-motion";
import {
  Gift,
  Users,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function EarningAd() {
  return (
    <section className="w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-br
          from-blue-900/40
          via-slate-900
          to-purple-900/40
          p-8
          md:p-12
          backdrop-blur-xl
        "
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Side */}
            <div className="max-w-2xl">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-green-500/20
                  bg-green-500/10
                  px-4
                  py-2
                  text-green-400
                "
              >
                <Gift className="h-4 w-4" />
                Referral Rewards Program
              </div>

              <h2
                className="
                  mt-6
                  text-4xl
                  font-bold
                  text-white
                  md:text-5xl
                "
              >
                Earn Up To
                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-green-400
                    to-cyan-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  10% Commission
                </span>
              </h2>

              <p className="mt-6 text-lg text-slate-300">
                Invite friends, family members, students,
                professionals, and parents to join
                The Global Genius and earn rewards
                every time someone enrolls using
                your referral username.
              </p>
            </div>

            {/* Right Side */}
            <div className="grid gap-4 md:grid-cols-3 lg:w-[500px]">
              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                  text-center
                  backdrop-blur-md
                "
              >
                <Users className="mx-auto h-8 w-8 text-blue-400" />

                <h3 className="mt-4 text-xl font-bold text-white">
                  Refer
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Share your referral username.
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                  text-center
                  backdrop-blur-md
                "
              >
                <TrendingUp className="mx-auto h-8 w-8 text-green-400" />

                <h3 className="mt-4 text-xl font-bold text-white">
                  Enroll
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Your friend joins a program.
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                  text-center
                  backdrop-blur-md
                "
              >
                <Gift className="mx-auto h-8 w-8 text-purple-400" />

                <h3 className="mt-4 text-xl font-bold text-white">
                  Earn
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Receive up to 10% commission.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            className="
              mt-10
              flex
              flex-col
              gap-4
              border-t
              border-white/10
              pt-8
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div>
              <p className="font-medium text-white">
                Start referring today and build an
                additional source of income.
              </p>

              <p className="mt-1 text-slate-400">
                No limits on the number of referrals.
              </p>
            </div>

            <button
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                px-8
                py-4
                font-semibold
                text-white
                transition
                hover:scale-105
              "
            >
              Join Referral Program
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}