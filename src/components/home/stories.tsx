import { studentVoices } from "@/lib/content";
import Heading from "./heading";
import Reveal from "./reveal";

export default function StudentStories() {
  return (
    <section id="stories" className="bg-white py-6">
      <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <Heading
            eyebrow="FROM OUR LEARNING COMMUNITY"
            title={
              <>
                Real learners.{" "}
                <span className="text-[#7862D8]">Real experiences.</span>
              </>
            }
            description="Students on our existing platform have shared what the learning process felt like: simple explanations, support, growing confidence and practical lessons."
          />
          <span className="text-xs font-bold">
            Adapted from published learner testimonials
          </span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {studentVoices.map((student, i) => (
            <Reveal key={student.name} delay={i * 0.07} className="h-full">
              <figure className="h-full rounded-[26px] border border-[#E9EBF2] bg-[#F9FAFE] p-6 sm:p-7 flex flex-col">
                <span
                  aria-hidden="true"
                  className="text-[#7D65D9] text-6xl leading-none font-serif"
                >
                  “
                </span>
                <blockquote className="text-[15px] font-semibold leading-[1.8] text-[#343C57] mt-1 flex-1">
                  {student.feedback}
                </blockquote>
                <figcaption className="mt-8 pt-5 border-t border-[#E2E5EF] flex items-center gap-3">
                  <span
                    className={`h-12 w-12 shrink-0 rounded-full flex items-center justify-center font-black text-sm ${i % 2 === 0 ? "bg-[#E8E0FF] text-[#5745A5]" : "bg-[#FFE8B7] text-[#77550A]"}`}
                  >
                    {student.initials}
                  </span>
                  <span>
                    <strong className="text-sm block">{student.name}</strong>
                    <span className="text-xs">{student.focus}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-7 text-xs leading-relaxed">
          These statements summarize feedback already shown on The Global Genius
          website; they do not represent guaranteed results for every learner.
        </p>
      </div>
    </section>
  );
}