"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { loadLSType, LS } from "./weeks";
import { Button } from "@/components/ui/button";
import { Play,Share2, X } from "lucide-react";

import { Preview } from "@/components/preview";
import VideoPlayer from "@/components/video-player";
import SessionQuestions from "./session-questions";
import { SessionType } from "../../../../../actions/getSessionWithAttachmentQuestionsAssignments";
import { free52WeekShare } from "@/lib/socia-share";

function MainSection({
  week,
  courseId,
  tggUrl,userId
}: {
  week: SessionType;
  courseId: string;
  tggUrl: string;userId:string
}) {
  const [selectedWeek, setSelectedWeek] = useState<SessionType>(week);

  const [progress, setProgress] = useState(() =>
    loadLSType(LS.PROGRESS, { completed: [], bookmarks: [], notes: {} })
  );
  const [quizOpen, setQuizOpen] = useState(false);

  const [toast, setToast] = useState<string | null>(null);


  function loadLSQUIZ(key: string, fallback: any): any {
    try {
      const r = localStorage.getItem(key);
      return r ? JSON.parse(r) : fallback;
    } catch {
      return fallback;
    }
  }
  function loadLSProfile(key: string, fallback: any): any {
    try {
      const r = localStorage.getItem(key);
      return r ? JSON.parse(r) : fallback;
    } catch {
      return fallback;
    }
  }

  function toggleQuizOpen() {
    setQuizOpen((prv) => !prv);
  }

  function showToast(msg: string, ms = 2500) {
    setToast(msg);
    setTimeout(() => setToast(null), ms);
  }

  //    async function handleDownloadCertificate() {
  //     if (completedCount < weeks.length) {
  //       showToast("Finish all weeks to download certificate");
  //       return;
  //     }
  //     const ok = await generateCertificatePDF({
  //       name: profile.name,
  //       completedOn: new Date().toLocaleDateString(),
  //       courseTitle: "52-Week Mastery Course",
  //     });
  //     if (ok) showToast("Certificate generated/downloaded");
  //     else showToast("Certificate generation failed");
  //   }


  function markComplete(weekId: string) {
    if (!progress.completed.includes(weekId)) {
      const next = { ...progress, completed: [...progress.completed, weekId] };
      setProgress(next);
      showToast("Great — week completed!");
      // TODO: send event to analytics
    } else showToast("Week already complete");
  }

  return (
    <main id="top" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow p-4"
      >
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="w-full">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">{selectedWeek?.title}</h2>
                <Preview value={selectedWeek?.description || ""} />
              </div>
              {/* <div className="text-xs text-slate-500">
                Last quiz: {quizResults[selectedWeek?.id]?.score ?? "—"}%
              </div> */}
            </div>

            <div className="mt-4 bg-black rounded overflow-hidden">
              <VideoPlayer
                url={selectedWeek?.videoUrl || ""}
                title={selectedWeek?.title || ""}
              />
              {/* <video
                ref={videoRef}
                key={selectedWeek?.id}
                src={selectedWeek?.videoUrl || ""}
                controls
                className="w-full max-h-[420px]"
                onEnded={() => {
                  if (!progress.completed.includes(selectedWeek?.id || ""))
                    openQuiz(selectedWeek);
                }}
                preload="metadata"
                crossOrigin="anonymous"
              > 
                {selectedWeek.captions && (
                  <track
                    kind="subtitles"
                    srcLang="en"
                    src={selectedWeek.captions}
                    default
                  />
                )} 
              </video> */}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button onClick={() => toggleQuizOpen()}>
                  {!quizOpen ? (
                    <Play className="w-4 h-4 mr-2" />
                  ) : (
                    <X className="w-4 h-4 mr-2" />
                  )}
                  {!quizOpen ? "Show Quiz" : "Close Quiz"}
                </Button>
                {/* <Button onClick={() => markComplete(selectedWeek?.id || "")}>
                  Mark as Complete
                </Button> */}
                <Button onClick={() => free52WeekShare("wa",tggUrl,userId,selectedWeek?.title!)}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
              {/* <div className="text-xs text-slate-500">
                Pro tip: enable captions for accessibility.
              </div> */}
            </div>

            {/* <div className="mt-6 grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <h5 className="text-sm font-medium">Resources</h5>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>
                      <a className="underline">Slide deck (PDF)</a>
                    </li>
                    <li>
                      <a className="underline">Code sandbox</a>
                    </li>
                    <li>
                      <a className="underline">Extra reading</a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h5 className="text-sm font-medium">Notes</h5>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full min-h-[120px] border p-2 rounded"
                    value={progress.notes[selectedWeek.id] || ""}
                    onChange={(e) => {
                      const n = { ...(progress.notes || {}) };
                      n[selectedWeek.id] = e.target.value;
                      setProgress({ ...progress, notes: n });
                    }}
                    placeholder="Personal notes — saved locally"
                  />
                </CardContent>
              </Card>
            </div> */}

            {quizOpen && (
              <SessionQuestions
                userProgress={selectedWeek?.userProgresses[0]}
                isLastSession={false}
                sessionQuestions={selectedWeek?.questions || []}
                sessionId={selectedWeek?.id!}
                sessionUrl={`/free-52-weeks/${courseId}/chapters/${selectedWeek?.chapterId}/weeks/${selectedWeek?.id}`}
                chapterUrl=""
              />
            )}

            {/* Comments */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold">Discussion</h4>
              <div className="mt-2 space-y-3">
                {/* {(comments[selectedWeek.id] || []).map((c) => (
                  <div key={c.id} className="p-2 bg-gray-50 rounded">
                    <div className="text-xs text-slate-500">
                      {c.author} • {new Date(c.date).toLocaleString()}
                    </div>
                    <div className="mt-1">{c.text}</div>
                  </div>
                ))} */}
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  className="flex-1 border p-2 rounded"
                  placeholder="Add a comment"
                  id="comment-input"
                />
                <Button
                  onClick={() => {
                    const input = document.getElementById("comment-input");
                    // if (input) {
                    //   addComment(selectedWeek.id, input.value);
                    //   input.value = "";
                    // }
                  }}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>

       
        </div>
      </motion.div>

      {/* Quiz modal */}
      {/* <AnimatePresence>
        {quizOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              className="bg-white w-full max-w-3xl rounded p-6"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">
                  Quiz — {selectedWeek.title}
                </h3>
                <div className="flex items-center gap-2">
                  <Button onClick={() => setQuizOpen(false)}>Close</Button>
                </div>
              </div>
              <div className="mt-4 space-y-4">
                {selectedWeek.quiz.questions.map((q) => (
                  <div key={q.id} className="p-3 border rounded">
                    <div className="font-medium">{q.text}</div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {q.choices.map((c, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            setCurrentAnswers({
                              ...currentAnswers,
                              [q.id]: idx,
                            })
                          }
                          className={`p-2 rounded text-left border ${
                            currentAnswers[q.id] === idx
                              ? "bg-slate-200"
                              : "bg-white"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => submitQuiz(selectedWeek)}>
                  Submit Quiz
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </main>
  );
}

export default MainSection;
