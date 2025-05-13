"use client"
import Loader from "@/components/loader"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatPrice } from "@/lib/format"
import { Purchase } from "@prisma/client"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export const SingleChapterEnrollButton = (
    {courseId,chapterId, showButton}:{
        courseId:string,
        chapterId:string,showButton:boolean
    }
)=>{
  
    const [loading,setLoading] = useState(false)
    const [purchasePercentage,setPurchasePercentage] = useState<number | undefined>(undefined);
    const [coursePrice,setCoursePrice] = useState<number | undefined>(undefined);
    const [coursePurchase,setCoursePurchase] = useState<Purchase | undefined>(undefined);
    const[isChapterLocked,setIsChapterLocked] = useState<boolean | undefined>(undefined);


    useEffect(()=>{
        (
            async()=>{
                try{
                    const courseRes = await axios.get(`/api/courses/${courseId}/price`);
                    setCoursePrice(courseRes.data);

                    const chapRes = await axios.get(`/api/chapters/${chapterId}/is-locked`);
                    setIsChapterLocked(chapRes.data);

                    const res = await axios.get(`/api/courses/${courseId}/purchase-percentage`);
                    setPurchasePercentage(res.data);

                    const coursePurchaseRes = await axios.get(`/api/courses/${courseId}/purchase`);
                    setCoursePurchase(coursePurchaseRes.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);

    if(!showButton) return null;

    if(coursePrice === undefined || isChapterLocked === undefined || 
        purchasePercentage === undefined || coursePurchase === undefined)
         return <Skeleton className="w-44 h-10"/>

         
    return <div>
         {/* {(isChapterLocked) && <> */}
                    {purchasePercentage !== 100 && (
                     
                      <Button
                      onClick={()=>{
                          setLoading(true)
                      }}
                      size="sm"
                      className="w-full md:w-auto">
                          <Link href={`/payment/single/${courseId}/chapters/${chapterId}`}>
                          {
                          purchasePercentage === 0
                            ? `Enroll for ${formatPrice(coursePrice)}`
                            : `Pay ${formatPrice(
                              ((100 - purchasePercentage) / 100) * 
                              (!!coursePurchase ? coursePurchase?.price! : coursePrice)
                            )}`
                        }
                          </Link>
                          <Loader loading={loading}/>
                      </Button>
                    )}
                    {/* </>} */}
    </div>
  
}