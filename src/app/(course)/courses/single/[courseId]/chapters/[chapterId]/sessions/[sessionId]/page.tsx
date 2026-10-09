import React from "react";
import SessionComponent from "@/app/(course)/courses/components/session-component";

function SessionIdPage({
  params: { courseId, chapterId, sessionId },
}: {
  params: { courseId: string; chapterId: string; sessionId: string };
}) {
  return (
    <section className="bg-[#07152f] flex flex-col gap-4 p-2 text-white">
      <SessionComponent
        sessionId={sessionId}
        chapterId={chapterId}
        chapterUrl={`/courses/single/${courseId}/chapters/${chapterId}/#chapter-test`}
        sessionUrl={`/courses/single/${courseId}/chapters/${chapterId}/sessions/`}
      />
    </section>
  );
}

export default SessionIdPage;
