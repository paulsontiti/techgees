import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params: { courseId } }: { params: { courseId: string } }
) {
  try {
    const userId = await getUserCookie();
    if (!userId) return new NextResponse("Unauthorised", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId

      }
    })
    if (!courseOwner) return new NextResponse("Unauthorised", { status: 401 });

    const { reorderedCourseChildren } = await req.json()

    for (let childCourse of reorderedCourseChildren) {
      await db.courseChild.update({
        where: {
          childCourseId_parentCourseId: {
            childCourseId: childCourse.courseChildId,
            parentCourseId: courseId
          }
        },
        data: { position: childCourse.position }
      })
    }
    return NextResponse.json("")

  } catch (err) {
    console.log("[COURSE_CHILDREN_REORDER]", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
