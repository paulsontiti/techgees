"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { CheckCheck, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type SessionSidebarItemProps = {
  title: string;
  id: string;
  courseId: string;
  isLocked: boolean;
  chapterId: string,
  sessionId: string,

};

function SessionSidebarItem({
  id,
  title,
  isLocked,
  courseId,
  chapterId,
  sessionId
}: SessionSidebarItemProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false)


  useEffect(() => {
    (
      async () => {
        try {
          const data = await axios.get(`/api/user-progress/sessions/${sessionId}?chapterId=${chapterId}`,)

          if (data.data) {
            setIsCompleted(data.data)
          }


        } catch (err: any) {
          toast.error(err.message, { duration: 5000 })
        }
      }
    )()
  }, [sessionId,chapterId])





  const Icon = isLocked ? Lock : isCompleted ? CheckCheck : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/single/${courseId}/chapters/${chapterId}/sessions/${sessionId}`);
  };
  return (
    <div className=" mt-1">
      <button
        disabled={isLocked}
        onClick={onClick}
        type="button"
        className={cn(
          "w-full h-[50px] flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-2 transition-all hover:text-slate-600 hover:bg-slate-300/20",
          isActive &&
          "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
          isCompleted && isActive && "bg-emerald-200/20",
          !isLocked && "hover:bg-sky-300/20"
        )}
      >
        <div className="flex items-center gap-x-2 py-1">
          <Icon
            size={22}
            className={cn(
              "text-slate-500",
              isActive && "text-slate-700",
              isCompleted && "text-emerald-700"
            )}
          />
          <span className="line-clamp-1 text-left"> {title}</span>
        </div>
        <div className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-emerald-700"
        )}>

        </div>
      </button>

    </div>
  );
}

export default SessionSidebarItem;
