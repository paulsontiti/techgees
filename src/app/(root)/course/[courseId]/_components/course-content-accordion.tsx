import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Chapter, Course, Session } from "@prisma/client";
import { ChapterContentAccordion } from "./chapter-content-accordion";

  
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
         
              <div className="flex items-center gap-x-2">
              
                <span className="line-clamp-1 text-sm">{course.title}</span>
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
  