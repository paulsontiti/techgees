"use client";
import { Question } from "@prisma/client";
import React, { useState } from "react";

import PageLoader from "@/components/page-loader";
import { Preview } from "@/components/preview";
import { bgPrimaryColor, textSecondaryColor } from "@/utils/colors";
import { Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

interface SessionQuestionsListProps {
  questions: Question[];
  onEdit: (questionId: string) => void;
}

function SessionQuestionsList({
  onEdit,
  questions,
}: SessionQuestionsListProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);

    const onDelete = async (courseId:string,chapterId:string,sessionId:string,questionId:string) => {
     
      try {
          await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/sessions/${sessionId}/questions/${questionId}`);
          toast.success("question deleted");
        } catch (err: any) {
          toast.error(err.message);
        }finally{
          setIsRedirecting(false)
        }
      
    
    };

  return (
    <div className="relative">
      <PageLoader isloading={isRedirecting} label="redirecting...." />

      {questions.map((question) => {
        return (
          <div
            className="ml-auto pr-2 flex items-center justify-between bg-sky-300/20 p-2 my-2"
            key={question.id}
          >
            <div className="flex flex-col items-start gap-x-2 px-4">
              <div
                className={`${bgPrimaryColor} ${textSecondaryColor} px-4 py-2 rounded-full flex gap-6`}
              >
                <Pencil
                  onClick={() => {
                    setIsRedirecting(true);
                    onEdit(question.id);
                  }}
                  className="w-3 h-3 cursor-pointer hover:opacity-75 transition"
                />
                <Trash
                  className="w-3 h-3 cursor-pointer hover:opacity-75 transition"
                  onClick={() => {
                    setIsRedirecting(true);
                    onDelete(question.courseId,question.chapterId,question.sessionId,question.id);
                  }}
                />
              </div>
              <Preview value={question?.question} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SessionQuestionsList;
