"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ScholarshipDetails from "./scholarship-details";
import { formatDate } from "@/lib/format-date";
import { futureDateInMonths } from "@/lib/future-date-in-months";
import { ScholarshipStudents } from "@prisma/client";

export function ScholarshipDetailsDialog({
  registeredDate,numberOfReferees,
  scholarshipStudent,scholarshipId,
  scholarshipCount
}: {
  registeredDate: Date; numberOfReferees:number,
  scholarshipStudent:ScholarshipStudents,
  scholarshipId:string,scholarshipCount:number
}) {

const expiringDate = futureDateInMonths(registeredDate,6);



  return (
    <div className="w-10/12 my-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="tgg_link">
            Show Scholarship details
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[300px] md:min-w-[600px] overflow-y-scroll max-h-[600px]">
          <DialogHeader>
            <DialogTitle>Scholarship Details</DialogTitle>
            <DialogDescription>
              Make sure you meet up with the terms and conditions before
             <strong> {formatDate(expiringDate)}</strong>
            </DialogDescription>
          </DialogHeader>
          <ScholarshipDetails registeredDate={registeredDate}
           numberOfReferees={numberOfReferees} 
          scholarshipStudent={scholarshipStudent} 
          scholarshipId={scholarshipId}
          scholarshipCount={scholarshipCount}
          />
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
