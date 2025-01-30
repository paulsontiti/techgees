import { NextResponse } from "next/server"
import { getCourseChaptersWithSessions } from "../../../../../../actions/getCourseChaptersWithSessions";
import { CourseChaptersAndSessionsDetailsType } from "@/components/course/course-chapters-sessions-details";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const { chapters, error } = await getCourseChaptersWithSessions(
            courseId
        );

        if (error) return new NextResponse("Internal error", { status: 500 });

        let chaptersLength = 0;
        let sessionsLength = 0;
        let duration = 0;

        chaptersLength = chapters.length ?? 0;

        chapters.map((chapter) => {
            chapter.sessions.map((session) => {
                sessionsLength++;
                duration += session.videoDuration ?? 0;
            });
        });


        const details: CourseChaptersAndSessionsDetailsType = {
            chaptersLength, sessionsLength, duration
        }

        return NextResponse.json(details);
    } catch (err) {
        console.log("[COURSE_AVERAGE_RATING]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


