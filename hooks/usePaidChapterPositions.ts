"use client"
import axios from "axios";
import { useEffect, useState } from "react";

const usePaidChapterPositions = (courseId:string) => {
    const [paidPositions,setPaidPositions] = useState<number[]>([])

    useEffect(()=>{
        (
          async()=>{
            const paidPositionsRes = await axios.get(
            `/api/courses/${courseId}/paid-chapters-positions`
          );
          setPaidPositions(paidPositionsRes.data);
          }
        )()
    })

  return { paidPositions };
};

export default usePaidChapterPositions;