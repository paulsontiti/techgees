import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Chapter, Session } from "@prisma/client";
import { BookOpen, Video } from "lucide-react";
import Link from "next/link";
import { StatInfoDialog } from "./stat-info-dialog";
import { getChapterCommentsCount } from "../../../../../../actions/getChapterCommentsCount";
import Banner from "@/components/banner";
import { getChapterRating } from "../../../../../../actions/getChapterRating";
import { getChapterLikesCount } from "../../../../../../actions/getChapterLikesCount";
import { getChapterDisLikesCount } from "../../../../../../actions/getChapterDisLikesCount";
import { getChapterNumberOfRatings } from "../../../../../../actions/getChapterNumberOfRatings";
import { getChapterStudentsCount } from "../../../../../../actions/getChapterStudentsCount";

export async function ChapterContentAccordion({
  chapter,
}: {
  chapter: Chapter & {
    sessions: Session[];
  };
}) {

  if(!chapter) return null

  
  const { numberOfStudents, error: error } = await getChapterStudentsCount(
    chapter.id
  );
  if (error) return <Banner variant="error" label={error.message} />;


  const { numberOfRatings, error: ratingError } = await getChapterNumberOfRatings(
    chapter.id
  );
  if (ratingError) return <Banner variant="error" label={ratingError.message} />;



  const {averageRating, error: numRatingError } = await getChapterRating(
    chapter.id
  );
  if (numRatingError) return <Banner variant="error" label={numRatingError.message} />;

  const { numberOfLikes, error: likesError } = await getChapterLikesCount(
    chapter.id
  );
  if (likesError) return <Banner variant="error" label={likesError.message} />;

  const { numberOfDisLikes, error: disLikesError } = await getChapterDisLikesCount(
    chapter.id
  );
  if (disLikesError) return <Banner variant="error" label={disLikesError.message} />;


  const { numberOfComments, error: commentsError } = await getChapterCommentsCount(
    chapter.id
  );

  if(commentsError) return <Banner variant="error" label={commentsError.message}/>
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full px-2 my-2 bg-slate-100"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger >
       
           <div className="w-full flex items-center justify-between my-2 bg-white p-2 ">
           <div className="flex items-center gap-x-2">
              <BookOpen className="w-4 h-4" />
              <span className="line-clamp-1 text-sm">{chapter.title}</span>
            </div>
            <div>
             <div className="flex items-center gap-x-2">
             <StatInfoDialog
             numberOfComments ={numberOfComments}
             numberOfRatings={numberOfRatings}
              numberOfStudents={numberOfStudents}
              likes={numberOfLikes}
              disLikes={numberOfDisLikes}
              title={chapter.title}
              description={chapter.description  ?? ""}
              rating={averageRating}
              />
              {chapter.isFree && (
                <Link
                  href={`/courses/${chapter.courseId}/chapters/${chapter.id}`}
                  className="text-sm text-blue-500"
                >
                  Preview
                </Link>
              )}
             </div>
            </div>
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
