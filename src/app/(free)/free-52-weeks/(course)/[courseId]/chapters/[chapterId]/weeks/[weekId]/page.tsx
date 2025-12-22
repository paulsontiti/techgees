
import React from "react";
import { getSessionWithAttachmentQuestionsAssignments } from "../../../../../../../../../../actions/getSessionWithAttachmentQuestionsAssignments";

import MainSection from "@/app/(free)/free-52-weeks/_components/main";
import { getUser } from "../../../../../../../../../../actions/getUser";
import { getUserSessionProgress } from "../../../../../../../../../../actions/getUserSessionProgress";

async function Page({
  params: { weekId, chapterId,courseId },
}: {
  params: { weekId: string; chapterId: string,courseId:string};
}) {
  const { session, error } = await getSessionWithAttachmentQuestionsAssignments(
    weekId,
    chapterId
  );

const tggUrl = process.env.WEB_URL!
 const {user} = await getUser() 

 const {userHasCompletedThisSession} = await getUserSessionProgress(user?.userId || "",session?.id || "")


  return <MainSection
  userProgress={userHasCompletedThisSession}
  tggUrl={tggUrl} week={session} courseId={courseId} userId={user?.id || ""}/>;
}

export default Page;
