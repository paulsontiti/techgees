import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params: { courseId, chapterId, sessionId },
  }: { params: { courseId: string; chapterId: string; sessionId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized user", { status: 401 });

    const { isPublished, ...values } = await req.json();

    const course = await db.course.findUnique({
      where: {
   
          id: courseId,
          userId,
        
      },
    });
    if(!course)  return new NextResponse("Unauthorized,you are not the creator of this course",{status:401})

    await db.session.update({
      where: {
        id: sessionId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json("");
  } catch (err) {
    console.log("[SESSIONID]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
    req:Request,
    {params:{courseId,chapterId,sessionId}}:{params:{courseId:string,chapterId:string,sessionId:string}}
){

    try{
        
const {userId} = auth()
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

        await db.session.delete({
            where:{
                id:sessionId
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
