import type { Metadata } from "next";
import WeeksAside from "../../_components/weeks";
import CommunityAside from "../../_components/community";
import { getUserCookie } from "@/lib/get-user-cookie";
import { redirect } from "next/navigation";
import { getCourseChaptersUserProgress } from "../../../../../../../actions/getCourseChaptersUserProgress";
import ErrorPage from "@/components/error";
import { getChapterProgress } from "../../../../../../../actions/getChapterProgress";
import CourseNavbar from "../../_components/navbar";
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

export const metadata: Metadata = {
  title: "The Global Genius",
  description:
    "A Learning Management System, a platform where you can learn any and everything with its pioneer in TECH and Software Development",
};

export default async function CourseLayout({
  children,
  params: { courseId },
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const userId = await getUserCookie();
  if (!userId) return redirect("/dashboard");

  const { course, error: couError } = await getCourseChaptersUserProgress(
    userId!,
    courseId
  );
  if (couError) return <ErrorPage name={couError.name} />;
  if (!course) return redirect("/dashboard");

  const { progressPercentage, error } = await getChapterProgress(
    userId,
    course.chapters[0].id
  );

  return (
    <div>
      <div>
        <CourseNavbar
          chapter={course.chapters[0]}
          progressPercentage={progressPercentage || 0}
        />
      </div>
      <div className=" flex flex-col md:flex-row  gap-6 bg-slate-50">
        {/* Left: Weeks, badges, leaderboard */}
        <div className="hidden md:block flex-5">
          <WeeksAside
            chapter={course.chapters[0]}
            progressPercentage={progressPercentage}
          />
        </div>
        <div className="flex flex-col xl:flex-row flex-7">
          {children}
          {/* Right column */}
          <CommunityAside />
        </div>
      </div>
    </div>
  );
}
