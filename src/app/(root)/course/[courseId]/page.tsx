import CourseWelcomeMessage from "./_components/course-welcome-message";
import CourseDetails from "./_components/course-details";


export type CategoryCourseType = {
  category: { id: string; name: string };
  courses: { id: string; title: string }[];
};

 function CourseIdPage({
  params: { courseId },
}: {
  params: { courseId: string };
}) {

  return <>
    <CourseWelcomeMessage
      courseId={courseId}

    />
<CourseDetails courseId={courseId}/>
    
  </>
}

export default CourseIdPage;


