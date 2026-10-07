"use client";

import { motion } from "framer-motion";
import { Brain, Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
  color?: string;
}

export default function LoadingComponent({
  message = "Loading your learning experience...",
  color = "text-slate-950",
}: LoadingProps) {
  return (
    <div className=" flex flex-col items-center justify-center px-6 text-center ">
      <div className="mt-2 flex items-center gap-3">
        <Loader2 className="h-4 w-4 animate-spin text-yellow-400" />

        <motion.p
          className={`text-sm ${color}`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {message}
        </motion.p>
      </div>{" "}
      {/* Progress dots */}
      <div className="mt-5 flex gap-1.5">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="h-1.5 w-1.5 rounded-full bg-yellow-400"
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: dot * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );

  // <div
  //   className={`flex items-center justify-center bg-slate-950 ${
  //     fullScreen ? "min-h-screen" : "min-h-[100px]"
  //   }`}
  // >
  //   <div className="flex flex-col items-center justify-center px-6 text-center">
  //     {/* Animated Logo */}
  //     <div className="relative flex h-20 w-20 items-center justify-center">
  //       {/* Outer pulse */}
  //       <motion.div
  //         className="absolute inset-0 rounded-2xl border border-yellow-400/20"
  //         animate={{
  //           scale: [1, 1.25, 1],
  //           opacity: [0.6, 0, 0.6],
  //         }}
  //         transition={{
  //           duration: 2,
  //           repeat: Infinity,
  //           ease: "easeInOut",
  //         }}
  //       />

  //       {/* Glow */}
  //       <motion.div
  //         className="absolute inset-2 rounded-2xl bg-yellow-400/10 blur-xl"
  //         animate={{
  //           opacity: [0.3, 0.8, 0.3],
  //         }}
  //         transition={{
  //           duration: 1.8,
  //           repeat: Infinity,
  //           ease: "easeInOut",
  //         }}
  //       />

  //       {/* Icon */}
  //       <motion.div
  //         animate={{
  //           rotate: [0, 5, -5, 0],
  //           scale: [1, 1.05, 1],
  //         }}
  //         transition={{
  //           duration: 2,
  //           repeat: Infinity,
  //           ease: "easeInOut",
  //         }}
  //         className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10"
  //       >
  //         <Brain className="h-8 w-8 text-yellow-400" />
  //       </motion.div>
  //     </div>

  //     {/* Brand */}
  //     {/* <motion.div
  //       initial={{ opacity: 0, y: 10 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       className="mt-6"
  //     >
  //       <h2 className="text-xl font-black tracking-tight text-white">
  //         THE GLOBAL GENIUS
  //       </h2>

  //       <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">
  //         Learn. Build. Create. Become.
  //       </p>
  //     </motion.div> */}

  //   </div>
  // </div>
}
