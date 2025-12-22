import { db } from "@/lib/db";
import {
  Assignment,
  Attachment,
  Question,
  Session,
  UserProgress,
} from "@prisma/client";

export type SessionType =
  | (Session & {
      assignments: Assignment[];
      attachments: Attachment[];
      questions: Question[];
    })
  | null;

interface ReturnValue {
  session: SessionType;
  error: Error | null;
}

export const getSessionWithAttachmentQuestionsAssignments = async (
  sessionId: string,
  chapterId: string,
): Promise<ReturnValue> => {
  try {
    const session = await db.session.findUnique({
      where: {
        id: sessionId,
        chapterId,
      },
      include: {
        questions: true,
        assignments: true,
        attachments: {
          where: {
            sessionId,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return { session, error: null };
  } catch (error: any) {
    return { session: null, error };
  }
};
