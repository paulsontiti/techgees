import IconBadge from "@/components/icon-badge";

import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import PriceForm from "./_components/price-form";
import Banner from "@/components/banner";
import SubTitleForm from "./_components/subtitle-form";
import OverviewVideoForm from "./_components/overview-video-form";
import { getUserCookie } from "@/lib/get-user-cookie";
import { getScholarshipById } from "../../../../../../actions/getScholarshipById";
import ErrorPage from "@/components/error";
import ScholarshipActions from "./_components/scholarship-actions";
import TermsForm from "./_components/terms-form";
import CourseForm from "./_components/course-form";
import { getCourses } from "../../../../../../actions/getCourses";
import { getScholarshipCourse } from "../../../../../../actions/getScholarshipCourse";



async function ScholarshipIdPage({
  params: { scholarshipId },
}: {
  params: { scholarshipId: string };
}) {
  const userId = await getUserCookie();
  if (!userId) return redirect("/dashboard");

  const {scholarship,error} = await getScholarshipById(scholarshipId);

  if(error) return <ErrorPage name={error.name}/>
    if(!scholarship) return redirect("/teacher/scholarships")

      const {courses,error:coursesError} = await getCourses();
        if(coursesError) return <ErrorPage name={coursesError.name}/>

        const {course,error:courseError} = await getScholarshipCourse(scholarshipId);
        if(courseError) return <ErrorPage name={courseError.name}/>

  const requiredFields = [
    scholarship.title,
    scholarship.subTitle,
    scholarship.description,
    scholarship.imageUrl,
    scholarship.price !== null,
    scholarship.terms,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean)






  return (
    <>
    
      {!scholarship.isPublished && <Banner
        variant={"warning"}
        label="This scholarship is unpublished. It will not be visible to your students"
      />}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <ScholarshipActions scholarshipId={scholarshipId} isPublished={scholarship.isPublished} disabled={!isComplete} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} size="sm" />
              <h2 className="text-xl">Customize your scholarship</h2>
            </div>
            <TitleForm scholarship={scholarship} />
            <SubTitleForm scholarship={scholarship} />
            <DescriptionForm scholarship={scholarship} />
           
          </div>
         <div className="space-y-6">
          <CourseForm courseTitle={course?.title || ""} courses={courses} scholarshipId={scholarshipId}/>
           <ImageForm scholarship={scholarship} />
            <OverviewVideoForm scholarship={scholarship} />
         </div>
          <div className="space-y-6">
        
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your scholarship</h2>
              </div>
              <PriceForm scholarship={scholarship} />
              <TermsForm scholarship={scholarship}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScholarshipIdPage;
