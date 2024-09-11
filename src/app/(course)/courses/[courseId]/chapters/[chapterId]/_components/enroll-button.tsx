
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const CourseEnrollButton = (
    {courseId,label,chapterId}:{
        courseId:string,
        label:string,
        chapterId:string
    }
)=>{
  
    

    return <Button
    size="sm"
    className="w-full md:w-auto">
        <Link href={`/payment/${courseId}/chapters/${chapterId}`}>
        {label}
        </Link>
    </Button>
}