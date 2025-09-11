"use client"
import axios from "axios";
import { useEffect, useState } from "react";

const useChapterprogressPercentage = (courseId:string,chapterId:string) => {
    const [chapterprogressPercentage,setChapterprogressPercentage] = useState(0)

    useEffect(()=>{
        (
          async()=>{
            const res = await axios.get(
            `/api/courses/${courseId}/chapters/${chapterId}/progress`
          );
     
          setChapterprogressPercentage(res.data);
          }
        )()
    })

  return { chapterprogressPercentage };
};

export default useChapterprogressPercentage;