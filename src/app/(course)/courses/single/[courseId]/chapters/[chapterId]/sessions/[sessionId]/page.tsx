
import React from "react";
import SessionComponent from "@/app/(course)/courses/components/session-component";

function SessionIdPage({
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
  );
}

export default SessionIdPage;
