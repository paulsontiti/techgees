"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import React from "react";

function CategoryDropdownItem({
  courseId,
  title,
}: {
  courseId: string;
  title: string;
}) {
  const router = useRouter();
  return (
    <DropdownMenuItem
      onClick={() => {
        router.push(`/course/${courseId}`);
      }}
    >
      <span className="text-xs">{title}</span>
    </DropdownMenuItem>
  );
}

export default CategoryDropdownItem;
