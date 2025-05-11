"use client";

import { Button } from "@/components/ui/button";
import { ScholarshipStudents } from "@prisma/client";
import { CheckCheck } from "lucide-react";
import { useState } from "react";
import PurposeForm from "./purpose-form";
import SchoolIdForm from "./school-id-form";
import NationalIdForm from "./national-id-form";
import RefererComponent from "./referer-component";

function ScholarshipProcessForm({
  scholarshipStudent,scholarshipId
}: {
  scholarshipStudent: ScholarshipStudents;
  scholarshipId:string
}) {
  const [show, setShow] = useState(false);

  const requiredFields = [
    scholarshipStudent.purpose,
    scholarshipStudent.schoolIdUrl,
    scholarshipStudent.nationalIdUrl,
    scholarshipStudent.refererId
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  const toggleShow = ()=>{
    setShow((curr) => !curr);
  }

  return (
    <>
    
        <div className="">
            <h1 className="text-2xl font-medium">Scholarship Form setup</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-700">
              Completed fields {completionText}
            </span>
             {isComplete ? <CheckCheck className="text-emerald-900"/> : (
            <Button
              variant={"tgg_link"}
              onClick={toggleShow}
            >
              Complete form
            </Button>
          )}
          </div>
        </div>
         
        {show && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div>
                <RefererComponent scholarshipId={scholarshipId}
                refererId={scholarshipStudent.refererId || ""} scholarshipStudentId={scholarshipStudent.id}/>
            </div>
            <div>              
              <PurposeForm purpose={scholarshipStudent.purpose || ""} scholarshipStudentId={scholarshipStudent.id}/>
            </div>
            <div>
              <SchoolIdForm scholarshipStudentId={scholarshipStudent.id} schoolIdUrl={scholarshipStudent.schoolIdUrl || ""}/>

            </div>
                      <div>
              <NationalIdForm scholarshipStudentId={scholarshipStudent.id} 
              nationalIdUrl={scholarshipStudent.nationalIdUrl || ""}/>

            </div>
          </div>
        )}
    </>
  );
}

export default ScholarshipProcessForm;
