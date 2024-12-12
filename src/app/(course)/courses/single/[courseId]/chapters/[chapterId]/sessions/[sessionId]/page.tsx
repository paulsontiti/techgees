
import { redirect } from "next/navigation";
import React from "react";
import ErrorPage from "@/components/error";
import Banner from "@/components/banner";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { File } from "lucide-react";
import SessionComments from "./_components/comments";
import AssignmentAccordion from "./_components/assignment-accordion";
import PrvSessionButton from "../../../../../../../../../components/prv-session-button";
import { getSessionAttachmentsNextSessionuserprogress } from "../../../../../../../../../../actions/getSessionAttachmentsNextSessionuserprogress";
import { getSessionLikesCount } from "../../../../../../../../../../actions/getSessionLikesCount";
import { getSessionDisLikesCount } from "../../../../../../../../../../actions/getSessionDisLikesCount";
import { getSessionComments } from "../../../../../../../../../../actions/getSessionComments";
import { hasLikedSession } from "../../../../../../../../../../actions/hasLikedSession";
import { hasDisLikedSession } from "../../../../../../../../../../actions/hasDisLikedSession";
import { getSessionStudentsCount } from "../../../../../../../../../../actions/getSessionStudentsCount";
import { hasRatedSession } from "../../../../../../../../../../actions/hasRatedSession";
import { getSessionRating } from "../../../../../../../../../../actions/getSessionRating";
import { getSessionNumberOfRatings } from "../../../../../../../../../../actions/getSessionNumberOfRatings";
import { getSessionProgress } from "../../../../../../../../../../actions/getSessionProgress";
import NextPrevSessionButton from "@/components/next-prev-session-button";
import VideoPlayer from "@/components/video-player";
import SessionTest from "@/app/(course)/courses/combo/[courseId]/child/[childId]/chapters/[chapterId]/sessions/[sessionId]/_components/session-test";
import { getUserCookie } from "@/lib/get-user-cookie";
import { isTheLastSession } from "../../../../../../../../../../actions/isTheLastSession";
import SessionComponent from "@/app/(course)/courses/components/session-component";

async function SessionIdPage({
  params: { courseId, chapterId, sessionId },
}: {
  params: { courseId: string; chapterId: string; sessionId: string };
}) {


  return (
    <SessionComponent
    sessionId={sessionId}
    chapterId={chapterId}
    chapterUrl={`/courses/single/${courseId}/chapters/${chapterId}`}
    sessionUrl={`/courses/single/${courseId}/chapters/${chapterId}/sessions/`}
    />


    // <div id="top" className="mt-4 bg-white px-2">
    //   {userProgress?.isCompleted && (
    //     <Banner variant="success" label="You already completed this session." />
    //   )}

    //   <div
    //     className="
    //     flex flex-col max-w-4xl mx-auto pb-20 mt-4"
    //   >
    //     <div >
    //       <div className="p-4 flex flex-col md:flex-row items-center justify-between">
    //         <h2 className="text-2xl font-semibold mb-2">{session.title}</h2>
    //       </div>
    //       <Separator />
    //       <div className="max-w-[370px] md:max-w-full">
    //         <Preview value={session.description ?? ""} />
    //       </div>
    //       {attachments.length > 0 && (
    //         <>
    //           <Separator />
    //           <div className="p-4">
    //             {attachments.map((attachment) => {
    //               return (
    //                 <a
    //                   href={attachment.url}
    //                   target="_blank"
    //                   key={attachment.id}
    //                   className="
    //             flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
    //                 >
    //                   <File className="mr-2" />
    //                   <p className="line-clamp-1">{attachment.name}</p>
    //                 </a>
    //               );
    //             })}
    //           </div>
    //         </>
    //       )}
    //     </div>
    //     {
    //            prvSessionId && !prvSessionProgress?.isCompleted ?
    //               <div className="flex flex-col gap-y-2">

    //                 <Banner variant="warning"
    //                   label="You can't access this session because you have not completed the previous session" />

    //                 <PrvSessionButton
    //                   url={`/courses/single/${courseId}/chapters/${chapterId}/sessions/${previousSession?.id}`} />

    //               </div> :

    //               <>

    //                 <VideoPlayer
    //                   url={session?.videoUrl ?? ""}
    //                   title={session.title}
    //                 />
    //                 <NextPrevSessionButton
    //                   hasNextSession={!!nextSession}
    //                   prevSessionUrl={`${previousSession?.id}`}
    //                   nextSessionUrl={`/courses/single/${courseId}/chapters/${chapterId}/sessions/${nextSession?.id}`}
    //                   hasPreviousSession={!!previousSession} />
    //                 <SessionComments
    //                   numberOfLikes={numberOfLikes}
    //                   numberOfDisLikes={numberOfDisLikes}
    //                   numberOfRatings={numberOfRatings}
    //                   comments={comments}
    //                   sessionId={sessionId}
    //                   hasLiked={hasLiked}
    //                   hasDisLiked={hasDisLiked}
    //                   numberOfStudents={numberOfStudents}
    //                   rating={averageRating}
    //                   hasRated={hasRated}
    //                 />

    //                 <Separator />
    //                 {(userProgress === null &&
    //                   session.questions.length > 0) &&
    //                   <SessionTest questions={session.questions} sessionId={sessionId}
    //                   isLastSession={isLastSession}
                    
    //                   />}
    //                 <Separator />

    //                 {assignments.length > 0 && <>
    //                   <h2 className='text-xl my-2 font-bold'>Assignments</h2>
    //                   {
    //                     assignments.map((assignment) => {

    //                       return <AssignmentAccordion assignment={assignment} key={assignment.id} />
    //                     })
    //                   }
    //                 </>}
    //               </>
          

    //     }



    //   </div>
    // </div>
  );
}

export default SessionIdPage;
