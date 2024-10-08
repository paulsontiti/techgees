
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request,
    {
        params:{categoryId}
    }:{
        params:{categoryId:string}
    }
) {
  try {
 
    const courseCategories = await db.courseCategory.findMany({
        where:{
            categoryId
        },select:{
            courseId:true
        }
    })

    const courseIds = courseCategories.map(cC=>cC.courseId)

    const courses = await db.course.findMany({
        where:{
            id:{
                in:courseIds
            }
        },include:{
            chapters:true
        }
    })

    return NextResponse.json(courses);
  } catch (err) {
    console.log("[CATEGORY_COURSES]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
