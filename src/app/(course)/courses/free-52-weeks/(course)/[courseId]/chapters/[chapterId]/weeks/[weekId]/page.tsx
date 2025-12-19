import MainSection from "@/app/(course)/courses/free-52-weeks/_components/main";
import React from "react";
import { getSessionWithAttachmentQuestionsAssignments } from "../../../../../../../../../../../actions/getSessionWithAttachmentQuestionsAssignments";
import { getUserName } from "../../../../../../../../../../../actions/getUserName";
import { getUser } from "../../../../../../../../../../../actions/getUser";

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

  return <MainSection tggUrl={tggUrl} week={session} courseId={courseId} user={{userName:user?.userName || "",
    imgUrl:user?.imageUrl || "",id: user?.id || ""}}/>;
}

export default Page;
