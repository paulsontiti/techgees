import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Chapter, Session } from "@prisma/client";
import { BookOpen, Video } from "lucide-react";
import { getChapterCommentsCount } from "../../../../../../actions/getChapterCommentsCount";
import Banner from "@/components/banner";
import { getChapterRating } from "../../../../../../actions/getChapterRating";
import { getChapterLikesCount } from "../../../../../../actions/getChapterLikesCount";
import { getChapterDisLikesCount } from "../../../../../../actions/getChapterDisLikesCount";
import { getChapterNumberOfRatings } from "../../../../../../actions/getChapterNumberOfRatings";
import { getChapterStudentsCount } from "../../../../../../actions/getChapterStudentsCount";
import { bgNeutralColor2, textPrimaryColor } from "@/utils/colors";
import { ChapterStatInfoDialog } from "./stat-info-dialog";

export function ChapterContentAccordion({
  chapter,
}: {
  chapter: Chapter & {
    sessions: Session[];
  };
}) {

  if (!chapter) return null


  // const { numberOfStudents, error: error } = await getChapterStudentsCount(
  //   chapter.id
  // );
  // if (error) return <Banner variant="error" label={error.message} />;


  // const { numberOfRatings, error: ratingError } = await getChapterNumberOfRatings(
  //   chapter.id
  // );
  // if (ratingError) return <Banner variant="error" label={ratingError.message} />;



  // const { averageRating, error: numRatingError } = await getChapterRating(
  //   chapter.id
  // );
  // if (numRatingError) return <Banner variant="error" label={numRatingError.message} />;

  // const { numberOfLikes, error: likesError } = await getChapterLikesCount(
  //   chapter.id
  // );
  // if (likesError) return <Banner variant="error" label={likesError.message} />;

  // const { numberOfDisLikes, error: disLikesError } = await getChapterDisLikesCount(
  //   chapter.id
  // );
  // if (disLikesError) return <Banner variant="error" label={disLikesError.message} />;


  // const { numberOfComments, error: commentsError } = await getChapterCommentsCount(
  //   chapter.id
  // );

  // if (commentsError) return <Banner variant="error" label={commentsError.message} />
  return (
    <Accordion
      type="single"
      collapsible
      className={`w-full px-2 my-2 ${bgNeutralColor2} ${textPrimaryColor}`}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-2 gap-x-2">

          <div className="flex items-center justify-start w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-x-2 w-9/12">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm text-left">{chapter.title}</span>
              </div>
           {chapter.isPublished &&    <div className="flex justify-end">
                <ChapterStatInfoDialog
                 chapterId={chapter.id}
                 title={chapter.title}
                 description={chapter.description || ""}
                />

              </div>}
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
