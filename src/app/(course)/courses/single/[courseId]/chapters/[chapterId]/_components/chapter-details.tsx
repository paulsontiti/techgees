
import React from "react";
import { Separator } from "@/components/ui/separator";

import ChapterComments from "./comments";
import { Preview } from "@/components/preview";
import ChapterSessionDetails from "@/components/chapter-session-details";
import { SingleChapterEnrollButton } from "./single-chapter-enroll-button";

import BackButton from "@/components/back-button";
import { OpenSheetButton } from "@/components/open-sheet";
import { ChapterDetailsType } from "../../../../../../../../../actions/getChapterdetails";
import ProjectList from "./project-list";
import AssignmentAccordion from "@/app/(course)/courses/combo/[courseId]/child/[childId]/chapters/[chapterId]/sessions/[sessionId]/_components/assignment-accordion";

function ChapterDetails({
  courseId,
  chapterId,
  isChildCourse,
  onScholarship,
  chapterDetails,
}: {
  courseId: string;
  chapterId: string;
  isChildCourse?: boolean;
  onScholarship: boolean;
  chapterDetails: ChapterDetailsType | null;
}) {
  // const [completedLastSession, setCompletedLastSession] = useState<
  //   boolean | undefined
  // >(undefined);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       // const res = await axios.get(
  //       //   `/api/chapters/${chapterId}/chapter-page-details`
  //       // );
  //       // setChapterDetails(res.data);

  //       const sessionRes = await axios.get(
  //         `/api/chapters/${chapterId}/completed-last-session`
  //       );
  //       setCompletedLastSession(sessionRes.data);
  //     } catch (err: any) {
  //       toast.error(err.message);
  //     }
  //   })();
  // }, []);

  // if (chapterDetails === undefined)
  //   return <Skeleton className="w-full h-96 my-2" />;

  let duration = 0;
  const chapter = chapterDetails?.chapter;
  const sessions = chapter?.sessions || [];

  sessions.map((session) => {
    duration += session.videoDuration ?? 0;
  });

  //create 10 random questions from all the questions
  // const randonQuestions: Question[] = [];

  // if (!!chapter?.questions.length) {
  //   for (let i = 0; i < 10; i++) {
  //     const index = Math.floor(Math.random() * chapter.questions.length);

  //     if (
  //       !randonQuestions.find((que) => que.id === chapter?.questions[index].id)
  //     ) {
  //       randonQuestions.push(chapter.questions[index]);
  //     }
  //   }
  // }

  //logic for showing enroll button
  const showEnrollButton = !isChildCourse && !onScholarship;


  return (
    <div
      className="
        flex flex-col max-w-4xl mx-auto pb-20"
    >
      <BackButton label="course page" url={`/courses/single/${courseId}`} />
      <div className="p-4 flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-2xl font-semibold mb-2">{chapter?.title}</h2>
        <SingleChapterEnrollButton
          showButton={showEnrollButton}
          courseId={courseId}
          chapterId={chapterId}
        />
      </div>
      <Separator />
      <div>
        <Preview value={chapterDetails?.chapter?.description ?? ""} />
      </div>
      <ChapterSessionDetails
        sessionLength={chapterDetails?.chapter?.sessions.length || 0}
        duration={duration}
        noOfProjects={chapterDetails?.chapter?.chapterProjects.length || 0}
      />

      <OpenSheetButton label="Go to class" />

      <ChapterComments chapterId={chapterId} />

      {/* <Separator />
      <div id="chapter-test">
        {completedLastSession === undefined ? (
          <Skeleton className="w-full h-10" />
        ) : (
          <>
            {completedLastSession &&
              chapterDetails?.userProgress === null &&
              randonQuestions.length > 0 && (
                <ChapterTest
                  questions={randonQuestions}
                  chapterId={chapterDetails.chapter?.id || ""}
                  chapterUrl={`/courses/single/${courseId}/chapters/${chapterId}`}
                />
              )}
          </>
        )}
      </div> */}

      <Separator />
      {!!chapterDetails?.chapter?.chapterProjects.length && (
        <ProjectList
          chapterProjects={chapterDetails?.chapter?.chapterProjects}
          courseId={courseId}
          chapterId={chapterId}
        />
      )}

      <Separator />

      {!!chapterDetails?.chapter?.assignments.length && (
        <div id="chapter-assignment">
          <h2 className="text-xl my-2 font-bold">Assignments</h2>
          {chapterDetails.chapter.assignments.map((assignment,index) => {
            return (
              <AssignmentAccordion
              assignmentNumber={index + 1}
                assignment={assignment}
                key={assignment.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ChapterDetails;
