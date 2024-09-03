import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/lib/db";
import {
  Check,
  ChevronDown,
  MessageCircle,
  Star,
  StarHalf,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { getCourseCategoriesByCourseId } from "../../../../../actions/getCourseCategoriesByCourseId";
import Banner from "@/components/banner";
import { getCourse } from "../../../../../actions/getCourse";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export type CategoryCourseType = {
  category: { id: string; name: string };
  courses: { id: string; title: string }[];
};

async function CourseIdPage({
  params: { courseId },
}: {
  params: { courseId: string };
}) {
  const { courseCategories: categories, error } =
    await getCourseCategoriesByCourseId(courseId);

  const { course, error: courseError } = await getCourse(courseId);


  let chaptersLength = 0
  let sessionslength = 0
  if(course !== null && course.childrenCourses.length > 0){
    course.childrenCourses.map((child)=>{

      chaptersLength +=child.childCourse.chapters.length
    })
  }else{
    chaptersLength = course?.chapters.length ?? 0
   sessionslength = course?.chapters.length ?? 0
    const chapters = course?.chapters
    
    chapters?.map((chapter)=>{
      chapter.sessions.map((sess)=>{
        sessionslength++
      })
    })
  }

  const wywl = [
    "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
    "After the course you will be able to build ANY website you want.",
    "Work as a freelance web developer.",
    "Master backend development with Node",
    "Learn the latest technologies, including Javascript, React, Node and even Web3 development.",
    "Build fully-fledged websites and web apps for your startup or business.",
    "Master frontend development with React",
    "Learn professional developer best practices.",
  ];
  return (
    <div className="p-2">
      {error && <Banner variant="error" label={error.message} />}
      {courseError && <Banner variant="error" label={courseError.message} />}
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            {Array.isArray(categories) &&
              categories.length > 0 &&
              categories.map(async (cat) => {
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

                return (
                  <div key={cat.id}>
                    <BreadcrumbItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="text-xs flex">
                          <div className="text-sky-500"> {cat.name}</div>
                          {Array.isArray(courses) && courses.length > 0 && (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </DropdownMenuTrigger>
                        {Array.isArray(courses) && courses.length > 0 && (
                          <DropdownMenuContent align="start">
                            {courses.map((course) => {
                              return (
                                <DropdownMenuItem key={course.id}>
                                  <BreadcrumbLink href={`/course/${course.id}`}>
                                    {course.title}
                                  </BreadcrumbLink>
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuContent>
                        )}
                      </DropdownMenu>
                    </BreadcrumbItem>
                  </div>
                );
              })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="mt-4 text-xl font-bold">{course?.title}</h1>
      <h2 className="mt-2 text-lg font-semibold">Subtitle</h2>
      <div className="flex items-center gap-x-2 mt-4">
        <div className="flex items-center text-xs">
          4.5 <Star />
          <StarHalf />
        </div>
        <div className="flex items-center text-xs">500 students</div>
        <div className="flex items-center text-xs">
          300 <MessageCircle className="w-4 h-4" />
        </div>
        <div className="flex items-center text-xs">
          400 <ThumbsUp className="w-4 h-4" />
        </div>
        <div className="flex items-center text-xs">
          4.5 <ThumbsDown className="w-4 h-4" />
        </div>
      </div>
      <Card className="mt-4">
        <CardHeader className="text-xl font-bold">
          Benefits of taking this course
        </CardHeader>
        <CardContent className="flex md:flex-row flex-col">
          {wywl.map((item) => {
            return (
              <div key={item} className="flex items-start my-2 gap-2">
                <Check className="max-w-4 max-h-4 min-w-4 min-h-4"/>
                <div className="text-xs">{item}</div>
              </div>
            );
          })}
        </CardContent>
      </Card>
      <div className="mt-8">
          <h1 className="text-xl font-bold">Course content</h1>
          <div className="mt-8 flex items-center gap-x-2">
            <div className="flex items-center gap-x-1">
              {chaptersLength} chapters</div>
              <div className="flex items-center gap-x-1">
                {sessionslength} sessions</div>
          
          </div>
      </div>
    </div>
  );
}

export default CourseIdPage;
