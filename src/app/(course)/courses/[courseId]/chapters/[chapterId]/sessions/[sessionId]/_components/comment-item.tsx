"use client"
import { Preview } from "@/components/preview";
import { UserDp } from "@/components/user-dp";
import { Comment, User } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function CommentItem({ comment }: { comment: Comment }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/api/user/${comment.userId}`);
      setUser(res.data);
    })();
  });
  if (!user)
    return (
      <div className="flex items-start gap-x-2 mb-4">
        <UserDp imgUrl="" initials="TG" />
        <div>
          <p className="text-sm font-semibold">Anonymous</p>
          <Preview value={comment.comment} />
        </div>
      </div>
    );
  return (
    <div className="flex items-start gap-x-2 mb-4">
      <UserDp
        imgUrl={user?.imageUrl!}
        initials={`${user?.firstName.slice(0)}${user?.lastName.slice(0)}`}
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
