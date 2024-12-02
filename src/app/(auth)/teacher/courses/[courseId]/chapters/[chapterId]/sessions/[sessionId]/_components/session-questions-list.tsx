"use client";
import { Question } from "@prisma/client";
import React, { useState } from "react";

import PageLoader from "@/components/page-loader";
import { Preview } from "@/components/preview";
import { bgPrimaryColor, textSecondaryColor } from "@/utils/colors";
import EditPencil from "@/components/edit-pencil";

interface SessionQuestionsListProps {
  questions: Question[];
  onEdit: (sessionId: string) => void;
}

function SessionQuestionsList({
  onEdit,
  questions,
}: SessionQuestionsListProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  return (
    <div className="relative">
      <PageLoader isloading={isRedirecting} label="redirecting...." />

      {questions.map((question) => {
        return (
          <div
            className="ml-auto pr-2 flex items-center justify-between bg-sky-300/20 p-2 my-2"
            key={question.id}
          >
               <div className="flex items-start gap-x-2 px-4">
             <Preview value={question?.question}/>
            <div className={`${bgPrimaryColor} ${textSecondaryColor} p-2 rounded-full`}>
            <EditPencil onClick={()=>{
               setIsRedirecting(true);
               onEdit(question.id);
            }}/>
           
            </div>
            </div>

           
          </div>
        );
      })}
    </div>
  );
}

export default SessionQuestionsList;
