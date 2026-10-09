import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params: { title },
  }: {
    params: { title: string };
  },
) {
  try {
    const course = await db.course.findFirst({
      where: {
        title,
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(course?.id || "");
  } catch (err) {
    console.log("[GET_COURSE_TITLE]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
