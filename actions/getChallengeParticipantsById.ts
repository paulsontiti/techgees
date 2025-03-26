import { ChallengeParticipant } from "@/app/(root)/challenges/[challengeId]/_components/columns";
import { db } from "@/lib/db";
interface ReturnValue {
    participants: ChallengeParticipant[],
    error: Error | null
}
/**
 * Gets participants of a challenge by challenge id.
 * 
* @param {string} challengeId - The id of the challenge.
 * @return {ReturnValue} participants or error.
 */
export const getChallengeParticipantById = async (challengeId: string):
    Promise<ReturnValue> => {
    try {
        const challengeParticipants = await db.challengeParticipants.findMany({
            where: {
                challengeId
            }, include: {
                challenge: true
            }
        });

        const participants: ChallengeParticipant[] = []

        for (let participant of challengeParticipants) {
            const userId = participant.userId;
            const courseId = participant.challenge.courseId


            const username = await getUserName(userId);
            const points_accumulated = await getPointsAccumulated(courseId ?? "", userId);
            const sessions_completed = await getSessionsCompleted(courseId ?? "", userId);
            const chapters_completed = await getChaptersCompleted(courseId ?? "", userId);
            const completed_course = await courseCompleted(courseId ?? "", userId);

            participants.push({
                username,
                points_accumulated,
                sessions_completed,
                chapters_completed,
                completed_course
            })
        }

        return { participants, error: null }


    } catch (error: any) {
        console.log("[GET_ChallengeId]", error)
        return { participants: [], error }
    }
}

//functions to get participant's details
const getUserName = async (userId: string) => {
    const user = await db.dBUser.findUnique({
        where: {
            userId
        }
    })

    return user?.userName || user?.email || "No username"
}

const getPointsAccumulated = async (courseId: string, userId: string) => {
    try {
        const course = await db.course.findUnique({
            where: {
                id: courseId
            }, include: {
                chapters: {
                    include: {
                        sessions: true
                    }
                }
            }
        })
        const sessions = course?.chapters.map(chapter => chapter.sessions).flat();
        const sessionIds = sessions?.map(session => session.id)


        const testScores = await db.sessionTestScore.findMany({
            where: {
                userId,
                sessionId: { in: sessionIds }
            }
        })

        const scores = testScores.map(test => test.score);
        const points = scores.reduce((a, acc) => a + acc, 0)

        return points;
    } catch (err) {
        console.log("[GET_PARTICIPANT_POINTS]", err)
        return 0;
    }
}

const getSessionsCompleted = async (courseId: string, userId: string) => {
    try {
        const course = await db.course.findUnique({
            where: {
                id: courseId
            }, include: {
                chapters: {
                    include: {
                        sessions: true
                    }
                }
            }
        })
        const sessions = course?.chapters.map(chapter => chapter.sessions).flat();
        const sessionIds = sessions?.map(session => session.id)


        const sessionsCompleted = await db.sessionTestScore.count({
            where: {
                userId,
                sessionId: { in: sessionIds }
            }
        })

        return sessionsCompleted;
    } catch (err) {
        console.log("[GET_SESSIONS_COMPLETED]", err)
        return 0;
    }
}

const getChaptersCompleted = async (courseId: string, userId: string) => {
    try {
        const course = await db.course.findUnique({
            where: {
                id: courseId
            }, include: {
                chapters: {
                    include: {
                        sessions: true
                    }
                }
            }
        })
        const chapterIds = course?.chapters.map(chapter => chapter.id);


        const chaptersCompleted = await db.chapterTestScore.count({
            where: {
                userId,
                chapterId: { in: chapterIds }
            }
        })

        return chaptersCompleted;
    } catch (err) {
        console.log("[GET_CHAPTERS_COMPLETED]", err)
        return 0;
    }
}

const courseCompleted = async (courseId: string, userId: string) => {
    try {
        const courseCompleted = await db.userProgress.findFirst({
            where: {
                userId, courseId
            }
        })

        return courseCompleted ? courseCompleted.isCompleted : false;
    } catch (err) {
        console.log("[COURSE_COMPLETED]", err)
        return false;
    }
}