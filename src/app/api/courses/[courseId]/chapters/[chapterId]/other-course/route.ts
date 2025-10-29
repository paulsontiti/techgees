import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getUserCookie } from "@/lib/get-user-cookie";
import { isCourseOwner } from "../../../../../../../../actions/isCourseOwner";

export async function PATCH(
  req: Request,
  {
    params: { courseId, chapterId },
  }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const userId = await getUserCookie();
  
    if (!userId) return new NextResponse("Unauthorized user", { status: 401 });

    const values = await req.json();



    const {isCourseCreator,error} = await isCourseOwner(courseId)
    if (error) return new NextResponse("An error occured", { status: 505 });
    if (!isCourseCreator) return new NextResponse("Unauthorised", { status: 401 });


    const chapter = await db.chapter.findUnique({
        where:{
            id:chapterId
        }
    })

    let  otherCourses : any[] = chapter?.otherCourses ?? []
    otherCourses = otherCourses.filter(course => course.courseId !== values.courseId)
    otherCourses.push(values)

    await db.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        otherCourses
      },
    });

        const course = await db.course.findUnique({
        where:{
            id:values.courseId
        }
    })

    let  otherChapters : any[] = course?.otherChapters ?? []
    otherChapters = otherChapters.filter(chapter => chapter.chapterId !== chapterId)
    otherChapters.push({chapterId,chapterPosition:values.chapterPosition})

    await db.course.update({
      where: {
        id: values.courseId,
      },
      data: {
        otherChapters
      },
    });


    return NextResponse.json("");
  } catch (err) {
    console.log("[CHAPTER-OTHER-COURSE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// export async function DELETE(
//     req:Request,
//     {params:{courseId,chapterId,sessionId}}:{params:{courseId:string,chapterId:string,sessionId:string}}
// ){

//     try{
        
// const userId = await getUserCookie();
// if(!userId)  return new NextResponse("Unauthoried",{status:401})


//     const course = await db.course.findUnique({
//         where:{
//                 id:courseId,
//                 userId
            
//         }
//     })
//     if(!course)  return new NextResponse("Unauthoried",{status:401})

//     const chapter = await db.chapter.findUnique({
//         where:{
//             id_courseId:{
//                 id:chapterId,
//                 courseId
//             }
//         }
//     })

//     if(!chapter)  return new NextResponse("Unauthoried",{status:401})

//         await db.session.delete({
//             where:{
//                 id:sessionId
//             }
//         })

//         const publishedSessionsInChapter = await db.session.findMany({
//             where:{
//                 chapterId,
//                 isPublished:true
//             }
//         })

//         if(!publishedSessionsInChapter.length){
//             await db.chapter.update({
//                 where:{
//                     id:chapterId
//                 },
//                 data:{
//                     isPublished:false
//                 }
//             })
//         }

//         return NextResponse.json("")
    
//     }catch(err){
//         console.log("[COURSE_CHAPTER_ID_DELETE]",err)
//         return new NextResponse("Internal error",{status:500})
//     }
// }
