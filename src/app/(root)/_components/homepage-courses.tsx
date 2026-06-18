"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Course } from "@prisma/client";

import HomePageCourseCard from "./homepage-course-card";
import { Skeleton } from "@/components/ui/skeleton";

function HomepageCourses() {
  const [courses, setCourses] = useState<Course[]>();

  useEffect(() => {
    const getCourses = async () => {
      try {
        const { data } = await axios.get("/api/courses");
        setCourses(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    getCourses();
  }, []);

  if (courses === undefined) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-6">
          <Skeleton className="h-10 w-72 mx-auto" />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-[380px] rounded-3xl"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section className="py-24 text-center">
        <h3 className="text-2xl font-bold text-white">
          Courses Coming Soon
        </h3>

        <p className="mt-4 text-slate-400">
          New programs are currently being added.
        </p>
      </section>
    );
  }

  return (
    <section
      id="courses"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />

      <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
            Explore Programs
          </span>

          <h2
            className="
              mt-6
              text-4xl
              font-bold
              text-white
              md:text-6xl
            "
          >
            Learn Future-Proof
            <span
              className="
                block
                bg-gradient-to-r
                from-blue-400
                via-cyan-400
                to-purple-500
                bg-clip-text
                text-transparent
              "
            >
              Tech Skills
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Master Software Engineering, Artificial
            Intelligence, Cybersecurity, Robotics,
            Data Science, Cloud Computing and more
            through hands-on projects and expert mentorship.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-8"
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white">
              {courses.length}+
            </h3>
            <p className="text-slate-400">
              Programs
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-white">
              Live
            </h3>
            <p className="text-slate-400">
              Mentorship
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-white">
              Real
            </h3>
            <p className="text-slate-400">
              Projects
            </p>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <div
          className="
            mt-20
            grid
            gap-8
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.05,
              }}
            >
              <HomePageCourseCard
                course={course}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
          }}
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
              Not Sure Where To Start?
            </h3>

            <p className="mt-4 text-slate-400">
              Book a free consultation and let our
              mentors help you choose the best
              learning path for your goals.
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
              Schedule Free Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HomepageCourses;