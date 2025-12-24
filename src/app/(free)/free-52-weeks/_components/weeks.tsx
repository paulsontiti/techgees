"use client";

import React, {useState } from "react";
import { motion } from "framer-motion";

import {
  CheckCircle,
  Bookmark,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import { SidebarChapter } from "@/app/(course)/courses/combo/[courseId]/child/_components/course-sidebar";
import { OtherSession } from "@/app/(auth)/teacher/courses/[courseId]/chapters/[chapterId]/_components/sessions-list";

export type WEEKType = {
  id: number;
  title: string;
  description: string;
  videoSrc: string;
  captions: null; // place VTT url here if available
  transcript: null; // plain text transcript if available
  quiz: {
    questions: {
      id: string;
      text: string;
      choices: string[];
      answer: number;
    }[];
  };
};

export const LS = {
  PROGRESS: "course_v3_progress",
  QUIZ: "course_v3_quiz",
  PROFILE: "course_v3_profile",
  COMMENTS: "course_v3_comments",
};

// ------------------ Local Storage Keys ------------------

type LSType = { completed: string[]; bookmarks: string[]; notes: {} };

export function loadLSType(key: string, fallback: LSType): LSType {
  try {
    const r = localStorage.getItem(key);
    return r ? JSON.parse(r) : fallback;
  } catch {
    return fallback;
  }
}


export type Leaderboard ={
  id:string,
  userName:string,
  points:number
  imageUrl:string
}

function WeeksAside({
  chapter,
  progressPercentage
}: {
  chapter: SidebarChapter;
  progressPercentage: number;
}) {
  //---------- Get the active session/week
 const pathname = usePathname();
  const activeWeek = chapter.sessions.find((session)=> pathname.includes(session.id))

  // ------------------ UseStates ------------------
 
  const [selectedWeek, setSelectedWeek] = useState<OtherSession | undefined>(activeWeek);
  const [progress, setProgress] = useState(() =>
    loadLSType(LS.PROGRESS, { completed: [], bookmarks: [], notes: {} })
  );
  const [toast, setToast] = useState<string | null>(null);

  const router = useRouter();

  // ------------------ Variables ------------------
  const completedCount = Math.round(
    (progressPercentage / 100) * chapter.sessions.length
  ); //progress.completed.length;
  const completionPercent = Math.round(progressPercentage);

  // ------------------ Functions ------------------
  function showToast(msg: string, ms = 2500) {
    setToast(msg);
    setTimeout(() => setToast(null), ms);
  }

  function markComplete(weekId: string) {
    if (!progress.completed.includes(weekId)) {
      const next = { ...progress, completed: [...progress.completed, weekId] };
      setProgress(next);
      showToast("Great — week completed!");
      // TODO: send event to analytics
    } else showToast("Week already complete");
  }

  function toggleBookmark(weekId: string) {
    const bm = progress.bookmarks || [];
    const next = bm.includes(weekId)
      ? bm.filter((x) => x !== weekId)
      : [...bm, weekId];
    setProgress({ ...progress, bookmarks: next });
    showToast("Bookmark updated");
  }

  function redirectToSelectedWeek(weekId:string) {
    router.push(
      `/free-52-weeks/${chapter.courseId}/chapters/${chapter.id}/weeks/${weekId}`
    );
  }

  return (
    <aside className="flex-3">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{chapter.title}</h3>
              {/* <div className="text-xs text-slate-500">Animated, accessible</div> */}
            </div>
            <div className="text-sm">{completionPercent}%</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ type: "spring", stiffness: 80 }}
                className="h-3 rounded"
                style={{
                  background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
                }}
              />
            </div>
            <div className="text-xs mt-2">
              {completedCount} of {chapter.sessions.length} weeks completed
            </div>
          </div>

          <div className="max-h-[56vh] overflow-auto pr-2 space-y-2">
            {chapter.sessions.map((w) => (
              <motion.button
                key={w.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                disabled={!w.isPublished}
                title={!w.isPublished ? "Not available yet" : ""}
                className={`w-full text-left p-2 rounded-md flex items-center justify-between shadow
                   hover:bg-gray-200
                   ${selectedWeek?.id === w.id && "bg-gray-400"}`}
                onClick={() => {
                  setSelectedWeek(chapter.sessions[w.position]);
                  redirectToSelectedWeek(w.id);
                }}
              >
                <div>
                  <div className="text-sm font-medium">{w.title}</div>
                </div>
                <div className="flex items-center gap-2">
                  {w.userProgresses.length > 0 &&
                    w.userProgresses[0].isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  {progress.bookmarks.includes(w.id) && (
                    <Bookmark className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* <div className="mt-4 flex gap-2">
            <Button onClick={() => markComplete(selectedWeek.id)}>
              Mark Complete
            </Button>
            <Button onClick={() => toggleBookmark(selectedWeek.id)}>
              Bookmark
            </Button>
          </div> */}
        </CardContent>
      </Card>

    
    </aside>
  );
}

export default WeeksAside;
