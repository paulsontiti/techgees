"use client";
import { Reveal } from "@/app/(kids)/components/landing-page";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

type SessionSidebarItemProps = {
  title: string;
  courseId: string;
  chapterId: string;
  sessionId: string;
  parentId?: string;
  position: number;
};

function SessionCard({
  position,
  title,
  courseId,
  chapterId,
  sessionId,
  parentId,
}: SessionSidebarItemProps) {
  const router = useRouter();

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(
          `/api/user-progress/sessions/${sessionId}?chapterId=${chapterId}`,
        );

        if (data.data) {
          setIsCompleted(data.data);
        }
      } catch (err: any) {
        toast.error(err.message, { duration: 5000 });
      }
    })();
  }, [sessionId, chapterId]);

  const onClick = () => {
    router.push(
      parentId
        ? `/courses/combo/${parentId}/child/${courseId}/chapters/${chapterId}/sessions/${sessionId}`
        : `/courses/single/${courseId}/chapters/${chapterId}/sessions/${sessionId}`,
    );
  };

  return (
    <Reveal delay={position * 0.03}>
      <div
        onClick={onClick}
        className={`relative  hover:cursor-pointer group h-full rounded-3xl border border-white/10 bg-white/[.06] p-5 transition hover:-translate-y-1 hover:bg-white/[.1]`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-[#ffd429]">
            Session {position + 1}
          </span>
          <span className="text-2xl">{}</span>
        </div>
        <h3 className="mt-4 font-black mb-4">{title}</h3>
        {/* <h5 className="mt-2 text-xs">{phase.subtitle}</h5>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          <Preview
            value={chapter.description ? chapter.description.slice(0, 100) : ""}
          />
        </p> */}
        {/* <div className="mt-5 mb-4 border-t border-white/10 pt-4 text-xs font-bold text-slate-300">
                                {phase.promise}
                              </div> */}
        <>
          {isCompleted && (
            <span className="absolute bottom-2 right-4  text-[#ffd429]">
              Completed
            </span>
          )}
        </>
        <>
          
            <span className="absolute bottom-2 right-4  text-[#ffd429]">
              Go to Class
            </span>
          
        </>

       
      </div>
    </Reveal>
  );
}

export default SessionCard;
