import Heading from "./heading";
import Reveal from "./reveal";

export default function CareerBand() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9 grid lg:grid-cols-[.9fr_1.1fr] gap-10 items-center">
        <Heading
          eyebrow="THE BIGGER PICTURE"
          title={
            <>
              Not just a course. A foundation for{" "}
              <span className="text-[#7862D8]">{`what's possible.`}</span>
            </>
          }
          description="As their interests develop, students can explore many areas of modern technology. The goal is skills, curiosity and independence—not a guaranteed job title."
        />
        <Reveal>
          <div className="flex flex-wrap gap-2.5">
            {[
              "Software Engineering",
              "AI Engineering",
              "Machine Learning",
              "Data Science",
              "Web Development",
              "Mobile Apps",
              "Game Development",
              "Cloud Engineering",
              "MLOps",
              "Systems Engineering",
              "Generative AI",
              "Software Architecture",
            ].map((x, i) => (
              <span
                key={x}
                className={`rounded-full border px-4 py-3 text-xs sm:text-sm font-bold ${i % 4 === 0 ? "bg-[#FFF4D1] border-[#FFE2A4]" : i % 4 === 1 ? "bg-[#EAE6FF] border-[#DCD4FF]" : i % 4 === 2 ? "bg-[#EAF4FE] border-[#D7EBFB]" : "bg-[#F2F4F8] border-[#E7EAF1]"}`}
              >
                {x}
              </span>
            ))}
          </div>
          <p className="text-xs mt-5 leading-relaxed">
            Our curriculum may also support preparation for relevant third-party
            certifications in Python, cloud, Linux and other technologies;
            certification providers assess and award credentials independently.
          </p>
        </Reveal>
      </div>
    </section>
  );
}