
import SessionProgress from "../single/[courseId]/chapters/[chapterId]/_components/session-progress";
import SessionDetails from "./session-details";

function SessionComponent({ sessionId, chapterId, sessionUrl,
  chapterUrl
}:
  {
    sessionId: string, chapterId: string,
    sessionUrl: string, chapterUrl: string,
  }) {


  return (
    <div className="mt-4">
      <SessionProgress sessionId={sessionId} chapterId={chapterId} />
      <SessionDetails sessionId={sessionId} chapterId={chapterId}
        sessionUrl={sessionUrl}
        chapterUrl={chapterUrl}
      />

    </div>
  )
}

export default SessionComponent