import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Chapter, Course, Session } from "@prisma/client";
import { ChapterContentAccordion } from "./chapter-content-accordion";
import { StatInfoDialog } from "./stat-info-dialog";

  
  export function CourseContentAccordion({
    course,
  }: {
    course:Course &{
    chapters: (Chapter & {
      sessions: Session[];
    })[]}
  }) {
    return (
      <Accordion
        type="single"
        collapsible
        className="w-full px-2 my-2 bg-slate-100"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger >
         
              <div className="flex items-center justify-between w-full">
              
                <span className="line-clamp-1 text-sm">{course.title}</span>
                <StatInfoDialog
                numberOfComments={987}
                numberOfStudents={213}
                likes={599}
                disLikes={2}
                title={course.title}
                description={course.description ?? ""}
                rating={0}
                />
              </div>
             
          
          </AccordionTrigger>
          <AccordionContent>
            <div>
              {course.chapters.map((chapter) => {
                return (
                 <ChapterContentAccordion chapter={chapter} key={chapter.id}/>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
  