import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { isCourseOwner } from "../../../../../../../../../actions/isCourseOwner";
import { getUserCookie } from "@/lib/get-user-cookie";

export async function PATCH(
  req: Request,
  {
    params: { courseId, projectId },
  }: { params: { courseId: string; projectId: string } }
) {
  try {
    const userId = await getUserCookie();
  
    if (!userId) return new NextResponse("Unauthorized user", { status: 401 });

    const { isPublished, ...values } = await req.json();

    const {isCourseCreator,error} = await isCourseOwner(courseId)
    if (error) return new NextResponse("An error occured", { status: 505 });
    if (!isCourseCreator) return new NextResponse("Unauthorised", { status: 401 });


    await db.chapterProject.update({
      where: {
        id: projectId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json("");
  } catch (err) {
    console.log("[CHAPTER_PROJECTID]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
    req:Request,
    {params:{courseId,chapterId,projectId}}:{params:{courseId:string,chapterId:string,projectId:string}}
){

    try{
        
const userId = await getUserCookie();
if(!userId)  return new NextResponse("Unauthoried",{status:401})


    const course = await db.course.findUnique({
        where:{
                id:courseId,
                userId
            
        }
    })
    if(!course)  return new NextResponse("Unauthoried",{status:401})

    const chapter = await db.chapter.findUnique({
        where:{
            id_courseId:{
                id:chapterId,
                courseId
            }
        }
    })

    if(!chapter)  return new NextResponse("Unauthoried",{status:401})

        await db.chapterProject.delete({
            where:{
                id:projectId
            }
        })

        const publishedSessionsInChapter = await db.session.findMany({
            where:{
                chapterId,
                isPublished:true
            }
        })

        if(!publishedSessionsInChapter.length){
            await db.chapter.update({
                where:{
                    id:chapterId
                },
                data:{
                    isPublished:false
                }
            })
        }

        return NextResponse.json("")
    
    }catch(err){
        console.log("[COURSE_CHAPTER_ID_DELETE]",err)
        return new NextResponse("Internal error",{status:500})
    }
}
