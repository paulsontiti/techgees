import React from "react";
import ChapterProgress from "@/app/(course)/courses/single/[courseId]/chapters/[chapterId]/_components/chapter-progress";
import ChapterDetails from "@/app/(course)/courses/single/[courseId]/chapters/[chapterId]/_components/chapter-details";

 function ChapterIdPage({
    params: { childId, chapterId }
}: {
    params: { childId: string; chapterId: string };

}) {
  
    return (
        <div className="bg-white p-4" id="top">

<ChapterProgress chapterId={chapterId}/>
<ChapterDetails chapterId={chapterId} courseId={childId} isChildCourse={true}/>

            {/* <div
                className="
        flex flex-col max-w-4xl mx-auto pb-20"
            >


                <div>
                    <Preview value={chapter.description ?? ""} />
                </div>
                <div className="my-2 flex items-center justify-center gap-x-2 font-semibold italic bg-slate-100 py-4">
                    <div className="flex items-center gap-x-1 bg-sky-200/80 px-2 py-1  rounded-full">
                        {chapter.sessions.length} {`${chapter.sessions.length === 1 ? "session" : "sessions"}`}
                    </div>
                    <div className="flex items-center gap-x-1 bg-sky-200 px-2 py-1  rounded-full">
                        {duration} mins(total length)
                    </div>
                </div>


                <ChapterComments
                    chapterId={chapterId}
                />

                <Separator />
                {(userProgress === null &&
                    randonQuestions.length > 0) &&
                    <ChapterTest 
                    questions={randonQuestions} 
                    chapterId={chapter.id} 
                    chapterUrl={`/courses/single/${course.id}/chapters/${chapterId}`}
                    />}
                <Separator />

                {chapter.assignments.length > 0 && <>
                    <h2 className='text-xl my-2 font-bold'>Assignments</h2>
                    {
                        chapter.assignments.map((assignment) => {

                            return <AssignmentAccordion assignment={assignment} key={assignment.id} />
                        })
                    }
                </>}
            </div> */}
        </div>
    );
}

export default ChapterIdPage;
