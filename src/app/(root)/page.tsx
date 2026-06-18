import { WelcomeMessage } from "./_components/welcome-message";
import WhyGlobalGenius from "./_components/why-global-genius";
import Testimonials from "./_components/testimonials";
import HomepageCourses from "./_components/homepage-courses";
import EarningAd from "@/components/earning-ad";

export default function Home() {
  return (
    <main className="overflow-hidden bg-slate-950 text-white">
      {/* Hero */}
      <WelcomeMessage />

      {/* Trusted By */}
      <section className="border-y border-white/10 bg-slate-900/50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-10 text-center text-sm text-slate-400 md:text-base">
            <span>🌍 Global Community</span>
            <span>💻 Live Tech Classes</span>
            <span>🚀 Real-World Projects</span>
            <span>🎯 Career Focused</span>
            <span>🏆 Industry Mentors</span>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
        <div className="relative z-10">
          <WhyGlobalGenius />
        </div>
      </section>

      {/* Programs */}
      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
              Programs
            </span>

            <h2 className="mt-6 text-4xl font-bold md:text-6xl">
              Learn Future-Proof Skills
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-slate-400">
              From Software Engineering to Artificial Intelligence,
              Cybersecurity, Robotics, UI/UX Design and Data Science.
            </p>
          </div>

          <HomepageCourses />
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-cyan-900/20 p-8 backdrop-blur-md md:p-12">
            <div className="flex justify-center">
              <EarningAd />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="relative z-10">
          <div className="mb-16 text-center">
            <span className="rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-400">
              Testimonials
            </span>

            <h2 className="mt-6 text-4xl font-bold md:text-6xl">
              Success Stories
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-slate-400">
              Hear from students, parents and professionals who
              transformed their future through technology.
            </p>
          </div>

          <Testimonials />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-blue-950/20 to-slate-950" />

        <div className="relative z-10 container mx-auto px-6">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl md:p-20">
            <h2 className="text-4xl font-bold md:text-6xl">
              Ready To Start Your Tech Journey?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
              Join thousands of learners building skills in Software
              Engineering, AI, Cybersecurity, Robotics, Data Science
              and more.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                className="
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
                Start Free Trial
              </button>

              <button
                className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-8
                py-4
                font-semibold
                text-white
                backdrop-blur-md
              "
              >
                Explore Courses
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}