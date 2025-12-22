
"use client"
import { Button } from "@/components/ui/button";
import { gradient } from "@/utils/colors";
import { useRouter } from "next/navigation";
import React from "react";

function CourseButton({
  courseId,
  userId,
}: {
  courseId: string;
  userId?: string;
}) {
  const router = useRouter();

  const goToCourse = (courseId: string) => {
    if (userId) {
      router.push(`/free-52-weeks/${courseId}`);
    } else {
      router.push(`/sign-in?redirectUrl=/free-52-weeks/${courseId}`);
    }
  };
  return (
    <Button
      className={`mt-4 ${gradient}`}
      onClick={() => {
        goToCourse(courseId);
      }}
    >
      Start for free
    </Button>
  );
}

export default CourseButton;
