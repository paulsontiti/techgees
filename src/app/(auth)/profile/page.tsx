import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUser } from "../../../../actions/getUser";
import ErrorPage from "@/components/error";
import IconBadge from "@/components/icon-badge";
import { User } from "lucide-react";
import FirstNameForm from "./_components/first-name-form";
import { createUser } from "../../../../actions/createUser";
import LastNameForm from "./_components/last-name-form";
import PhoneForm from "./_components/phone-form";



async function ProfilePage() {
  const { userId } = auth();
  if (!userId) return redirect("/dashboard");

  let { user, error } = await getUser(userId)
  if(!user){
    const {createdUser,error} = await createUser(userId)
    if (error) return <ErrorPage name={error.name}/>
    user = createdUser
  }

  if (error) return <ErrorPage name={error.name}/>
  if (!user) return <ErrorPage name={"Unknown error"}/>


  const requiredFields = [
    user.firstName,
    user.lastName,
    user.email,
    user.phone,
    user.whatsapp
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean)

  
        return  <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Profile setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
         
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={User} size="sm" />
              <h2 className="text-xl">Setup your Profile</h2>
            </div>
            <FirstNameForm user={user}/>
            <LastNameForm user={user}/>
            <PhoneForm user={user}/>
          </div>
          {/* <div className="space-y-6">
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
          </div> */}
        </div>
      </div>
      

}

export default ProfilePage;
