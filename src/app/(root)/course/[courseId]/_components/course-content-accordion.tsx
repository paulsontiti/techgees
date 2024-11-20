import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Chapter, Course, Session } from "@prisma/client";
import { ChapterContentAccordion } from "./chapter-content-accordion";
import Link from "next/link";
import { bgNeutralColor, bgNeutralColor2, bgPrimaryColor, bgSecondaryColor, textPrimaryColor } from "@/utils/colors";


export async function CourseContentAccordion({
  course,
}: {
  course: Course & {
    chapters: (Chapter & {
      sessions: Session[];
    })[]
  }
}) {

  return (
    <Accordion
      type="single"
      collapsible
      className={`w-full my-2 bg-white ${textPrimaryColor}`}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-2">
          <div className="flex items-center justify-start w-full">
            <span className="w-8/12 text-sm  text-left">{course.title}</span>
            <Link className={`${bgNeutralColor} p-2 rounded-xl`} href={`/course/${course.id}`}>More info</Link>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div>
            {course.chapters.map((chapter) => {
              return (
                <ChapterContentAccordion chapter={chapter} key={chapter.id} />
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
