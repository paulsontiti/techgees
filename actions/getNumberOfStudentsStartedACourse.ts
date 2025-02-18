import { db } from "@/lib/db";
import { isCourseCombo } from "./isCourseCombo";

interface ReturnValue {
    numberOfStudents: number | null,
    error: Error | null
}
/**
 * Gets number of students that has completed the first session of a course.
 * @param {string} courseId course id
 * @return {ReturnValue} number or error.
 */
export const getNumberOfStudentsStartedACourse = async (courseId: string):
    Promise<ReturnValue> => {
    try {
        let firstChapter;
        //check if it's combo
        const {isCombo} = await isCourseCombo(courseId);
        if (isCombo) {
      
            const courseWithChildren = await db.courseChild.findMany({
                where: {
                    parentCourseId: courseId,
                },
            });

            //get the first chapter of the first child course
            firstChapter = await db.course.findUnique({
                where: {
                    id: courseWithChildren[0].childCourseId
                }, select: {
                    chapters: {
                        where: {
                            OR: [
                                { position: 0 }, { position: 1 }
                            ],

                        }
                    }
                }
            })
        } else {
            //get the chapters of the course
            firstChapter = await db.course.findUnique({
                where: {
                    id: courseId
                }, select: {
                    chapters: {
                        where: {
                            OR: [
                                { position: 0 }, { position: 1 }
                            ],

                        }
                    }
                }
            })
        }


        const chapterId = firstChapter?.chapters[0]?.id || "";

        //get the first session of the chapter
        const firstSession = await db.chapter.findUnique({
            where: {
                id: chapterId
            }, select: {
                sessions: {
                    where: {
                        OR: [
                            { position: 0 }, { position: 1 }
                        ]
                    }
                }
            }
        })

        const sessionId = firstSession?.sessions[0].id;

        const numberOfStudents = await db.userProgress.count({
            where: {
                sessionId
            }
        })

        return { numberOfStudents, error: null }
    } catch (error: any) {
        console.log("[GET_NUMBER_OF_STUDENTS_STARTED_A_COURSE]", error)
        return { numberOfStudents: null, error }
    }
}