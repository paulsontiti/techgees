"use client";

import { cn } from "@/lib/utils";
import { Session } from "@prisma/client";
import { CheckCheck, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

type SessionSidebarItemProps = {
  title: string;
  id: string;
  courseId: string;
  isLocked: boolean;
  chapterId:string,
  sessionId:string
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
  const [isCompleted,setIsCompleted] = useState(false)
  
//TODO:GET iscomplted from userprogress for this session

  const Icon = isLocked ? Lock : isCompleted ? CheckCheck : PlayCircle;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${chapterId}/sessions/${sessionId}`);
  };
  return (
    <div className=" mt-1">
      <button
      disabled={isLocked}
      onClick={onClick}
        type="button"
        className={cn(
          "w-full h-[50px] flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-2 transition-all hover:text-slate-600 hover:bg-sky-300/20",
          isActive &&
            "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
          isCompleted && isActive && "bg-emerald-200/20"
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
          {title}
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
