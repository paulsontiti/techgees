"use client";

import { motion } from "framer-motion";
import { Module } from "../lib/phase";
import StartCourseLink from "./start-course-link";

type PhaseModulesProps = {
  phaseNumber: string;
  modules: Module[];
};

export default function PhaseModules({ phaseNumber, modules }: PhaseModulesProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f7f9fc] shadow-sm">
      <div className="border-b border-slate-200 bg-[#07152f] p-6 text-white sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#ffd429]">Phase {phaseNumber} curriculum</p>
            <h3 className="mt-2 text-3xl font-black sm:text-4xl">10 modules. One connected journey.</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Each module moves from understanding to practice and toward a project. Learners build depth instead of jumping from topic to topic.
            </p>
          </div>
          <div className="shrink-0 rounded-2xl bg-white/10 px-5 py-3 text-center">
            <div className="text-2xl font-black text-[#ffd429]">{modules.length}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">modules</div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-200 bg-white">
        {modules.map((module, index) => (
          <motion.details
            key={module.number}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.35, delay: index * 0.025 }}
            className="group px-5 py-5 sm:px-7 sm:py-6"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 [&::-webkit-details-marker]:hidden">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#07152f] text-sm font-black text-[#ffd429]">
                {String(module.number).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-black text-[#07152f] sm:text-lg">{module.title}</span>
                <span className="mt-1 block text-sm font-semibold text-slate-500">Module {module.number} of {modules.length}</span>
              </span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-xl font-medium text-slate-500 transition-transform group-open:rotate-45">+</span>
            </summary>

            <div className="ml-[3.75rem] mt-4 max-w-3xl pr-2 text-sm font-medium leading-7 text-slate-600">
              {module.description}
              {module.project && (
                <div className="mt-3 rounded-xl bg-[#f7f9fc] p-4 font-bold text-[#07152f]">
                  🚀 Project: {module.project}
                </div>
              )}
              <StartCourseLink moduleTitle={module.title}/>
            </div>
            
          </motion.details>
        ))}
      </div>
    </div>
  );
}
