"use client";
import React, { useState } from "react";

import EditPencil from "@/components/edit-pencil";
import { bgPrimaryColor, textSecondaryColor } from "@/utils/colors";

import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";

interface OtherCourseProps {
  otherCourse: {courseId:string,chapterPosition:number};
  courseId:string,
  chapterId:string,
}

const formSchema = zod.object({
  courseId: zod.string().min(1, {
    message: "CourseId is required",
  }),
  chapterPosition: zod.coerce.number({ message: "Position is required" }),
});

function OtherCourse({
  otherCourse,
  courseId,
  chapterId,
}: OtherCourseProps) {

    const [isEditing, setisEditing] = useState(false);
    const router = useRouter();

  
    const form = useForm<zod.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
       defaultValues:{
        courseId: otherCourse.courseId,
        chapterPosition: otherCourse.chapterPosition
        }
    });
  
    const { isSubmitting, isValid } = form.formState;
  
    const toggleEditing = () => {
      setisEditing((prv) => !prv);
    };
  
    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
      try {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/other-course`,
          values
        );
        toast.success("Course edited");
        toggleEditing();
        router.refresh();
      } catch (err: any) {
        console.log(err);
        toast.error(err.message);
      }
    };

  return (
    <div>
      

            <div className="flex items-start gap-x-2 px-4">
            <div>
              <p>CourseId: {otherCourse.courseId}</p>
              <p>Chapter position: {otherCourse.chapterPosition}</p>
            </div>
            <div className={`${bgPrimaryColor} ${textSecondaryColor} p-2 rounded-full`}>
              <EditPencil  onClick={() => {
               toggleEditing()
              }}/>
          
            </div>
            </div>

           {isEditing && (
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
              Edit course <Loader loading={isSubmitting} />
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}

export default OtherCourse;
