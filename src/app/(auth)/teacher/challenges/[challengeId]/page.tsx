import IconBadge from "@/components/icon-badge";

import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import Banner from "@/components/banner";
import { getUserCookie } from "@/lib/get-user-cookie";
import { getChallengesByUserIdAndChallengeId } from "../../../../../../actions/getChallengeByUserIdAndChallengeId";
import TitleForm from "../_components/title-form";
import SubTitleForm from "../_components/subtitle-form";
import ImageForm from "../_components/image-form";
import OverviewVideoForm from "../_components/overview-video-form";
import ChallengeActions from "../_components/challenge-actions";
import DescriptionForm from "../_components/description-form";
import StartDateForm from "../_components/start-date-form";
import EndDateForm from "../_components/end-date-form";
import CourseForm from "../_components/course-form";
import { getCourses } from "../../../../../../actions/getCourses";
import ErrorPage from "@/components/error";
import { getCourse } from "../../../../../../actions/getCourse";



async function ChallengePage({
  params: { challengeId },
}: {
  params: { challengeId: string };
}) {
  const userId = await getUserCookie();
  if (!userId) return redirect("/dashboard");

  const { challenge, error } = await getChallengesByUserIdAndChallengeId(userId, challengeId)
  const {courses,error:coursesError} = await getCourses()

  if (error) return <ErrorPage name={error.name}/>
  if (coursesError) return <ErrorPage name={coursesError.name}/>


  if (!challenge) return redirect("/dashboard");

const {course,error:cError} = await getCourse(challenge.courseId ?? "")
if (cError) return <ErrorPage name={cError.name}/>

  const requiredFields = [
    challenge.title,
    challenge.subTitle,
    challenge.description,
    //challenge.imageUrl,
    challenge.startDate !== null,
    challenge.endDate !== null,
    //challenge.overviewVideoUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean)






  return (
    <>
   
      {!challenge.isPublished && <Banner
        variant={"warning"}
        label="This challenge is unpublished. It will not be visible to your students"
      />}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Challenge setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <ChallengeActions challengeId={challengeId} isPublished={challenge.isPublished} disabled={!isComplete} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} size="sm" />
              <h2 className="text-xl">Customize your challenge</h2>
            </div>
            <TitleForm challenge={challenge} />
            <SubTitleForm challenge={challenge} />
            <DescriptionForm challenge={challenge} />
          
          </div>
          <div>
          <ImageForm challenge={challenge} />
          <OverviewVideoForm challenge={challenge} />
          </div>
          <div>
            <CourseForm challengeId={challengeId} courseTitle={course?.title || ""} courses={courses}/>
          <StartDateForm challenge={challenge} />
          <EndDateForm challenge={challenge} />
          </div>
      
         
        </div>
      </div>
    </>
  );
}

export default ChallengePage;
