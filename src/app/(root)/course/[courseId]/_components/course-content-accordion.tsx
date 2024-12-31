
import Link from "next/link";
import { bgNeutralColor, textPrimaryColor } from "@/utils/colors";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getCourseChaptersTitle } from "../../../../../../actions/getCourseChaptersTitle";
import ErrorPage from "@/components/error";


export async function CourseContentAccordion({
  courseId,courseTitle
}: {
  courseId:string,courseTitle:string
}) {

  const {chapterTitles,error} = await getCourseChaptersTitle(courseId);
  if(error) return <ErrorPage name={error.name}/>

  return (
 
    <Accordion
      type="single"
      collapsible
      className={`w-full my-2 bg-white ${textPrimaryColor}`}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-2">
        <Link href={`/course/${courseId}`}>{courseTitle}</Link>
        </AccordionTrigger>
        <AccordionContent>
          <div>
           {chapterTitles?.map((title)=>(
            <div key={title} className={`${bgNeutralColor} p-2 m-2`}>{title}</div>
           ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
