import { OtherSession } from "@/app/(auth)/teacher/courses/[courseId]/chapters/[chapterId]/_components/sessions-list";
import { db } from "@/lib/db";
import { Session } from "@prisma/client";

interface ReturnValue {
  sessions: OtherSession[];
  error: Error | null;
}
/**
 * Gets other sessions of a chapter.
 * @param {string} chapterId the chapter id
 
 * @return {ReturnValue} boolean or error.
 */
export const getOtherSessionsByChapterId = async (
  chapterId: string
): Promise<ReturnValue> => {
  try {
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
      },
      select: {
        otherSessions: true,
      },
    });

    let otherSessions = chapter
      ? chapter.otherSessions.map((session) =>
          JSON.parse(JSON.stringify(session))
        )
      : [];

    otherSessions =
      otherSessions &&
      otherSessions.map((otherSession) => fetchSession(otherSession));

    const sessions = (await Promise.allSettled(otherSessions)).filter(
      (promise) => promise.status === "fulfilled"
    ).map(promise => promise.value);

    return { sessions, error: null };
  } catch (error: any) {
    console.log("[OTHER_SESSIONS_BY_CHAPTERID]", error);
    return { sessions: [], error };
  }
};

async function fetchSession(otherSession: {
  sessionId: string;
  sessionPosition: number;
}) {
  let session = await db.session.findUnique({
    where: {
      id: otherSession.sessionId,
    },
  });

  if (session) {
    session.position = otherSession.sessionPosition;
  }

  return { ...session, otherSession: true };
}
