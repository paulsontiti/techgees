import { redirect } from "next/navigation";
import { getUser } from "../../../../actions/getUser";
import ErrorPage from "@/components/error";
import IconBadge from "@/components/icon-badge";
import { User } from "lucide-react";
import FirstNameForm from "./_components/first-name-form";
import { createUser } from "../../../../actions/createUser";
import LastNameForm from "./_components/last-name-form";
import PhoneForm from "./_components/phone-form";
import WhatsAppForm from "./_components/whatsapp-form";
import ImageForm from "./_components/image-form";
import UserId from "./_components/user-id";
import { getUsersForReferal } from "../../../../actions/getUsers";
import UsernameForm from "./_components/user-name-form";
import RefererComponent from "./_components/referer-component";
import { getReferer } from "../../../../actions/getReferer";
import { getUserCookie } from "@/lib/get-user-cookie";



async function ProfilePage() {
  const userId = await getUserCookie();
  if (!userId) return redirect("/dashboard");

  let { user, error } = await getUser(userId)
  if(!user){
    const {createdUser,error} = await createUser(userId)
    if (error) return <ErrorPage name={error.name}/>
    user = createdUser
  }

  if (error) return <ErrorPage name={error.name}/>
  if (!user) return <ErrorPage name={"Unknown error"}/>

  const {referers,error:usersError} = await getUsersForReferal()
  const {referer,error:refererError} = await getReferer(userId)

  const requiredFields = [
    user.firstName,
    user.lastName,
    user.email,
    user.phone,
    user.whatsapp,
    user.userName,
    user.refererId
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
        <div className="flex items-center gap-x-2 mt-4">
              <IconBadge icon={User} size="sm" />
              <h2 className="text-xl">Setup your Profile</h2>
            </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
          <div>
           <UserId userId={userId}/>
            <FirstNameForm user={user}/>
            <LastNameForm user={user}/>
            <UsernameForm user={user}/>
         
          </div>
          <div className="space-y-6">
          <PhoneForm user={user}/>
          <WhatsAppForm user={user}/>
          <RefererComponent users={[...referers,
            {id:"Facebook",userName:"Facebook"},
            {id:"Instagram",userName:"Instagram"},
            {id:"Youtube",userName:"Youtube"},
            {id:"Tiktok",userName:"Tiktok"},
            {id:"Google ads",userName:"Google ads"},
            ]} 
            error={usersError ?? refererError}
            referer={referer}
            />
          </div>
          <div className="space-y-6">
           <ImageForm user={user}/>
          </div>
        </div>
      </div>
      

}

export default ProfilePage;
