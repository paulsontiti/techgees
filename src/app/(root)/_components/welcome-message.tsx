"use client";

import { motion } from "framer-motion";
import StartFreeClassButton from "@/components/start-free-class-button";

export const WelcomeMessage = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("/assets/home-bg.png")`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/80" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-slate-950/80 to-black" />

      {/* Floating Blurs */}
      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
      />

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex min-h-screen items-center justify-center">
          <div className="max-w-6xl text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300 backdrop-blur-md"
            >
              🚀 Africa's Future Starts Here
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl font-black tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              Build the Next
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Global Genius
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-slate-300 md:text-2xl"
            >
              Empowering children, teenagers, and adults with
              world-class skills in Software Engineering, Artificial
              Intelligence, Robotics, Cybersecurity, Data Science,
              Cloud Computing, and Digital Innovation.
            </motion.p>

            {/* Mission Statement */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-6 max-w-3xl text-base text-slate-400 md:text-lg"
            >
              Bridging Africa's technological gap and preparing the next
              generation of innovators, creators, engineers, and founders.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <StartFreeClassButton url="/courses" />

              <button
                className="
                rounded-xl border border-slate-700
                bg-white/5 px-8 py-4
                text-white backdrop-blur-md
                transition-all duration-300
                hover:border-white/30
                hover:bg-white/10
              "
              >
                Explore Programs
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4"
            >
              {[
                {
                  value: "1000+",
                  label: "Students",
                },
                {
                  value: "20+",
                  label: "Tech Programs",
                },
                {
                  value: "100%",
                  label: "Online Learning",
                },
                {
                  value: "Global",
                  label: "Community",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                >
                  <h3 className="text-3xl font-bold text-white">
                    {item.value}
                  </h3>
                  <p className="mt-2 text-slate-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="mt-16 flex justify-center"
            >
              <div className="flex h-12 w-7 justify-center rounded-full border border-slate-500">
                <div className="mt-2 h-3 w-3 rounded-full bg-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};