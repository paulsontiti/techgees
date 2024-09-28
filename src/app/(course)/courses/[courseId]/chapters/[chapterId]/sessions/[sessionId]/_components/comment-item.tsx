"use client"
import { Preview } from "@/components/preview";
import { UserDp } from "@/components/user-dp";
import { Comment, DBUser} from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function CommentItem({ comment }: { comment: Comment }) {
  const [user, setUser] = useState<DBUser | null>(null);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/api/user/${comment.userId}`);
      setUser(res.data);
    })();
  });
  if (!user)
    return (
      <div className="flex items-start gap-x-2 mb-4 bg-slate-100 p-2">
        <UserDp imgUrl="" initials="TG" />
        <div>
          <p className="text-sm font-semibold">Anonymous</p>
          <Preview value={comment.comment} />
        </div>
      </div>
    );

//get the initiials of the names
const firstNameInitials = `${user.firstName ? user.firstName.slice(0) : ""}`
const secondNameInitials  = `${user.lastName ? user.lastName.slice(0) : ""}`

  return (
    <div className="flex items-start gap-x-2 mb-4 bg-slate-100 p-2" >
      <UserDp
        imgUrl={user?.imageUrl!}
        initials={`${firstNameInitials}${secondNameInitials}`}
      />
      <div>
        <p className="text-sm font-semibold">
          {`${user.firstName} ${user.lastName}`}
        </p>
        <Preview value={comment.comment} />
      </div>
    </div>
  );
}

export default CommentItem;
