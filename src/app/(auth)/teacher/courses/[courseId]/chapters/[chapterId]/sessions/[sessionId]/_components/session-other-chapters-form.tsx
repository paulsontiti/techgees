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

import { Session } from "@prisma/client";
import SessionOtherChapterList from "./session-other-chapter-list";
import { Input } from "@/components/ui/input";

const formSchema = zod.object({
  chapterId: zod.string().min(1, {
    message: "ChapterId is required",
  }),
  sessionPosition: zod.coerce.number({ message: "Position is required" }),
});

function SessionOtherChaptersForm({
  session,
  courseId,
}: {
  courseId: string;
  session: Session ;
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
        `/api/courses/${courseId}/chapters/${session.chapterId}/sessions/${session.id}/other-chapter`,
        values
      );
      toast.success("Chapter added");
      toggleCreating();
      router.refresh();
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const onEdit = (assignmentId: string) => {
    setisEditing(true);
    router.push(
      `/teacher/courses/${courseId}/chapters/${session.chapterId}/sessions/${session.id}/assignments/${assignmentId}`
    );
  };

  return (
    <div
      className="mt-6 relative
    border bg-slate-100 rounded-md p-4"
    >
      <PageLoader isloading={isEditing} label="re-directing..." />
      <div className="font-medium flex items-center justify-between">
        Session Other Chapters
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
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
              Add chapter <Loader loading={isSubmitting} />
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div>
          <div
            className={cn(
              "text-sm mt-2",
              Array.isArray(session.otherChapters) &&
                session.otherChapters.length === 0 &&
                "text-slate-500 italic"
            )}
          >
            {Array.isArray(session.otherChapters) &&
              session.otherChapters.length === 0 &&
              "No other chapters"}

            <SessionOtherChapterList
            courseId={courseId}
            sessionChapterId={session.chapterId}
            sessionId={session.id}
              onEdit={onEdit}
              otherChapters={session.otherChapters.map(chap => {
                return {
                  chapterId: JSON.parse(JSON.stringify(chap)).chapterId,
                  sessionPosition: JSON.parse(JSON.stringify(chap)).sessionPosition
                }
              })}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SessionOtherChaptersForm;
