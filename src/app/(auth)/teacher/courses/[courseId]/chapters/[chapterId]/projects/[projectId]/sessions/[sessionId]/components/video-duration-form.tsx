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

import { ChapterProjectSession } from "@prisma/client";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const formSchema = zod.object({
  videoDuration: zod.coerce.number().min(1, {
    message: "Video Duration is required",
  }),
});

export type ChapterProjectSessionParamType ={session:ChapterProjectSession,courseId:string,chapterId:string}

function VideoDurationForm({session,courseId,chapterId}:ChapterProjectSessionParamType) {
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const ACTIONURL = `/api/courses/${courseId}/chapters/${chapterId}/projects/${session.chapterProjectId}/sessions/${session.id}`

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoDuration: session.videoDuration ?? 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleEdit = () => {
    setEditing((prv) => !prv);
  };

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      await axios.patch(ACTIONURL, values);
      toast.success("Session updated");
      toggleEdit();
      router.refresh();
    } catch (err: any) {
      toast.error("Something went wrong", err.message);
    }
  };
  return (
    <div
      className="mt-6 
    border bg-slate-100 rounded-md p-4"
    >
      <div className="font-medium flex items-center justify-between">
      Session video duration
        <Button variant="ghost" onClick={toggleEdit}>
          {editing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video duration
            </>
          )}
        </Button>
      </div>

      {editing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="videoDuration"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Session video duration</FormLabel>
                    <FormControl>
                      <Input
                      type="number"
                      step={1}
                        disabled={isSubmitting}
                        placeholder='e.g. "10"'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{`How long is this session's video`}</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save <Loader loading={isSubmitting} />
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p
          className={cn(
            "text-sm mt-2",
            !session.videoDuration && "text-slate-500 italic"
          )}
        >
          {session.videoDuration ? `${session.videoDuration} mins` : "No video duration"}
        </p>
      )}
    </div>
  );
}

export default VideoDurationForm;
