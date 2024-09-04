import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params: { courseId } }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const selectedCategoryIds: string[] = await req.json();

    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }

    await db.courseCategory.deleteMany({
      where: {
        courseId,
      },
    });

    if (!!selectedCategoryIds.length) {
      for (let categoryId of selectedCategoryIds) {
        await db.courseCategory.create({
          data: {
            courseId,
            categoryId,
          },
        });
      }
    }

    return NextResponse.json("");
  } catch (err) {
    console.log("[COURSE_CATEGORY]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}

export async function GET(
  req: Request,
  { params: { courseId } }: { params: { courseId: string } }
) {
  try {
    
    const courseCategories = await db.courseCategory.findMany({
      where: {
        courseId,
      },
    });

    const categoryIds = courseCategories.map((cat) => cat.categoryId);

    const categories = await db.category.findMany({
      where:{
        id:{
          in:categoryIds
        }
      }
    })
   const categoryCourses =  categories.map(async(cat)=>{
        const courseCategories = await db.courseCategory.findMany({
            where: {
              categoryId: cat.id,
            },
            include: {
              course: true,
            },
          });
    
          const courses = courseCategories.map((c) => {
            return {
              title: c.course.title,
              id: c.course.id,
            };
          });
        return {
            category:{id:cat.id,name:cat.name},
            courses:courses
        }
    })
    console.log(categoryCourses)
    
    return NextResponse.json(categories);
  } catch (err) {
    console.log("[COURSE_CATEGORY_GET]", err);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
