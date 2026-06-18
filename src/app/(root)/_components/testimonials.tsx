"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import TestimonialCard from "./testimonial-card";
import { testimonials } from "../data/testimonial";

function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />

      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
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
          className="mx-auto max-w-4xl text-center"
        >
          <span
            className="
              rounded-full
              border
              border-green-500/20
              bg-green-500/10
              px-4
              py-2
              text-sm
              text-green-400
            "
          >
            Student Success Stories
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
            Loved By Students,
            <span
              className="
                block
                bg-gradient-to-r
                from-blue-400
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              Trusted By Parents
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Discover how learners are building confidence, developing practical
            skills, and transforming their future through technology education.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{ once: true }}
          className="mt-16 grid gap-6 md:grid-cols-4"
        >
          {[
            {
              number: "1000+",
              label: "Students",
            },
            {
              number: "4.9/5",
              label: "Average Rating",
            },
            {
              number: "95%",
              label: "Completion Rate",
            },
            {
              number: "100%",
              label: "Online Learning",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-8
                text-center
                backdrop-blur-xl
              "
            >
              <h3 className="text-4xl font-bold text-white">{stat.number}</h3>

              <p className="mt-2 text-slate-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div
          className="
            mt-20
            grid
            gap-8
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.fullName}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
              }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Review Banner */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div
            className="
              mx-auto
              max-w-5xl
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-10
              backdrop-blur-xl
            "
          >
            <div className="text-center">
              <Quote className="mx-auto h-10 w-10 text-blue-400" />

              <h3 className="mt-6 text-3xl font-bold text-white">
                Our Students Don't Just Learn — They Build Real Skills
              </h3>

              <p className="mx-auto mt-4 max-w-3xl text-slate-400">
                From complete beginners to aspiring professionals, our students
                gain practical experience through projects, mentorship,
                internships and career guidance.
              </p>

              <div className="mt-6 flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-3 text-slate-400">
                Rated highly by students and parents.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
