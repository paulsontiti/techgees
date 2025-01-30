"use client"
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
import { useEffect, useState } from "react";
import { DBUser } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import axios from "axios";



function ProfilePage() {

  const [user, setUser] = useState<DBUser | undefined>(undefined);

  useEffect(() => {
    (
      async () => {
        try {
          const res = await axios.get(`/api/user`);

          setUser(res.data);
        } catch (err: any) {
          toast.error(err.message);
        }
      }
    )()
  }, []);
  //const {referers,error:usersError} = await getUsersForReferal()
  // const {referer,error:refererError} = await getReferer(userId)

  const requiredFields = [
    user?.firstName,
    user?.lastName,
    user?.email,
    user?.phone,
    user?.whatsapp,
    user?.userName,
    user?.refererId
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean)


  return <div className="p-6">
   
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">Profile setup</h1>
        <span className="text-sm text-slate-700 flex items-center gap-2">
          Complete all fields {user === undefined ? <Skeleton className="w-20 h-5 m-2" /> :
            <>{completionText}</>}
        </span>
      </div>

    </div>
    <div className="flex items-center gap-x-2 mt-4">
      <IconBadge icon={User} size="sm" />
      <h2 className="text-xl">Setup your Profile</h2>
    </div>
    <div className="space-y-6">
       
          <ImageForm/>

      </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
      <div>
        {user === undefined ? <Skeleton className="w-full h-10 m-2" /> :
          <UserId userId={user?.userId} />}
        {user === undefined ? <Skeleton className="w-full h-10 m-2" /> :
          <FirstNameForm user={user} />}

        {user === undefined ? <Skeleton className="w-full h-10 m-2" /> :
          <LastNameForm user={user} />}

        {user === undefined ? <Skeleton className="w-full h-10 m-2" /> :
          <UsernameForm user={user} />
        }


      </div>
      <div className="space-y-6">
        {user === undefined ? <Skeleton className="w-full h-10 m-2" /> :
          <PhoneForm user={user} />
        }

        {user === undefined ? <Skeleton className="w-full h-10 m-2" /> :
          <WhatsAppForm user={user} />
        }

        <RefererComponent
        />
      </div>
      
    </div>
  </div>


}

export default ProfilePage;
