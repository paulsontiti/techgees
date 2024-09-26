import { db } from "@/lib/db"
import { Assignment, Attachment, Question, Session, UserProgress } from "@prisma/client"



interface ReturnValue {
    session: Session & { questions: Question[] } | null,
    attachments: Attachment[],
    nextSession: Session | null,
    previousSession: Session | null,
    userProgress: UserProgress | null,
    assignments: Assignment[]

    error: Error | null
}
export const getSessionAttachmentsNextSessionuserprogress = async ({
    userId, chapterId, sessionId
}: {
    userId: string,
    chapterId: string,
    sessionId: string
}): Promise<ReturnValue> => {

    try {


        const attachments = await db.attachment.findMany({
            where: {
                sessionId
            }
        })

        const assignments = await db.assignment.findMany({
            where: {
                sessionId
            }
        })

        const session = await db.session.findUnique({
            where: {
                id: sessionId,
                isPublished: true,
            }, include: {
                questions: true
            }
        })
        const nextSession = await db.session.findFirst({
            where: {
                chapterId,
                isPublished: true,
                position: {
                    gt: session?.position
                }
            },
            orderBy: {
                position: "asc"
            }
        })

        //get the previous session position
        const prvPosition = session ? session.position - 1 : 0;

        const previousSession = await db.session.findFirst({
            where: {
                chapterId,
                isPublished: true,
                position: prvPosition
            },
            orderBy: {
                position: "asc"
            }
        })

        const userProgress = await db.userProgress.findFirst({
            where: {
                userId, sessionId
            }
        })
        return {
            nextSession, userProgress, assignments, previousSession,
            attachments, session, error: null
        }

    } catch (error: any) {

        console.log("[getSession]", error)
        return {
            nextSession: null, userProgress: null, assignments: [], previousSession: null,
            attachments: [], session: null, error
        }
    }

}