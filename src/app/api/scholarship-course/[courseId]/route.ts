import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";
import { isOnScholarship } from "../../../../../actions/isOnScholarship";

export async function GET(
  req: Request,
  { params: { courseId } }: { params: { courseId: string } }
) {
  try {
    const userId = await getUserCookie();
    if (!userId) return new NextResponse("Unauthoried", { status: 401 });

    const { onScholarship } = await isOnScholarship(courseId);

    return NextResponse.json(onScholarship ? true : false);
  } catch (err) {
    console.log("[ON_SCHOLARSHIP]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
