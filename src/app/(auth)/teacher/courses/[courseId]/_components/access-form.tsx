"use client";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import * as zod from "zod";

import {Course } from "@prisma/client";
import { Pencil } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const formSchema = zod.object({
  isFree: zod.boolean().default(false),
});

function AccessForm({ course }: { course: Course }) {
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!course.isFree,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleEdit = () => {
    setEditing((prv) => !prv);
  };

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${course.id}`,
        values
      );
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <div
      className="mt-6 
    border bg-slate-100 rounded-md p-4"
    >
      <div className="font-medium flex items-center justify-between">
        Course access
        <Button variant="ghost" onClick={toggleEdit}>
          {editing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit access
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
              name="isFree"
              render={({ field }) => {
                return (
                  <FormItem
                    className="flex flex-row items-start space-x-3 
    space-y-0 rounded-md border p-4"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Check this box if you want to make this course free for
                      preview
                    </FormDescription>
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
       <div className={cn(
        "text-sm mt-2",
        !course.isFree && "text-slate-500 italic"
       )}>
{course.isFree ? <>
This course is free for preview</> : (
    <>This course is not for free</>
)}
       </div>
      )}
    </div>
  );
}

export default AccessForm;
