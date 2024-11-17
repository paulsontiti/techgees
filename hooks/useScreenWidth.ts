"use client"
import { useEffect, useState } from "react";

const useScreenWidth = () => {
    const [screenWidth,setWidth] = useState(0)

    useEffect(()=>{
     if(window){
       const width = window.innerWidth > 0 ? window.innerWidth : screen.width
       setWidth(width);
     }
    })

  return { screenWidth };
};

export default useScreenWidth;