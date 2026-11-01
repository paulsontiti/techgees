import { GraduationCap, Heart, Users } from "lucide-react";
import Heading from "./heading";
import Reveal from "./reveal";
import { bgSecondaryColor, textPrimaryColor } from "@/utils/colors";

export default function BeyondLessons() {
  const benefits = [
    {
      icon: Users,
      eyebrow: "GUIDANCE",
      title: "Personal coaching & follow-up",
      copy: "The existing academy highlights mentoring, individual guidance and learner check-ins to help students stay on track.",
    },
    {
      icon: GraduationCap,
      eyebrow: "PRACTICAL EXPERIENCE",
      title: "Internship opportunities",
      copy: "An internship program is described on the current platform. Ask admissions about application requirements and present availability.",
    },
    {
      icon: Heart,
      eyebrow: "COMMUNITY",
      title: "Grow together",
      copy: "Learn in a community, share ideas and ask about current member-introduction rewards and eligibility.",
    },
  ];
  return (
    <section className="bg-[#0C1432] text-white py-16 md:py-20">
      <div className="max-w-xl lg:max-w-7xl mx-auto px-5 sm:px-7 lg:px-9">
        <Heading
          light
          eyebrow="BEYOND THE VIDEO LESSON"
          title={
            <>
              Learning with people{" "}
              <span className="gradient-text">behind you.</span>
            </>
          }
          description="Flexible recordings are just one part of the experience. Get guidance and grow within a wider learning community."
        />
        <div className="mt-10 grid lg:grid-cols-3 gap-4">
          {benefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.07}>
                <article className="bg-white/[.075] border border-white/10 rounded-[24px] p-6 h-full">
                  <div
                    className={`h-12 rounded-xl ${bgSecondaryColor} ${textPrimaryColor} flex gap-2 items-center justify-center`}
                  >
                    <Icon size={24} />
                    <h3 className="text-[10px] font-bold tracking-[.17em] text-sun">
                      {item.eyebrow}
                    </h3>
                  </div>

                  <h3 className="text-xl font-black mt-2">{item.title}</h3>
                  <p className="text-sm leading-[1.8] text-white/60 mt-3">
                    {item.copy}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}