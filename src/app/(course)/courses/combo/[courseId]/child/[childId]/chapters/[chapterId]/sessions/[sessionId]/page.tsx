import SessionComponent from "@/app/(course)/courses/components/session-component";

async function SessionIdPage({
  params: { courseId, chapterId, sessionId, childId },
}: {
  params: { courseId: string; childId: string, chapterId: string; sessionId: string };
}) {
 


  return (
   <SessionComponent
    chapterId={chapterId}
    sessionId={sessionId}
    sessionUrl={`/courses/combo/${courseId}/child/${childId}/chapters/${chapterId}/sessions/`}
    chapterUrl={`/courses/combo/${courseId}/child/${childId}/chapters/${chapterId}`}
   
   />
  );
}

export default SessionIdPage;
