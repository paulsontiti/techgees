
import CourseMenuBar from '@/app/(course)/courses/components/course-menu-bar'

type CourseMobileSidebarProps = {
    childId: string,
    parentId: string, 
}

  function CourseMobileSidebar({
    childId, parentId
}: CourseMobileSidebarProps) {
    

    return (
       <CourseMenuBar
       //progressPercentage={progressPercentage}
       //chapters={chapters}
       childId={childId}
       parentId={parentId}
       //userId={userId}
       />
    )
}

export default CourseMobileSidebar