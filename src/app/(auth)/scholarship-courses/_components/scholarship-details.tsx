"use client";

import dateCountdown from "@/lib/date-countdown";
import { ScholarshipStudents } from "@prisma/client";
import ScholarshipProcessForm from "./scholarship-process-form";
import { futureDateInMonths } from "@/lib/future-date-in-months";

const ScholarshipDetails = ({
  registeredDate,
  numberOfReferees,
  scholarshipStudent,scholarshipId,scholarshipCount
}: {
  registeredDate: Date;
  numberOfReferees: number;
  scholarshipStudent: ScholarshipStudents;
  scholarshipId:string,
  scholarshipCount:number
}) => {

  return (
    <div className="flex flex-col gap-4 p-4 my-4">
    <ScholarshipProcessForm scholarshipStudent={scholarshipStudent} scholarshipId={scholarshipId}/>
      <div>
        Referrees: <strong>{`${numberOfReferees}/${scholarshipCount * 10}`}</strong>
      </div>
      <div>
        Remaining time :{" "}
        <strong>{dateCountdown(new Date(), futureDateInMonths(registeredDate,6))}</strong>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
