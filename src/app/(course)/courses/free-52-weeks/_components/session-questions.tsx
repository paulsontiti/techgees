"use client";
import { Question, UserProgress } from "@prisma/client";
import SessionTest from "../../combo/[courseId]/child/[childId]/chapters/[chapterId]/sessions/[sessionId]/_components/session-test";
import SessionTestAnswers from "../../components/session-test-answers";

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
          sessionurl={`${sessionUrl}${sessionId}`}
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
