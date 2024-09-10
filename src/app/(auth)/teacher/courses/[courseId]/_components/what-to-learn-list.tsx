"use client";
import {WhatToLearn } from "@prisma/client";
import React, { useState } from "react";

import { Grip, Pencil } from "lucide-react";
import PageLoader from "@/components/page-loader";

interface WhatToLearnListProps {
  whatToLearn: WhatToLearn[];
  onEdit: (courseId: string) => void;
}

function WhatToLearnList({
  onEdit,
  whatToLearn,
}: WhatToLearnListProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);


  return (
    <div className="relative">
      <PageLoader isloading={isRedirecting} label="redirecting...." />

      {whatToLearn.map((wtl) => {
        return (
          <div
            className="ml-auto pr-2 flex items-center justify-between bg-sky-300/20 p-2 my-2"
            key={wtl.id}
          >
            <div className="flex items-center gap-x-2">
              <Grip className="h-5 w-5" />
              {wtl.text}
            </div>

            <Pencil
              onClick={() => {
                setIsRedirecting(true);
                onEdit(wtl.id);
              }}
              className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
            />
          </div>
        );
      })}
    </div>
  );
}

export default WhatToLearnList;
