
import CourseMenuBar from '@/app/(course)/courses/components/course-menu-bar'
import { CourseChaptersUserProgressType } from '../../../../../../../../actions/getCourseChaptersUserProgress'
import { getUserCookie } from '@/lib/get-user-cookie'
import { redirect } from 'next/navigation'
import { SidebarChapter } from './course-sidebar'

type CourseMobileSidebarProps = {
    course: CourseChaptersUserProgressType,
    progressPercentage: number, parentId: string, 
    chapters: SidebarChapter[]
}

 async function CourseMobileSidebar({
    course, progressPercentage, parentId,chapters
}: CourseMobileSidebarProps) {
    const userId = await getUserCookie();
    if (!userId) return redirect("/");

    return (
       <CourseMenuBar
       progressPercentage={progressPercentage}
       chapters={chapters}
       course={course}
       parentId={parentId}
       userId={userId}
       />
    )
}

export default CourseMobileSidebar