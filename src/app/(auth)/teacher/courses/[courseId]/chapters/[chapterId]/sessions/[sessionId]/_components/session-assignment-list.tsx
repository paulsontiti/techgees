"use client";
import {Assignment } from "@prisma/client";
import React, { useState } from "react";

import { Grip, Pencil } from "lucide-react";
import PageLoader from "@/components/page-loader";
import { Preview } from "@/components/preview";
import { bgPrimaryColor, textSecondaryColor } from "@/utils/colors";
import EditPencil from "@/components/edit-pencil";

interface SessionAssignmentListProps {
  assignments: Assignment[];
  onEdit: (courseId: string) => void;
}

function SessionAssignmentList({
  onEdit,
  assignments,
}: SessionAssignmentListProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);


  return (
    <div className="relative">
      <PageLoader isloading={isRedirecting} label="redirecting...." />

      {assignments.map((assignment) => {
        return (
          <div
            className="ml-auto pr-2 flex items-center justify-between bg-white p-2 my-2"
            key={assignment.id}
          >
            <div className="flex items-start gap-x-2 px-4">
             <Preview value={assignment.text}/>
            <div className={`${bgPrimaryColor} ${textSecondaryColor} p-2 rounded-full`}>
              <EditPencil  onClick={() => {
                setIsRedirecting(true);
                onEdit(assignment.id);
              }}/>
          
            </div>
            </div>

           
          </div>
        );
      })}
    </div>
  );
}

export default SessionAssignmentList;
