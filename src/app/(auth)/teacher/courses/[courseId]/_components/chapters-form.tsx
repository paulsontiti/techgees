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

import { Chapter, Course } from "@prisma/client";
import { Pencil, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const formSchema = zod.object({
  title: zod.string().min(1, {
    message: "title is required",
  }),
});

function ChaptersForm({ course }: { course: Course & {chapters:Chapter[]} }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleCreating = () => {
    setIsCreating((prv) => !prv);
  };

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${course.id}/chapters`, values);
      toast.success("Chapter created");
      toggleCreating();
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
        Course chapters
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
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Chapter title </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='e.g. "Introduction to the course"'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What's the name of the chapter
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
      
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Create <Loader loading={isSubmitting} />
              </Button>
            
          </form>
        </Form>
      ) }
      {!isCreating && (
       <div>
             <div className={cn(
                "text-sm mt-2",
                !course.chapters.length && "text-slate-500 italic"
             )}>{!course.chapters.length && "No chapters"}
             {/* TODO: Add a list of chapters */}
             </div>
             <p className="text-xs text-muted-foreground mt-4">
                Drag and drop to reorder the chapters
             </p>

       </div>
      )}
    </div>
  );
}

export default ChaptersForm;
