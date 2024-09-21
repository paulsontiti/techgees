import { db } from "@/lib/db";
import { getCourseWithCourseChildrenWithChaptersAndSessions } from "./getCourseWithCourseChildrenWithChapters";

interface ReturnValue {
    progressPercentage: number | null,
    error: Error | null
}

export const getCourseProgress = async (userId: string, courseId: string):
    Promise<ReturnValue> => {
    try {
        let publishedChapters: { id: string }[] = []

        const { courseChildrenWithChaptersAndSessions, error } = await getCourseWithCourseChildrenWithChaptersAndSessions(courseId)
        if (error) throw new Error(error.message)

        if (courseChildrenWithChaptersAndSessions.length > 0) {
            for (let childCourse of courseChildrenWithChaptersAndSessions) {
                for (let chapter of childCourse.chapters) {
                    publishedChapters.push(
                        { id: chapter.id })
                }
            }

        } else {
            publishedChapters = await db.chapter.findMany({
                where: {
                    courseId,
                    //isPublished : true
                },
                select: {
                    id: true
                }
            })
        }

        const publishedChapterIds = publishedChapters.map(chapter => chapter.id)

        const validCompletedChapters = await db.userProgress.count({
            where: {
                userId,
                chapterId: {
                    in: publishedChapterIds
                },
                isCompleted: true
            }
        })

        const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100

        return { progressPercentage, error: null }
    } catch (error: any) {
        console.log("[GET_COURSE_PROGRESS]", error)
        return { progressPercentage: null, error }
    }
}