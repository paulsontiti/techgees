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

import * as zod from "zod";

import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import toast from "react-hot-toast";

const formSchema = zod.object({
  purpose: zod
    .string()
    .min(100, {
      message: "Your purpose should be a minimum of 100 characters",
    })
    .max(500, {
      message: "Your purpose should be a maximum of 500 characters",
    }),
});

function PurposeForm({
  purpose,
  scholarshipStudentId,
}: {
  purpose?: string;
  scholarshipStudentId: string;
}) {
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purpose: purpose || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleEdit = () => {
    setEditing((prv) => !prv);
  };

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/scholarship-student/${scholarshipStudentId}`,
        values
      );
      toast.success("Purpose updated");
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
        Scholarship purpose
        <Button variant="ghost" onClick={toggleEdit}>
          {editing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit purpose
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
              name="purpose"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Scholarship purpose</FormLabel>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormDescription>
                      Tell why you want to take this course
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
        <div
          className={cn("text-sm mt-2", !purpose && "text-slate-500 italic")}
        >
          {purpose ? <Preview value={purpose} /> : "No purpose"}
        </div>
      )}
    </div>
  );
}

export default PurposeForm;
