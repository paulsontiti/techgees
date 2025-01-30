
import { NextResponse } from "next/server";
import { getCourseWithProgressChapters } from "../../../../../../actions/getCourseWithProgressChapters";
import { getUserCookie } from "@/lib/get-user-cookie";

export async function POST(
  req: Request,
  {
    params: { categoryId,title },
  }: {
    params: { categoryId: string,title:string };
  }
) {
  try {
    const userId = await getUserCookie();
    if(!userId)  return new NextResponse("Unauthorised", {
        status: 401,
      });
        const courses = await getCourseWithProgressChapters({
            userId,categoryId,title
        })
 

    return NextResponse.json(courses);
  } catch (err) {
    console.log("[GET_SEARCH_COURSES_TITLE]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
