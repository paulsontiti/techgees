"use client";
// 52-Week Course — Advanced React Component
// Single-file demo scaffold. Features:
// - Framer Motion animations
// - Video player with captions support
// - Per-week quizzes with scoring and pass/fail
// - Badges & animated leaderboard
// - Social sharing (Web Share API) + WhatsApp + copy link
// - Client-side certificate generation (jsPDF + html2canvas flow)
// - Discussion/comments per week (localStorage-backed)
// - Downloadable transcripts (if provided)
// - PWA/offline-ready hooks comments
// - Clear integration points for backends (Auth, storage, analytics)

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Award,
  Trophy,
  CheckCircle,
  Bookmark,
  Users,
  Play,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// NOTE: this scaffold expects the following NPM packages in your project for full functionality:
// framer-motion, lucide-react, jspdf, html2canvas (for certificate generation). If you don't have them,
// remove the certificate generation code or swap for a server-side generation endpoint.

// ------------------ Mock Data ------------------
const WEEKS = Array.from({ length: 52 }, (_, i) => ({
  id: i + 1,
  title: `Week ${i + 1}: Topic Title`,
  description: `Short description & learning objectives for week ${i + 1}.`,
  videoSrc:
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  captions: null, // place VTT url here if available
  transcript: null, // plain text transcript if available
  quiz: {
    questions: [
      {
        id: `q-${i + 1}-1`,
        text: `Key idea from week ${i + 1}?`,
        choices: ["A", "B", "C", "D"],
        answer: 0,
      },
      {
        id: `q-${i + 1}-2`,
        text: `Which is correct?`,
        choices: ["A", "B", "C", "D"],
        answer: 2,
      },
    ],
  },
}));

const BADGES = [
  { id: "b1", name: "Getting Started", threshold: 1 },
  { id: "b5", name: "Committed Learner", threshold: 5 },
  { id: "b13", name: "Quarter Way", threshold: 13 },
  { id: "b26", name: "Halfway Hero", threshold: 26 },
  { id: "b52", name: "Course Master", threshold: 52 },
];

// ------------------ Local Storage Keys ------------------
const LS = {
  PROGRESS: "course_v3_progress",
  QUIZ: "course_v3_quiz",
  PROFILE: "course_v3_profile",
  COMMENTS: "course_v3_comments",
};

function loadLS(key, fallback) {
  try {
    const r = localStorage.getItem(key);
    return r ? JSON.parse(r) : fallback;
  } catch {
    return fallback;
  }
}
function saveLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// ------------------ Certificate helpers (client-side) ------------------
// This code uses jsPDF and html2canvas if available in the host bundle. If you don't have these libs,
// switch to server-side certificate generation (recommended for production).
async function generateCertificatePDF({
  name,
  completedOn,
  courseTitle = "52-week course",
  avatarLetter = "U",
}) {
  try {
    const html = `
      <div style="width:1000px;height:700px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif;background:linear-gradient(135deg,#f8fafc,#eef2ff);padding:40px;">
        <div style="text-align:center;">
          <div style="font-size:28px;font-weight:700;color:#0f172a">Certificate of Completion</div>
          <div style="margin-top:18px;font-size:18px;color:#475569">This certifies that</div>
          <div style="margin-top:18px;font-size:36px;font-weight:700;color:#0f172a">${name}</div>
          <div style="margin-top:12px;font-size:16px;color:#334155">has successfully completed</div>
          <div style="margin-top:10px;font-size:20px;font-weight:600;color:#0f172a">${courseTitle}</div>
          <div style="margin-top:18px;font-size:14px;color:#475569">Completed on ${completedOn}</div>
        </div>
      </div>
    `;

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.left = "-9999px";
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    // use html2canvas if available
    // @ts-ignore
    if (window.html2canvas) {
      // @ts-ignore
      const canvas = await window.html2canvas(wrapper, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      // @ts-ignore
      if (window.jsPDF) {
        // @ts-ignore
        const pdf = new window.jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${name.replace(/\s+/g, "_")}_certificate.pdf`);
      } else {
        const w = window.open();
        w.document.write(`<img src="${imgData}" />`);
      }
    } else {
      const w = window.open("", "_blank");
      w.document.write(html);
      w.document.close();
      w.focus();
    }

    document.body.removeChild(wrapper);
    return true;
  } catch (e) {
    console.error("Certificate generation failed", e);
    return false;
  }
}

// ------------------ Main Component ------------------
export default function Course52Advanced() {
  const [weeks] = useState(WEEKS);
  const [selectedWeek, setSelectedWeek] = useState(weeks[0]);
  const [progress, setProgress] = useState(() =>
    loadLS(LS.PROGRESS, { completed: [], bookmarks: [], notes: {} })
  );
  const [quizResults, setQuizResults] = useState(() => loadLS(LS.QUIZ, {}));
  const [profile, setProfile] = useState(() =>
    loadLS(LS.PROFILE, { name: "You", avatarColor: "bg-indigo-500" })
  );
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: "Ada Lovelace", points: 520 },
    { id: 2, name: "You", points: 300 },
  ]);
  const [comments, setComments] = useState(() => loadLS(LS.COMMENTS, {}));
  const [quizOpen, setQuizOpen] = useState(false);
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [toast, setToast] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => saveLS(LS.PROGRESS, progress), [progress]);
  useEffect(() => saveLS(LS.QUIZ, quizResults), [quizResults]);
  useEffect(() => saveLS(LS.PROFILE, profile), [profile]);
  useEffect(() => saveLS(LS.COMMENTS, comments), [comments]);

  const completedCount = progress.completed.length;
  const completionPercent = Math.round((completedCount / weeks.length) * 100);
  const unlockedBadges = useMemo(
    () => BADGES.filter((b) => completedCount >= b.threshold),
    [completedCount]
  );

  function showToast(msg, ms = 2500) {
    setToast(msg);
    setTimeout(() => setToast(null), ms);
  }

  function markComplete(weekId) {
    if (!progress.completed.includes(weekId)) {
      const next = { ...progress, completed: [...progress.completed, weekId] };
      setProgress(next);
      showToast("Great — week completed!");
      // TODO: send event to analytics
    } else showToast("Week already complete");
  }

  function toggleBookmark(weekId) {
    const bm = progress.bookmarks || [];
    const next = bm.includes(weekId)
      ? bm.filter((x) => x !== weekId)
      : [...bm, weekId];
    setProgress({ ...progress, bookmarks: next });
    showToast("Bookmark updated");
  }

  function openQuiz(week) {
    setSelectedWeek(week);
    setCurrentAnswers({});
    setQuizOpen(true);
  }

  function submitQuiz(week) {
    const q = week.quiz.questions;
    let correct = 0;
    q.forEach((qq) => {
      if (currentAnswers[qq.id] === qq.answer) correct++;
    });
    const score = Math.round((correct / q.length) * 100);
    const results = {
      ...quizResults,
      [week.id]: { score, correct, total: q.length, date: Date.now() },
    };
    setQuizResults(results);
    setQuizOpen(false);
    if (score >= 60) markComplete(week.id);
    // mock leaderboard update
    setLeaderboard((prev) => {
      const idx = prev.findIndex((p) => p.name === profile.name);
      const pts = Math.max(20, score);
      if (idx >= 0) {
        const cp = [...prev];
        cp[idx] = { ...cp[idx], points: cp[idx].points + pts };
        return cp.sort((a, b) => b.points - a.points);
      }
      return [
        ...prev,
        { id: prev.length + 1, name: profile.name, points: pts },
      ].sort((a, b) => b.points - a.points);
    });
    showToast(`Quiz submitted — ${score}%`);
  }

  function share(platform) {
    const url = window.location.href;
    const text = `I'm learning: ${selectedWeek.title} — join me on this course!`;
    if (navigator.share) {
      navigator.share({ title: "52-week course", text, url }).catch(() => {});
      return;
    }
    let shareUrl = "";
    if (platform === "wa")
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
    if (platform === "twitter")
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`;
    if (platform === "facebook")
      shareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
        url
      )}`;
    if (shareUrl) window.open(shareUrl, "_blank");
    showToast("Share opened");
  }

  async function handleDownloadCertificate() {
    if (completedCount < weeks.length) {
      showToast("Finish all weeks to download certificate");
      return;
    }
    const ok = await generateCertificatePDF({
      name: profile.name,
      completedOn: new Date().toLocaleDateString(),
      courseTitle: "52-Week Mastery Course",
    });
    if (ok) showToast("Certificate generated/downloaded");
    else showToast("Certificate generation failed");
  }

  function addComment(weekId, text) {
    if (!text?.trim()) return;
    const c = comments[weekId] || [];
    const next = {
      ...comments,
      [weekId]: [
        ...c,
        { id: Date.now(), author: profile.name, text, date: Date.now() },
      ],
    };
    setComments(next);
    showToast("Comment added");
  }

  // keyboard nav
  useEffect(() => {
    function onKey(e) {
      const idx = weeks.findIndex((w) => w.id === selectedWeek.id);
      if (e.key === "ArrowLeft" && idx > 0) setSelectedWeek(weeks[idx - 1]);
      if (e.key === "ArrowRight" && idx < weeks.length - 1)
        setSelectedWeek(weeks[idx + 1]);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedWeek, weeks]);

  return (
    <div>

        {/* Main Section */}
        <main className="flex-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow p-4"
          >
            <div className="flex gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {selectedWeek.title}
                    </h2>
                    <p className="text-sm text-slate-600">
                      {selectedWeek.description}
                    </p>
                  </div>
                  <div className="text-xs text-slate-500">
                    Last quiz: {quizResults[selectedWeek.id]?.score ?? "—"}%
                  </div>
                </div>

                <div className="mt-4 bg-black rounded overflow-hidden">
                  <video
                    ref={videoRef}
                    key={selectedWeek.id}
                    src={selectedWeek.videoSrc}
                    controls
                    className="w-full max-h-[420px]"
                    onEnded={() => {
                      if (!progress.completed.includes(selectedWeek.id))
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
                  </video>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Button onClick={() => openQuiz(selectedWeek)}>
                      <Play className="w-4 h-4 mr-2" />
                      Take Quiz
                    </Button>
                    <Button onClick={() => markComplete(selectedWeek.id)}>
                      Mark as Complete
                    </Button>
                    <Button onClick={() => share("wa")}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <div className="text-xs text-slate-500">
                    Pro tip: enable captions for accessibility.
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
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
                </div>

                {/* Comments */}
                <div className="mt-6">
                  <h4 className="text-sm font-semibold">Discussion</h4>
                  <div className="mt-2 space-y-3">
                    {(comments[selectedWeek.id] || []).map((c) => (
                      <div key={c.id} className="p-2 bg-gray-50 rounded">
                        <div className="text-xs text-slate-500">
                          {c.author} • {new Date(c.date).toLocaleString()}
                        </div>
                        <div className="mt-1">{c.text}</div>
                      </div>
                    ))}
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
                        if (input) {
                          addComment(selectedWeek.id, input.value);
                          input.value = "";
                        }
                      }}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>

              <aside className="w-80">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm">Signed in as</div>
                        <div className="font-medium">{profile.name}</div>
                      </div>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${profile.avatarColor}`}
                      >
                        {profile.name[0]}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button onClick={handleDownloadCertificate}>
                        <Download className="w-4 h-4 mr-2" />
                        Download Certificate
                      </Button>
                      <Button onClick={() => share("wa")}>
                        Invite on WhatsApp
                      </Button>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => share("twitter")}
                          className="px-2 py-1 rounded border text-sm"
                        >
                          Twitter
                        </button>
                        <button
                          onClick={() => share("facebook")}
                          className="px-2 py-1 rounded border text-sm"
                        >
                          Facebook
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <h5 className="text-sm font-medium">Quick Analytics</h5>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      Client-side: watch events, quiz events. Pro tip: connect
                      server analytics for cohort insights and retention
                      funnels.
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader>
                    <h5 className="text-sm font-medium">Extras</h5>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      Planned: SCORM/xAPI export, SSO (OAuth), subtitle
                      auto-generation, SCORM packaging, offline video (PWA &
                      service worker).
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </motion.div>

          {/* Quiz modal */}
          <AnimatePresence>
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
          </AnimatePresence>
        </main>

      
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed right-6 bottom-6 z-50 bg-white p-3 rounded shadow"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
