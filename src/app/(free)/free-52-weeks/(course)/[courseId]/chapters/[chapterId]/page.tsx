
import React from "react";
import { getChapter } from "../../../../../../../../actions/getChapter";
import ErrorPage from "@/components/error";
import { Preview } from "@/components/preview";

 async function ChapterIdPage({
  params: { chapterId }
}: {
  params: { chapterId: string }
}) {

const {chapter,error} = await getChapter(chapterId)

if(error) return <ErrorPage name={error.name}/>

  return (
    <div className="w-full flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold">{chapter?.title}</h2>
      <Preview value={chapter?.description || ""}/>
    </div>
  );
}

export default ChapterIdPage;
