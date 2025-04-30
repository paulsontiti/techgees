import { ChallengeParticipant } from "@/app/(root)/challenges/[challengeId]/_components/columns";
import { db } from "@/lib/db";
interface ReturnValue {
  participants: ChallengeParticipant[];
  error: Error | null;
}
/**
 * Gets participants of a challenge by challenge id.
 *
 * @param {string} challengeId - The id of the challenge.
 * @return {ReturnValue} participants or error.
 */
export const getChallengeParticipantById = async (
  challengeId: string
): Promise<ReturnValue> => {
  try {
    //get challenge participants
    const challengeParticipants = await db.challengeParticipants.findMany({
      where: {
        challengeId,
      },
      include: {
        challenge: true,
      },
    });

    const participants: ChallengeParticipant[] = [];

    //get challenge
    const challenge = await db.challenge.findUnique({
      where: {
        id: challengeId,
      },
    });

    for (let participant of challengeParticipants) {
      const userId = participant.userId;

      const username = await getUserName(userId);

      const sessions_completed = await getSessionsCompletedInAPeriod(
        userId,
        challenge?.startDate!
      );

      const assignments_completed = await getAssignmentsCompletedInAPeriod(
        userId,
        challenge?.startDate!
      );

      const referees = await getUserReferees(userId,challenge?.startDate!);

      const paymentsFromReferees = await getUserRefereesPaymentWithinAPeriod(
        userId,
        challenge!.startDate!
      );

      //points accumulated
      const points_accumulated_from_referer = paymentsFromReferees
        ? (paymentsFromReferees / 1000) * 10
        : 0;
      const points_accumulated_from_sessions = sessions_completed * 10;
      const points_accumulated_from_assignment = assignments_completed * 10;

      participants.push({
        username,
        sessions_completed,
        assignments_completed,
        points_accumulated:
          points_accumulated_from_assignment +
          points_accumulated_from_referer +
          points_accumulated_from_sessions,
        referees: referees.length,
        points_accumulated_from_referer,
      });
    }

    return { participants, error: null };
  } catch (error: any) {
    console.log("[GET_CHALLENGE_PARTICIPANTS_BY_ID]", error);
    return { participants: [], error };
  }
};

//functions to get participant's details
const getUserName = async (userId: string) => {
  const user = await db.dBUser.findUnique({
    where: {
      userId,
    },
  });

  return user?.userName || user?.email || "No username";
};

const getPointsAccumulated = async (courseId: string, userId: string) => {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          include: {
            sessions: true,
          },
        },
      },
    });
    const sessions = course?.chapters.map((chapter) => chapter.sessions).flat();
    const sessionIds = sessions?.map((session) => session.id);

    const testScores = await db.sessionTestScore.findMany({
      where: {
        userId,
        sessionId: { in: sessionIds },
      },
    });

    const scores = testScores.map((test) => test.score);
    const points = scores.reduce((a, acc) => a + acc, 0);

    return points;
  } catch (err) {
    console.log("[GET_PARTICIPANT_POINTS]", err);
    return 0;
  }
};

const getSessionsCompleted = async (courseId: string, userId: string) => {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          include: {
            sessions: true,
          },
        },
      },
    });
    const sessions = course?.chapters.map((chapter) => chapter.sessions).flat();
    const sessionIds = sessions?.map((session) => session.id);

    const sessionsCompleted = await db.sessionTestScore.count({
      where: {
        userId,
        sessionId: { in: sessionIds },
      },
    });

    return sessionsCompleted;
  } catch (err) {
    console.log("[GET_SESSIONS_COMPLETED]", err);
    return 0;
  }
};

const getSessionsCompletedInAPeriod = async (
  userId: string,
  startDate: Date
) => {
  try {
    const sessionsCompleted = await db.userProgress.count({
      where: {
        userId,
        createdAt: {
          gte: startDate,
        },
      },
    });

    return sessionsCompleted;
  } catch (err) {
    console.log("[GET_SESSIONS_COMPLETED]", err);
    return 0;
  }
};

const getAssignmentsCompletedInAPeriod = async (
  userId: string,
  startDate: Date
) => {
  try {
    const sessionsCompleted = await db.assignmentAnswer.count({
      where: {
        userId,
        passed: true,
        createdAt: {
          gte: startDate,
        },
      },
    });

    return sessionsCompleted;
  } catch (err) {
    console.log("[GET_SESSIONS_COMPLETED]", err);
    return 0;
  }
};

const getChaptersCompleted = async (courseId: string, userId: string) => {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          include: {
            sessions: true,
          },
        },
      },
    });
    const chapterIds = course?.chapters.map((chapter) => chapter.id);

    const chaptersCompleted = await db.chapterTestScore.count({
      where: {
        userId,
        chapterId: { in: chapterIds },
      },
    });

    return chaptersCompleted;
  } catch (err) {
    console.log("[GET_CHAPTERS_COMPLETED]", err);
    return 0;
  }
};

const courseCompleted = async (courseId: string, userId: string) => {
  try {
    const courseCompleted = await db.userProgress.findFirst({
      where: {
        userId,
        courseId,
      },
    });

    return courseCompleted ? courseCompleted.isCompleted : false;
  } catch (err) {
    console.log("[COURSE_COMPLETED]", err);
    return false;
  }
};

const getUserReferees = async (userId: string,startDate:Date) => {
  const user = await db.dBUser.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });
  if (!user) return [];
  const referees = await db.dBUser.findMany({
    where: {
      refererId: user.id,
      createdAt: { gte: new Date(startDate) },
    },
    select: {
      userId: true,
    },
  });

  return referees.map((user) => user.userId);
};

const getUserRefereesPaymentWithinAPeriod = async (
  userId: string,
  startDate: Date
) => {
  const referees = await getUserReferees(userId,startDate);
  const payments = await db.paystackPayment.aggregate({
    where: {
      userId: {
        in: referees,
      },
      payment_status: "success",
      createdAt: { gte: new Date(startDate) },
    },
    _sum: {
      amount: true,
    },
  });

  return payments._sum.amount;
};
