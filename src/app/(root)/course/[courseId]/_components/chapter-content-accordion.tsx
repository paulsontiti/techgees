import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Chapter, Session } from "@prisma/client";
import { BookOpen, Video } from "lucide-react";
import Link from "next/link";

export function ChapterContentAccordion({
  chapter,
}: {
  chapter: Chapter & {
    sessions: Session[];
  };
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full px-2 my-2 bg-slate-100"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center justify-between my-2 bg-white px-2">
       
            <div className="flex items-center gap-x-2">
              <BookOpen className="w-4 h-4" />
              <span className="line-clamp-1 text-sm">{chapter.title}</span>
            </div>
            <div>
              {chapter.isFree && (
                <Link
                  href={`/courses/${chapter.courseId}/chapters/${chapter.id}`}
                  className="text-sm text-blue-500"
                >
                  Preview
                </Link>
              )}
            </div>
        
        </AccordionTrigger>
        <AccordionContent>
          <div>
            {chapter.sessions.map((session) => {
              return (
                <div
                key={session.id}
                className="my-2 bg-white p-2 flex items-center justify-between">
                  <div className="flex items-center gap-x-2">
                    <Video className="h-4" />
                    <span className="line-clamp-1">{session.title}</span>
                  </div>

                  {!!session.videoDuration && (
                    <span>{session.videoDuration} mins</span>
                  )}
                </div>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
