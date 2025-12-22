"use client";
import SessionTest from "@/app/(course)/courses/combo/[courseId]/child/[childId]/chapters/[chapterId]/sessions/[sessionId]/_components/session-test";
import SessionTestAnswers from "@/app/(course)/courses/components/session-test-answers";
import { Question, UserProgress } from "@prisma/client";

type SessionQuestionsType = {
  sessionId: string;
  sessionUrl: string;
  chapterUrl: string;
  userProgress:UserProgress | undefined,
  sessionQuestions:Question[]
  isLastSession:boolean
};

function SessionQuestions({
  sessionId,
  sessionUrl,
  chapterUrl,
  userProgress,sessionQuestions,isLastSession
}: SessionQuestionsType) {


  return (
    <div>
      {!userProgress?.isCompleted ? (
        <SessionTest
          questions={sessionQuestions}
          sessionId={sessionId}
          sessionurl={`${sessionUrl}`}
          chapterUrl={chapterUrl}
          isLastSession={isLastSession || false}
        />
      ) : (
        <SessionTestAnswers questions={sessionQuestions || []} />
      )}
    </div>
  );
}

export default SessionQuestions;
