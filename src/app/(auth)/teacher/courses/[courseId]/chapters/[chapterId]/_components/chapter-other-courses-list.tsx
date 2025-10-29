"use client";
import OtherCourse from "./other-course";

interface ChapterOtherCoursesListProps {
  otherCourses: {courseId:string,chapterPosition:number}[];
  courseId:string,
  chapterId:string,
}

function ChapterOtherCoursesList({
  otherCourses,  
  courseId,chapterId
}: ChapterOtherCoursesListProps) {

  return (
    <div className="relative">

      {otherCourses.map((otherCourse) => {
        return (
          <div
            className="ml-auto pr-2 flex items-center justify-between bg-white p-2 my-2"
            key={otherCourse.courseId}
          >
            <OtherCourse
            courseId={courseId}
            chapterId={chapterId}
            otherCourse={otherCourse}
            />           
          </div>
        );
      })}
    </div>
  );
}

export default ChapterOtherCoursesList;
