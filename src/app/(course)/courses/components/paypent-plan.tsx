"use client";

import { ChatOnWhatsApp } from "@/app/(kids)/components/landing-page";
import CoursePaymentModal from "@/app/(payment)/payment/_component/payment-modal";
import { formatPrice } from "@/lib/format";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Crown,
  Gift,
  GraduationCap,
  Headphones,
  Medal,
  Rocket,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const academyFeatures = [
  "Complete Software & AI Engineering pathway",
  "Self-paced recorded classes",
  "3 live interactive classes every week",
  "Practical projects",
  "Challenges and assessments",
  "Book club",
  "Global Genius community",
  "Learning support",
  "Continuous skill development",
];

const communityFeatures = [
  "Access to the Global Genius community",
  "Learn alongside other ambitious people",
  "Participate in community activities",
  "Connect with learners and builders",
  "Grow your network",
  "Access community opportunities",
];

const growthLevels = [
  {
    number: "3",
    title: "Community Builder",
    description: "Introduce your first 3 successful community members.",
    icon: Users,
  },
  {
    number: "10",
    title: "Community Champion",
    description: "Help 10 people become part of the ecosystem.",
    icon: Medal,
  },
  {
    number: "25",
    title: "Community Leader",
    description: "Build a meaningful network of 25 members.",
    icon: Trophy,
  },
  {
    number: "50+",
    title: "Global Genius Ambassador",
    description: "Become a major community growth contributor.",
    icon: Crown,
  },
];

export default function PaymentPlans({
  freeTrialUrl,coursePrice,courseId
}: {
  freeTrialUrl?: string,coursePrice? : number,courseId?:string
}) {

  const [paymentOpen, setPaymentOpen] = useState(false);
   const [subscriptionPrice, setSubscriptionprice] = useState<number | undefined>(undefined);
  return (
    <section
      id="payment"
      className="relative overflow-hidden bg-[#050816] py-24 text-white"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[5%] h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-[120px]" />
        <div className="absolute right-[-10%] top-[30%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[35%] h-[450px] w-[450px] rounded-full bg-emerald-400/10 blur-[120px]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* -------------------------------------------------
            HERO
        -------------------------------------------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300">
              <Sparkles className="h-4 w-4" />
              Flexible Learning. Flexible Payment.
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl"
          >
            {`Don't just learn to code`}.
            <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Become a Software & AI Engineer.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl"
          >
            A structured journey designed to take you from beginner to advanced
            Software & AI Engineering through practical learning, projects,
            challenges, mentorship and continuous development.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {[
              "Beginner Friendly",
              "Project Based",
              "Live Classes",
              "AI Engineering",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* -------------------------------------------------
            PAYMENT INTRO
        -------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-20 max-w-3xl text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="rounded-2xl bg-white/5 p-4">
              <Rocket className="h-8 w-8 text-yellow-400" />
            </div>
          </div>

          <h3 className="text-3xl font-black sm:text-4xl">
            Choose how you want to pay.
          </h3>

          <p className="mt-4 text-slate-400">
            {`You don't have to pay for everything at once. Start with the option
            that fits your current situation and keep moving forward.`}
          </p>
        </motion.div>

        <div className="flex mt-4 justify-center"><ChatOnWhatsApp/></div>

        {/* -------------------------------------------------
            PRICING CARDS
        -------------------------------------------------- */}
        <motion.div
        id="pricing-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="mt-12 grid gap-6 lg:grid-cols-3"
        >
          {/* OPTION 1 */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative overflow-hidden rounded-[2rem] border border-yellow-400/20 bg-gradient-to-b from-yellow-400/[0.08] to-white/[0.025] p-7"
          >
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-yellow-400/10 blur-3xl" />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
                  <Target className="h-6 w-6" />
                </div>

                <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-yellow-300">
                  Option 1
                </span>
              </div>

              <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
                Pay As You Learn
              </p>

              <div className=" mt-4 flex items-end gap-2">
                {coursePrice ? (<span className="text-5xl font-black">{formatPrice(coursePrice)}</span>) : (<><span className="text-5xl font-black">₦50k</span>
                <span className="mb-2 text-sm text-slate-400">/ module</span></>)}
              </div>

              <p className="mt-5 leading-7 text-slate-400">
                Take the Software & AI Engineering journey one module at a time.
                Pay only when you are ready to begin your next module.
              </p>

              <div className="my-7 h-px bg-white/10" />

              <p className="mb-4 font-bold text-white">
                Perfect if you want to:
              </p>

              <ul className="space-y-4">
                {[
                  "Learn at your own pace",
                  "Pay only for your current module",
                  "Build your skills progressively",
                  "Move forward as your budget allows",
                  "Self-paced recorded classes",
                  "3 live interactive classes every week",
                  "Practical projects",
                  "Challenges and assessments",
                  "Book club",
                  "Global Genius community",
                  "Learning support",
                  "Continuous skill development",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-slate-300"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-400/10">
                      <Check className="h-3 w-3 text-yellow-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {freeTrialUrl && (<Link
                href={freeTrialUrl}
                className=" mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-4 font-bold text-yellow-300 transition hover:bg-yellow-400 hover:text-black"
              >
                Start With A Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>)}
              {coursePrice && ( <div className="mt-8">
      <button
        type="button"
        onClick={() => {
          setPaymentOpen(true)
          setSubscriptionprice(undefined)
        }}
        className="
          rounded-xl w-full
          bg-[#ffd429]
          px-6
          py-3.5
          font-bold
          text-[#07152f]
          shadow-lg
          transition
          hover:-translate-y-0.5
          hover:shadow-xl
          active:translate-y-0
        "
      >
        {`Buy Outright For ${formatPrice(coursePrice)}`}
      </button>

      <CoursePaymentModal
        courseId={courseId || ""} coursePrice={coursePrice} subscriptionPrice={subscriptionPrice}
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
      />
    </div>)}
            </div>
          </motion.div>

          {/* OPTION 2 - FEATURED */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-[2rem] border border-blue-400/40 bg-gradient-to-b from-blue-500/[0.15] to-white/[0.035] p-7 shadow-2xl shadow-blue-500/10 lg:-translate-y-4"
          >
            {/* Popular badge */}
            <div className="absolute right-6 top-6">
              <div className="flex items-center gap-1.5 rounded-full bg-blue-500 px-3 py-1.5 text-xs font-black text-white shadow-lg shadow-blue-500/20">
                <Star className="h-3 w-3 fill-current" />
                MOST COMPLETE
              </div>
            </div>

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
                <GraduationCap className="h-6 w-6" />
              </div>

              <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
                Option 2
              </p>

              <h3 className="mt-1 text-xl font-black">Full Academy</h3>

              <div className="mt-4 flex items-end gap-2">
                <span className="text-5xl font-black">₦20k</span>
                <span className="mb-2 text-sm text-slate-400">/ month</span>
              </div>

              <p className="mt-5 leading-7 text-slate-300">
                Join the complete Software & AI Engineering Academy and progress
                through the full learning pathway with one simple monthly
                payment.
              </p>

              <div className="my-7 h-px bg-white/10" />

              <p className="mb-4 font-bold text-white">
                Everything you need to grow:
              </p>

              <ul className="space-y-3">
                {academyFeatures.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-slate-300"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/15">
                      <Check className="h-3 w-3 text-blue-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              
              <button
              onClick={()=>{
                setPaymentOpen(true)
                setSubscriptionprice(20000)
              }}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400">
                Subscribe Full Academy
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          {/* OPTION 3 */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-gradient-to-b from-emerald-400/[0.08] to-white/[0.025] p-7"
          >
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">
                  <Users className="h-6 w-6" />
                </div>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Option 3
                </span>
              </div>

              <p className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                Community Edition
              </p>

              <div >
                <div className="mt-4 flex items-center gap-2">
                  <span>Start with</span>
                  <span className="text-5xl font-black">₦10k</span>
                </div>
                
                <div className="mt-4 flex items-center gap-2">
                  <span>and pay</span>
                  <div><span className="text-5xl font-black">₦5k</span>
                <span className="mb-2 text-sm text-slate-400">/ month</span></div>
                </div>
                
              </div>

              <p className="mt-5 leading-7 text-slate-400">
                Start small. Join the community, learn, participate, connect and
                grow with ambitious people building their future.
              </p>

              <div className="my-7 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
                <div className="flex gap-3">
                  <Gift className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />

                  <div>
                    <p className="font-black text-emerald-300">
                      Build the community
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Introduce{" "}
                      <strong className="text-white">3 new people</strong> who
                      successfully join within your first 7 days and get 1 Month Free.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mb-4 font-bold text-white">
                Unlock when you introduce 3 people:
              </p>

              <ul className="space-y-3">
                {[
                  // "1 month free",
                  "₦5,000/month Community Builder rate",
                  "Community Builder recognition",
                  "Additional rewards and opportunities",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-slate-300"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                      <Check className="h-3 w-3 text-emerald-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
                <strong className="text-white">Important:</strong> {`If you don't
                introduce 3 new members for each month, your
                subscription changes to ₦20,000/month.`}
              </div>

              <button
               onClick={()=>{
                setPaymentOpen(true)
                setSubscriptionprice(10000)
              }} className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-4 font-bold text-slate-950 transition hover:bg-emerald-300">
                Subscribe For Community Edition
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* -------------------------------------------------
            ACADEMY EXPERIENCE
        -------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-24 max-w-5xl"
        >
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                  <BookOpen className="h-7 w-7" />
                </div>

                <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
                  The Full Academy Experience
                </p>

                <h3 className="mt-3 text-3xl font-black sm:text-4xl">
                  One monthly payment.
                  <span className="block text-blue-400">
                    One complete journey.
                  </span>
                </h3>

                <p className="mt-5 leading-7 text-slate-400">
                  The Full Academy is designed for learners who want more than
                  isolated tutorials. You get a structured pathway, practical
                  experience, live interaction and a community that keeps you
                  moving.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {academyFeatures.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.4,
                    }}
                    className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.025] p-4"
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                      <Check className="h-3 w-3 text-blue-400" />
                    </div>

                    <span className="text-sm leading-6 text-slate-300">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* -------------------------------------------------
            COMMUNITY BUILDER
        -------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <div className="rounded-2xl bg-emerald-400/10 p-4">
                <Users className="h-8 w-8 text-emerald-400" />
              </div>
            </div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
              Community Growth Path
            </p>

            <h3 className="mt-3 text-3xl font-black sm:text-5xl">
              Grow with the community.
            </h3>

            <p className="mt-5 text-slate-400">
              Your contribution can create opportunities beyond learning. Help
              other people discover the ecosystem and grow your role within
              Global Genius.
            </p>
          </div>

          <div className="relative mx-auto mt-12 max-w-6xl">
            {/* Connecting line */}
            <div className="absolute left-[12%] right-[12%] top-10 hidden h-px bg-gradient-to-r from-emerald-400/20 via-emerald-400/50 to-yellow-400/20 lg:block" />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {growthLevels.map((level, index) => {
                const Icon = level.icon;

                return (
                  <motion.div
                    key={level.number}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                    }}
                    whileHover={{ y: -6 }}
                    className="relative rounded-2xl border border-white/10 bg-[#080d20] p-6 text-center"
                  >
                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                      <Icon className="h-7 w-7 text-emerald-400" />

                      <span className="absolute -right-1 -top-1 flex h-7 min-w-7 items-center justify-center rounded-full bg-emerald-400 px-2 text-xs font-black text-slate-950">
                        {level.number}
                      </span>
                    </div>

                    <h4 className="mt-5 text-lg font-black">{level.title}</h4>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {level.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* -------------------------------------------------
            COMPARISON
        -------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-24 max-w-5xl"
        >
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]">
            <div className="border-b border-white/10 p-7 sm:p-10">
              <h3 className="text-2xl font-black sm:text-3xl">
                Which option is right for you?
              </h3>

              <p className="mt-3 text-slate-400">
                Choose your starting point. You can always grow into a deeper
                learning experience.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-6 text-sm text-slate-400">
                      What you want
                    </th>
                    <th className="p-6 text-center text-sm text-yellow-400">
                      ₦50k / Module
                    </th>
                    <th className="p-6 text-center text-sm text-blue-400">
                      ₦20k / Month
                    </th>
                    <th className="p-6 text-center text-sm text-emerald-400">
                      ₦5k / Month
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    ["Learn progressively", true, true, true],
                    ["Complete Academy", false, true, false],
                    ["3 live classes weekly", false, true, false],
                    ["Community access", false, true, true],
                    ["Pay module by module", true, false, false],
                    ["Community Builder pathway", false, false, true],
                  ].map(([label, module, academy, community]) => (
                    <tr
                      key={String(label)}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="p-6 text-sm font-medium text-slate-300">
                        {String(label)}
                      </td>

                      {[module, academy, community].map((active, index) => (
                        <td key={index} className="p-6 text-center">
                          {active ? (
                            <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/10">
                              <Check className="h-4 w-4 text-emerald-400" />
                            </div>
                          ) : (
                            <span className="text-slate-700">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* -------------------------------------------------
            FINAL CTA
        -------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto mt-24 max-w-5xl overflow-hidden rounded-[2.5rem] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.12] via-white/[0.035] to-blue-500/[0.08] p-8 text-center sm:p-14"
        >
          <div className="absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-[100px]" />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400/10">
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">
              Your Journey. Your Pace. Your Payment Plan.
            </p>

            <h3 className="mt-4 text-4xl font-black sm:text-5xl">
              Start where you are.
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Grow into who you can become.
              </span>
            </h3>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {`You don't need to wait until you can afford the entire program.
              Start small, learn consistently, build real skills, create real
              projects and grow into Software & AI Engineering.`}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-6 py-4">
                <p className="text-2xl font-black text-yellow-300">₦5,000</p>
                <p className="mt-1 text-xs text-slate-400">Community Edition</p>
              </div>

              <div className="rounded-2xl border border-blue-400/20 bg-blue-400/5 px-6 py-4">
                <p className="text-2xl font-black text-blue-300">₦20,000</p>
                <p className="mt-1 text-xs text-slate-400">Full Academy</p>
              </div>

              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-6 py-4">
                <p className="text-2xl font-black text-emerald-300">₦50,000</p>
                <p className="mt-1 text-xs text-slate-400">Per Module</p>
              </div>
            </div>

            {/* <button className="group mt-10 inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-8 py-4 text-base font-black text-slate-950 shadow-xl shadow-yellow-400/10 transition hover:bg-yellow-300">
              Start Your Journey
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button> */}

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
              <Headphones className="h-4 w-4" />
              Learn. Build. Create. Become.
            </div>
          </div>
        </motion.div>

        {/* -------------------------------------------------
            BRAND FOOTER
        -------------------------------------------------- */}
        {/* <div className="mt-16 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-slate-500">
            The Global Genius
          </p>

          <p className="mt-3 text-lg font-black text-white">
            Learn. Build. Create. Become.
          </p>
        </div> */}
      </div>
    </section>
  );
}
