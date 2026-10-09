
import SessionProgress from "../single/[courseId]/chapters/[chapterId]/_components/session-progress";
import SessionDetails from "./session-details";
import BackButton from "@/components/back-button";

function SessionComponent({ sessionId, chapterId, sessionUrl,
  chapterUrl
}:
  {
    sessionId: string, chapterId: string,
    sessionUrl: string, chapterUrl: string,
  }) {

  return (
    <div className="
        flex flex-col max-w-4xl mx-auto pb-20 px-2">
      <SessionProgress sessionId={sessionId} chapterId={chapterId} />
     <BackButton url={chapterUrl} label="chapter page"/>
      <SessionDetails sessionId={sessionId} chapterId={chapterId}
        sessionUrl={sessionUrl}
        chapterUrl={chapterUrl}
      />

    </div>
  )
}

export default SessionComponent