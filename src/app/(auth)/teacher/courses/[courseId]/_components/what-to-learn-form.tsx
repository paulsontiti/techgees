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
import { Input } from "@/components/ui/input";
import PageLoader from "@/components/page-loader";

import { WhatToLearn } from "@prisma/client";
import WhatToLearnList from "./what-to-learn-list";

const formSchema = zod.object({
  text: zod.string().min(1, {
    message: "Text is required",
  }),

});

function WhatToLearnForm({ courseId,whatToLearn }:
  { courseId:string,whatToLearn: WhatToLearn[] } ) {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setisEditing] = useState(false)

  const router = useRouter();

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleCreating = () => {
    setIsCreating((prv) => !prv);
  };

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {

    try {
      await axios.post(`/api/courses/${courseId}/what-to-learn`, values);
      toast.success("Text added");
      toggleCreating();
      router.refresh();
    } catch (err: any) {
      console.log(err)
      toast.error(err.message);
    }


  };



  const onEdit = (textId: string) => {
    setisEditing(true)
    router.push(`/teacher/courses/${courseId}/what-to-learn/${textId}`)
  }

  return (
    <div
      className="mt-6 relative
    border bg-slate-100 rounded-md p-4"
    >
      <PageLoader isloading={isEditing} label="re-directing..." />
      <div className="font-medium flex items-center justify-between">
What To Learn
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a text
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
              name="text"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>What to learn </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='e.g. "After the course you will be able to build ANY website you want."'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {`What to learn in this course`}
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
      )}
      {!isCreating && (
        <div>
          <div className={cn(
            "text-sm mt-2",
            Array.isArray(whatToLearn) && whatToLearn.length === 0 && "text-slate-500 italic"
          )}>{ Array.isArray(whatToLearn) && whatToLearn.length === 0 && "No text"}

            <WhatToLearnList
              onEdit={onEdit}
              whatToLearn={whatToLearn ?? []}
            />
          
          </div>


        </div>
      )}
    </div>
  );
}

export default WhatToLearnForm;
