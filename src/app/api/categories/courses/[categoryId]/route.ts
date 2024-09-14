import { CategorytabItemCourseType } from "@/app/(root)/_components/category-tab-item";
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { getCourseCommentsCount } from "../../../../../../actions/getCourseCommentsCount";
import { getCourseLikesCount } from "../../../../../../actions/getCourseLikesCount";
import { getCourseDisLikesCount } from "../../../../../../actions/getCourseDisLikesCount";
import { getCourseRating } from "../../../../../../actions/getCourseRating";
import { getCourseNumberOfRatings } from "../../../../../../actions/getCourseNumberOfRatings";
import { getCourseStudentsCount } from "../../../../../../actions/getCourseStudentsCount";
import { getPrerequisiteCourses } from "../../../../../../actions/getPreRequisiteCourses";
import { getChildrenCourses } from "../../../../../../actions/getChildrenCourses";


export async function GET(
    req: Request,
    { params: { categoryId } }: { params: { categoryId: string } }
) {

    try {
let returnValue:CategorytabItemCourseType[] = []


        const courseCategories = await db.courseCategory.findMany({
            where: {
                categoryId,
            },
        });

        const courseIds = courseCategories.map((cat) => cat.courseId);

        const courses = await db.course.findMany({
            where: {
                id: {
                    in: courseIds
                },
            },include:{
                chapters:true,
            },
        })

       for(let course of courses){
        const {numberOfComments} = await getCourseCommentsCount(course.id)
        const {numberOfLikes} = await getCourseLikesCount(course.id)
        const {numberOfDisLikes} = await getCourseDisLikesCount(course.id)
        const {averageRating} = await getCourseRating(course.id)
        const {numberOfRatings} = await getCourseNumberOfRatings(course.id)
        const {numberOfStudents} = await getCourseStudentsCount(course.id)
        const {childrenCourses} = await getChildrenCourses(course.id)

        const courseToReturn:CategorytabItemCourseType =  {
            course,
            likes:numberOfLikes,
            disLikes:numberOfDisLikes,
            numberOfComments,
            numberOfRatings,
            numberOfStudents,
            rating:averageRating,
            childrenCourses

        }

        returnValue.push(courseToReturn)
       }
       
        return NextResponse.json(returnValue)

    } catch (err) {
        console.log("[COURSES_BY_CATEGORYID]", err)
        return new NextResponse("Internal error", { status: 500 })
    }
}


