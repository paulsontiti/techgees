import IconBadge from "@/components/icon-badge";

import { auth } from "@clerk/nextjs/server";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import ChaptersForm from "./_components/chapters-form";
import Banner from "@/components/banner";
import CourseActions from "./_components/course-actions";
import { getCourseWithCourseCategoriesAndChapters } from "../../../../../../actions/getCourseWithCourseCategoriesAndChapters";

import { getCategories } from "../../../../../../actions/getCategories";
import { getCourseCategoriesByCourseId } from "../../../../../../actions/getCourseCategoriesByCourseId";
import PreRequisiteCoursesForm from "./_components/pre-requisite-courses-form";
import { getCourses } from "../../../../../../actions/getCourses";

import { getPrerequisiteCourses } from "../../../../../../actions/getPreRequisiteCourses";

import RecommendedCoursesForm from "./_components/recommended-courses-form";
import { getCourseRecommendedCourses } from "../../../../../../actions/getCourseRecommendedCourses";
import SubTitleForm from "./_components/subtitle-form";
import CourseBenefitsForm from "./_components/course-benefits-form";
import AccessForm from "./_components/access-form";
import OverviewVideoForm from "./_components/overview-video-form";
import CourseChildForm from "./_components/course-child-form";
import { getCourseWithChildren } from "../../../../../../actions/getCourseWithCourseChildren";



async function CourseIdPage({
  params: { courseId },
}: {
  params: { courseId: string };
}) {
  const { userId } = auth();
  if (!userId) return redirect("/dashboard");

  const { course, error } = await getCourseWithCourseCategoriesAndChapters(userId, courseId)

  if (error) return <div>{error.message}</div>

  const { courseChildren, error:childError } = await getCourseWithChildren(courseId)

  if (childError) return <div>{childError.message}</div>

  if (!course) return redirect("/dashboard");

  const { categories, error: categoriesError } = await getCategories()
  if (categoriesError) return <div>{categoriesError.message}</div>

  const { categories: courseCategories, error: cCError } = await getCourseCategoriesByCourseId(courseId)



  const { preRequisiteCourses, error: preError } = await getPrerequisiteCourses(courseId)
  if (preError) return <div>{preError.message}</div>



  const { recommendedCourses, error: recomError } = await getCourseRecommendedCourses(courseId)
  if (recomError) return <div>{recomError.message}</div>

  const { courses, error: coursesError } = await getCourses()
  if (coursesError) return <div>{coursesError.message}</div>


  const requiredFields = [
    course.title,
    course.subTitle,
    course.description,
    course.imageUrl,
    course.price !== null,
    //course.overviewVideoUrl,
    course.courseBenefits.length > 0,
    course.courseCategories.length > 0,
    //course.chapters.some((chapter: Chapter) => chapter.isPublished)
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean)






  return (
    <>
      {cCError && <Banner
        variant={"warning"}
        label={cCError.message} />}
      {!course.isPublished && <Banner
        variant={"warning"}
        label="This course is unpublished. It will not be visible to your students"
      />}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <CourseActions courseId={courseId} isPublished={course.isPublished} disabled={!isComplete} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} size="sm" />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm course={course} />
            <SubTitleForm course={course} />
            <DescriptionForm course={course} />
            <ImageForm course={course} />
            <OverviewVideoForm course={course}/>
            <AccessForm course={course}/>
          </div>
          <div className="space-y-6">
            <CategoryForm
              categories={categories}
              courseCategories={courseCategories ?? []}
              courseId={courseId}
            />
                  <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course children</h2>
              </div>
              <CourseChildForm courseChildren={courseChildren} courses={courses} courseId={course.id}/>
            </div>
            <PreRequisiteCoursesForm
              courseId={courseId}
              courses={courses}
              preRequisiteCourses={preRequisiteCourses} />
          
            <RecommendedCoursesForm
              courseId={courseId}
              courses={courses}
              recommendedCourses={recommendedCourses} />
              <CourseBenefitsForm courseId={courseId} benefits={course.courseBenefits}/>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChaptersForm course={course} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm course={course} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseIdPage;
