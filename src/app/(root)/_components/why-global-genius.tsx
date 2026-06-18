"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  UserCheck,
  Briefcase,
  CreditCard,
} from "lucide-react";

const FEATURES = [
  {
    icon: GraduationCap,
    number: "01",
    title: "Self-Paced Learning",
    description:
      "Learn anytime, anywhere with lifetime access to lessons, projects, quizzes, and downloadable resources.",
  },
  {
    icon: UserCheck,
    number: "02",
    title: "1-on-1 Mentorship",
    description:
      "Get personalized guidance from experienced software engineers and industry professionals.",
  },
  {
    icon: Briefcase,
    number: "03",
    title: "3-Month Internship",
    description:
      "Work on real-world projects and gain practical experience that prepares you for the job market.",
  },
  {
    icon: CreditCard,
    number: "04",
    title: "Flexible Payments",
    description:
      "Pay conveniently through installment plans and start learning without financial pressure.",
  },
];

export default function WhyGlobalGenius() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span
            className="
              rounded-full
              border
              border-blue-500/20
              bg-blue-500/10
              px-4
              py-2
              text-sm
              text-blue-400
            "
          >
            Why Choose Us
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-6xl">
            More Than Just
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              An Online School
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            We don't just teach technology. We help learners build
            practical skills, confidence, mentorship connections,
            and career opportunities.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-8
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:border-blue-500/30
                "
              >
                {/* Glow */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-blue-500/0
                    via-blue-500/0
                    to-blue-500/10
                    opacity-0
                    transition
                    duration-500
                    group-hover:opacity-100
                  "
                />

                <div className="relative z-10">
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-blue-500/10
                    "
                  >
                    <Icon className="h-8 w-8 text-blue-400" />
                  </div>

                  <p className="mt-6 text-sm font-medium text-blue-400">
                    {feature.number}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-24 text-center"
        >
          <div
            className="
              mx-auto
              max-w-4xl
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-10
              backdrop-blur-xl
            "
          >
            <h3 className="text-3xl font-bold text-white">
              Learn. Build. Get Mentored. Launch Your Career.
            </h3>

            <p className="mt-4 text-slate-400">
              Join students, professionals, and future innovators
              learning Software Engineering, AI, Cybersecurity,
              Robotics, Data Science, and more.
            </p>

            <button
              className="
                mt-8
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
              Start Your Free Trial
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}