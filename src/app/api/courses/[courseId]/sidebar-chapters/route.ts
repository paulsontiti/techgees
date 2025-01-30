import { NextResponse } from "next/server"
import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";


export async function GET(
    req: Request,
    { params: { courseId } }: { params: { courseId: string } }
) {

    try {
        const userId = await getUserCookie() || "";
       const course = await db.course.findUnique({
            where: {
              id: courseId,
            },
            include: {
              chapters: {
                //where: { isPublished: true },
                include: {
                  userProgresses: {
                    where: {
                      userId,
                    },
                  },
                  sessions: {
                    where: {
                      //isPublished:true
                    }, orderBy: {
                      position: "asc"
                    }
                  }
                }, orderBy: {
                  position: "asc"
                }
              },
            },
          });

      

        return NextResponse.json(course?.chapters);
    } catch (err) {
        console.log("[COURSE_SIDEBAR_CHAPTERS]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}


