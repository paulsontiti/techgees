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

import { ChapterProject } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import PageLoader from "@/components/page-loader";
import ProjectList from "./projects-list";

const formSchema = zod.object({
  title: zod.string().min(1, {
    message: "title is required",
  }),
});

type ProjectType = {
  chapterId:string,
  courseId:string,
  projects:ChapterProject[]
}

function ProjectForm({ chapterId,projects,courseId }: ProjectType) {
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
      await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/projects`, values);
      toast.success("Project created");
      toggleCreating();
      router.refresh();
    } catch (err: any) {
      console.log(err)
      toast.error("Something went wrong", err.message);
    }
  };

  const onReorder = async (
    reorderSessions:{projectId:string,position:number}[]
  )=>{
    try{
      setIsUpdating(true)

      await axios.put(`/api/courses/${courseId}
        /chapters/${chapterId}/sessions/reorder`,{
        reorderSessions
      })

      toast.success("Sessions reordered")
      router.refresh()
    }catch(err:any){

      toast.error(err.message,{duration:2000})
    }finally{
      setIsUpdating(false)
    }
  }

  const onEdit = (projectId:string)=>{
    router.push(`/teacher/courses/${courseId}/chapters/${chapterId}/projects/${projectId}`)
  }

  return ( 
    <div
      className="mt-6 relative
    border bg-slate-100 rounded-md p-4"
    >
      <PageLoader isloading={isUpdating} label="re-odering sessions..."/>
      <div className="font-medium flex items-center justify-between">
        Chapter projects
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a project
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
                    <FormLabel>Project title </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='e.g. "Building a Todo CLI app"'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {`What's the project about`}
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
                !projects.length && "text-slate-500 italic"
             )}>{!projects.length && "No projects"}
            
            <ProjectList
              onEdit={onEdit}
              onReorder={onReorder}
              items={projects ?? []}
            />
             </div>
          { !!projects.length &&    <p className="text-xs text-muted-foreground mt-4">
                Drag and drop to reorder the projects
             </p>}

       </div>
      )}
    </div>
  );
}

export default ProjectForm;
