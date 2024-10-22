"use client";
import {Assignment } from "@prisma/client";
import React, { useState } from "react";

import { Grip, Pencil } from "lucide-react";
import PageLoader from "@/components/page-loader";
import { Preview } from "@/components/preview";

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
            className="ml-auto pr-2 flex items-center justify-between bg-sky-300/20 p-2 my-2"
            key={assignment.id}
          >
            <div className="flex items-center gap-x-2">
              <Grip className="h-5 w-5" />
            <Preview value={assignment.text}/>
            </div>

            <Pencil
              onClick={() => {
                setIsRedirecting(true);
                onEdit(assignment.id);
              }}
              className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
            />
          </div>
        );
      })}
    </div>
  );
}

export default SessionAssignmentList;
