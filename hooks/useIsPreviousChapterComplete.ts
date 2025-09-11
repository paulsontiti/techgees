"use client"
import axios from "axios";
import { useEffect, useState } from "react";

const useIsPreviousChapterComplete = (courseId:string,chapterId:string) => {
    const [IsPreviousChapterComplete,setIsPreviousChapterComplete] = useState(false)

    useEffect(()=>{
        (
          async()=>{
            const res = await axios.get(
            `/api/courses/${courseId}/chapters/${chapterId}/previous-chapter-progress`
          );
     
          if(res.data) setIsPreviousChapterComplete(res.data.isCompleted);
          }
        )()
    })

  return { IsPreviousChapterComplete };
};

export default useIsPreviousChapterComplete;