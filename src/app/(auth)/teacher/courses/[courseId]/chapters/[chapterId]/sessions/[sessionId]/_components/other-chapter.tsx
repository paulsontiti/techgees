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

interface OtherChapterProps {
  otherChapter: {chapterId:string,sessionPosition:number};
  courseId:string,
  sessionChapterId:string,
  sessionId:string
}

const formSchema = zod.object({
  chapterId: zod.string().min(1, {
    message: "ChapterId is required",
  }),
  sessionPosition: zod.coerce.number({ message: "Position is required" }),
});

function OtherChapter({
  otherChapter,
  courseId,
  sessionChapterId,
  sessionId
}: OtherChapterProps) {

    const [isEditing, setisEditing] = useState(false);
    const router = useRouter();

  
    const form = useForm<zod.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
       defaultValues:{
        chapterId: otherChapter.chapterId,
        sessionPosition: otherChapter.sessionPosition
        }
    });
  
    const { isSubmitting, isValid } = form.formState;
  
    const toggleEditing = () => {
      setisEditing((prv) => !prv);
    };
  
    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
      try {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${sessionChapterId}/sessions/${sessionId}/other-chapter`,
          values
        );
        toast.success("Chapter edited");
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
              <p>ChapterId: {otherChapter.chapterId}</p>
              <p>Session position: {otherChapter.sessionPosition}</p>
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
              name="chapterId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Chapter Id</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='e.g. "adtyna12310"'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{`What's the chapter id`}</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="sessionPosition"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Session position</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={1}
                        disabled={isSubmitting}
                        placeholder='e.g. "10"'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{`What's the chapter session position`}</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit" disabled={!isValid || isSubmitting}>
              Edit chapter <Loader loading={isSubmitting} />
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}

export default OtherChapter;
