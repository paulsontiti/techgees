"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useIsEnrolled = (courseId:string) => {
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);

  

 
  useEffect(() => {
   
    (
        async()=>{
            try{
                const res = await axios.get(`/api/courses/${courseId}/purchase-percentage`)
                //res.data returns purchase percentage
               
                setIsEnrolled(res.data === 100);
            }catch(err:any){
                toast.error(err.message)
            }
            
           
        }
    )()
    return () => {
       setIsEnrolled(isEnrolled)
    };
  }, []);

  return isEnrolled ;
};

export default useIsEnrolled;