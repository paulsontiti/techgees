"use client"
import { Preview } from "@/components/preview";
import { Skeleton } from "@/components/ui/skeleton";
import { UserDp } from "@/components/user-dp";
import { getFullNameInitials } from "@/utils/getNameInitials";
import { Comment, DBUser } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CommentItem({ comment }: { comment: Comment }) {
  const [user, setUser] = useState<DBUser | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/user/${comment.userId}`);
        setUser(res.data);
      } catch (errror: any) {
        toast.error("Error occurred while trying to fetch user details")
      }
    })();
  },[comment.userId]);

  if(user === undefined) return <Skeleton className="w-full h-20 my-2"/>

  if (user === null)
    return (
      <div className=" mb-4 bg-slate-100 p-2" >
      <div className="flex items-center gap-x-2">
        <UserDp
          imgUrl=""
          initials="TG"
        />
        <p className="text-sm font-semibold">
         Anonymous
        </p>

      </div>
      <Preview value={comment.comment} />
    </div>
    );


  const initials = user.firstName !== null && user.lastName !== null ?
   getFullNameInitials(`${user?.firstName} ${user?.lastName}`) : "TG" ;
    return (
    <div className=" mb-4 bg-slate-100 p-2" >
      <div className="flex items-center gap-x-2">
        <UserDp
          imgUrl={user.imageUrl ?? ""}
          initials={initials}
        />
        <p className="text-sm font-semibold">
          {`${user.firstName || "Anonymous"} ${user.lastName || ""}`}
        </p>

      </div>
      <Preview value={comment.comment} />
    </div>
  );
}

export default CommentItem;
