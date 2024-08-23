import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import ErrorPage from "@/components/error";
import Banner from "@/components/banner";
import { Preview } from "@/components/preview";
import { getSessionAttachmentsNextSessionuserprogress } from "../../../../../../../../../actions/getSessionAttachmentsNextSessionuserprogress";
import VideoPlayer from "./_components/video-player";
import { Separator } from "@/components/ui/separator";
import { File } from "lucide-react";

async function SessionIdPage({
  params: { courseId, chapterId, sessionId },
}: {
  params: { courseId: string; chapterId: string; sessionId: string };
}) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const {
    session,
    nextSession,
    attachments,

    userProgress,
    error,
  } = await getSessionAttachmentsNextSessionuserprogress({
    userId,
    courseId,
    chapterId,
    sessionId,
  });
  if (error) return <ErrorPage message={error.message} />;

  if (!session) return redirect("/");

  const completeOnEnd = !userProgress?.isCompleted;
  return (
    <div className="mt-4">
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this session." />
      )}

      <div
        className="
        flex flex-col max-w-4xl mx-auto pb-20"
      >
        <VideoPlayer
          session={session}
          completeOnEnd={completeOnEnd}
          courseId={courseId}
          nextSessionId={nextSession?.id ?? ""}
        />
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{session.title}</h2>
          </div>
          <Separator />
          <div>
            <Preview value={session.description ?? ""} />
          </div>
          {attachments.length > 0 && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => {
                  return (
                    <a
                      href={attachment.url}
                      target="_blank"
                      key={attachment.id}
                      className="
                flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                    >
                      <File className="mr-2"/>
                      <p className="line-clamp-1">{attachment.name}</p>
                    </a>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SessionIdPage;
