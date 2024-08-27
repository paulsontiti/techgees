import { db } from "@/lib/db";
import { Course } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params: { title },
  }: {
    params: { title: string };
  }
) {
  try {
    let courses:Course[] = []
    if(title){
         courses = await db.course.findMany({
            where: {
              title: {
                contains: title,
                mode:"insensitive"
              },
            },
          });
    }
 

    return NextResponse.json(courses);
  } catch (err) {
    console.log("[GET_SEARCH_COURSES_TITLE]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
