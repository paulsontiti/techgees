import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Chapter, Course, Session } from "@prisma/client";
import { ChapterContentAccordion } from "./chapter-content-accordion";
import { StatInfoDialog } from "./stat-info-dialog";
import Banner from "@/components/banner";
import { getCourseNumberOfRatings } from "../../../../../../actions/getCourseNumberOfRatings";
import { getCourseRating } from "../../../../../../actions/getCourseRating";
import { getCourseLikesCount } from "../../../../../../actions/getCourseLikesCount";
import { getCourseDisLikesCount } from "../../../../../../actions/getCourseDisLikesCount";
import { getCourseCommentsCount } from "../../../../../../actions/getCourseCommentsCount";
import { getCountOfPaymentByCourseId } from "../../../../../../actions/getCountOfPaymentByCourseId";


export async function CourseContentAccordion({
  course,
}: {
  course: Course & {
    chapters: (Chapter & {
      sessions: Session[];
    })[]
  }
}) {

  const courseId = course.id

  const { numberOfPayments, error: error } = await getCountOfPaymentByCourseId(
    courseId
  );
  if (error) return <Banner variant="error" label={error.message} />;


  const { numberOfRatings, error: ratingError } = await getCourseNumberOfRatings(
    courseId
  );
  if (ratingError) return <Banner variant="error" label={ratingError.message} />;



  const { averageRating, error: numRatingError } = await getCourseRating(
    courseId
  );
  if (numRatingError) return <Banner variant="error" label={numRatingError.message} />;

  const { numberOfLikes, error: likesError } = await getCourseLikesCount(
    courseId
  );
  if (likesError) return <Banner variant="error" label={likesError.message} />;

  const { numberOfDisLikes, error: disLikesError } = await getCourseDisLikesCount(
    courseId
  );
  if (disLikesError) return <Banner variant="error" label={disLikesError.message} />;


  const { numberOfComments, error: commentsError } = await getCourseCommentsCount(
    courseId
  );

  if (commentsError) return <Banner variant="error" label={commentsError.message} />

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
              numberOfComments={numberOfComments}
              numberOfStudents={numberOfPayments}
              likes={numberOfLikes}
              disLikes={numberOfDisLikes}
              title={course.title}
              description={course.description ?? ""}
              rating={averageRating}
              numberOfRatings={numberOfRatings}
            />
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
