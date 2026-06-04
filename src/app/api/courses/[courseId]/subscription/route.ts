import { getUserCookie } from "@/lib/get-user-cookie";
import { NextResponse } from "next/server";
import { getCourseSubscription } from "../../../../../../actions/getCourseSubscription";

export async function GET(
  req: Request,
  { params: { courseId } }: { params: { courseId: string } },
) {
  try {
    const userId = (await getUserCookie()) as string;
    const subscription = await getCourseSubscription(courseId, userId);

    return NextResponse.json(subscription);
  } catch (err) {
    console.log("[SUBSCRIPTION]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
