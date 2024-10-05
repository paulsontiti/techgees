"use client"
import { Preview } from "@/components/preview";
import { UserDp } from "@/components/user-dp";
import { Comment, DBUser } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CommentItem({ comment }: { comment: Comment }) {
  const [user, setUser] = useState<DBUser | null>(null);

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
  if (!user)
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

  //get the initiials of the names
  const firstNameInitials = `${user.firstName ? user.firstName.slice(0) : ""}`
  const secondNameInitials = `${user.lastName ? user.lastName.slice(0) : ""}`

  return (
    <div className=" mb-4 bg-slate-100 p-2" >
      <div className="flex items-center gap-x-2">
        <UserDp
          imgUrl={user.imageUrl ?? ""}
          initials={`${firstNameInitials}${secondNameInitials}`}
        />
        <p className="text-sm font-semibold">
          {`${user.firstName} ${user.lastName}`}
        </p>

      </div>
      <Preview value={comment.comment} />
    </div>
  );
}

export default CommentItem;
