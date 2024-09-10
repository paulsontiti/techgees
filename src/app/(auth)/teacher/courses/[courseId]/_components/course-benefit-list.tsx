"use client";
import {CourseBenefit } from "@prisma/client";
import React, { useState } from "react";

import { Grip, Pencil } from "lucide-react";
import PageLoader from "@/components/page-loader";

interface CourseBenefitListProps {
  benefits: CourseBenefit[];
  onEdit: (courseId: string) => void;
}

function CourseBenefitList({
  onEdit,
  benefits,
}: CourseBenefitListProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);


  return (
    <div className="relative">
      <PageLoader isloading={isRedirecting} label="redirecting...." />

      {benefits.map((benefit) => {
        return (
          <div
            className="ml-auto pr-2 flex items-center justify-between bg-sky-300/20 p-2 my-2"
            key={benefit.id}
          >
            <div className="flex items-center gap-x-2">
              <Grip className="h-5 w-5" />
              {benefit.text}
            </div>

            <Pencil
              onClick={() => {
                setIsRedirecting(true);
                onEdit(benefit.id);
              }}
              className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
            />
          </div>
        );
      })}
    </div>
  );
}

export default CourseBenefitList;
