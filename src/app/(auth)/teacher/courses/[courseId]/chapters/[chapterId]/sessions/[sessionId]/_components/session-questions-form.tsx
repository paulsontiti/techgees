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

import { Question,Session } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import PageLoader from "@/components/page-loader";
import SessionQuestionsList from "./session-questions-list";

const formSchema = zod.object({
  question: zod.string().min(1, {
    message: "Question is required",
  }),
  optionA: zod.string().min(1, {
    message: "OptionA is required",
  }),
  optionB: zod.string().min(1, {
    message: "OptionB is required",
  }),
  optionC: zod.optional(zod.string()),
  optionD: zod.optional(zod.string()),
  answer: zod.string().min(1, {
    message: "Answer is required",
  }),
 
});

function SessionQuestionsForm({ session,courseId }: 
    {courseId:string, session: Session & {questions:Question[]} }) {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing,setisEditing] = useState(false)

  const router = useRouter();

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      optionA:"",
      optionB:"",
      optionC:"",
      optionD:""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleCreating = () => {
    setIsCreating((prv) => !prv);
  };

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    const isAnsValid = values.answer === values.optionA || values.answer === values.optionB || values.answer === values.optionC ||
    values.answer === values.optionD
if(isAnsValid){
    try {
        await axios.post(`/api/courses/${courseId}/chapters/${session.chapterId}/sessions/${session.id}/questions`, values);
        toast.success("question created");
        toggleCreating();
        router.refresh();
      } catch (err: any) {
        console.log(err)
        toast.error(err.message);
      }
}else{
  return toast.error("Your answer must match an option")
}
    
  
  };

 

  const onEdit = (questionId:string)=>{
    setisEditing(true)
    router.push(`/teacher/courses/${courseId}/chapters/${session.chapterId}/sessions/${session.id}/questions/${questionId}`)
  }

  return ( 
    <div
      className="mt-6 relative
    border bg-slate-100 rounded-md p-4"
    >
      <PageLoader isloading={isEditing} label="re-directing..."/>
      <div className="font-medium flex items-center justify-between">
        {`Session questions(${session.questions.length})`}
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a question
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
              name="question"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Question </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='e.g. "3 + 4 is equal to"'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {`What's the question`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
                <FormField
              control={form.control}
              name="optionA"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Question option A </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='e.g. "163"'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {`What's the option A to the question`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="optionB"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Question option B </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='e.g. "16"'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {`What's the option B to the question`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="optionC"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Question option C title </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='e.g. "34"'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {`What's the option C to the question`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="optionD"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Question option D title </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='e.g. "23"'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {`What's the option D to the question`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Question answer</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='e.g. "7"'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {`What's the answer to the question`}
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
                !session.questions.length && "text-slate-500 italic"
             )}>{!session.questions.length && "No questions"}
            
            <SessionQuestionsList
              onEdit={onEdit}
              questions={session.questions ?? []}
            />
            <p className="text-slate-500 italic text-sm mt-4">Add at least ten questions</p>
             </div>
      

       </div>
      )}
    </div>
  );
}

export default SessionQuestionsForm;
