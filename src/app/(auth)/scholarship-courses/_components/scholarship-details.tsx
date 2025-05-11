"use client";

import dateCountdown from "@/lib/date-countdown";
import { ScholarshipStudents } from "@prisma/client";
import ScholarshipProcessForm from "./scholarship-process-form";

const ScholarshipDetails = ({
  registeredDate,
  numberOfReferees,
  scholarshipStudent,scholarshipId
}: {
  registeredDate: Date;
  numberOfReferees: number;
  scholarshipStudent: ScholarshipStudents;
  scholarshipId:string
}) => {


  const futureDate = new Date(registeredDate); // clone the date
  futureDate.setMonth(futureDate.getMonth() + 6);



  return (
    <div className="flex flex-col gap-4 p-4 my-4">
    <ScholarshipProcessForm scholarshipStudent={scholarshipStudent} scholarshipId={scholarshipId}/>
      <div>
        Referrees: <strong>{`${numberOfReferees}/10`}</strong>
      </div>
      <div>
        Remaining time :{" "}
        <strong>{dateCountdown(registeredDate, futureDate)}</strong>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
