"use client";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import * as zod from "zod";

import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import PageLoader from "@/components/page-loader";

import { Chapter} from "@prisma/client";
import { Input } from "@/components/ui/input";
import ChapterOtherCoursesList from "./chapter-other-courses-list";

const formSchema = zod.object({
  courseId: zod.string().min(1, {
    message: "CourseId is required",
  }),
  chapterPosition: zod.coerce.number({ message: "Position is required" }),
});

function ChapterOtherCoursesForm({
  chapter,
  courseId,
}: {
  courseId: string;
  chapter: Chapter ;
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setisEditing] = useState(false);

  const router = useRouter();

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleCreating = () => {
    setIsCreating((prv) => !prv);
  };

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapter.id}/other-course`,
        values
      );
      toast.success("Course added");
      toggleCreating();
      router.refresh();
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div
      className="mt-6 relative
    border bg-slate-100 rounded-md p-4"
    >
      <PageLoader isloading={isEditing} label="re-directing..." />
      <div className="font-medium flex items-center justify-between">
        Chapter Other Courses
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a course
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Course Id</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='e.g. "adtyna12310"'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{`What's the course id`}</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="chapterPosition"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Chapter position</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={1}
                        disabled={isSubmitting}
                        placeholder='e.g. "10"'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{`What's the course chapter position`}</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit" disabled={!isValid || isSubmitting}>
              Add course <Loader loading={isSubmitting} />
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div>
          <div
            className={cn(
              "text-sm mt-2",
              Array.isArray(chapter.otherCourses) &&
                chapter.otherCourses.length === 0 &&
                "text-slate-500 italic"
            )}
          >
            {Array.isArray(chapter.otherCourses) &&
              chapter.otherCourses.length === 0 &&
              "No other courses"}

            <ChapterOtherCoursesList
            courseId={courseId}
            chapterId={chapter.id}
              otherCourses={chapter.otherCourses.map(chap => {
                return {
                  courseId: JSON.parse(JSON.stringify(chap)).courseId,
                  chapterPosition: JSON.parse(JSON.stringify(chap)).chapterPosition
                }
              })}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChapterOtherCoursesForm;
