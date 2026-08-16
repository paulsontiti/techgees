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

import { Question } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Editor } from "@/components/editor";

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

function QuestionEditForm({
  question,
  courseId,
  chapterId,
  sessionId,
}: {
  question: Question;
  courseId: string;
  chapterId: string;
  sessionId: string;
}) {
  const options = JSON.parse(JSON.stringify(question.options));

  const router = useRouter();

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: question.question,
      optionA: options.optionA,
      optionB: options.optionB,
      optionC: options.optionC,
      optionD: options.optionD,
      answer: question.answer,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    const isAnsValid =
      values.answer === values.optionA ||
      values.answer === values.optionB ||
      values.answer === values.optionC ||
      values.answer === values.optionD;
    if (isAnsValid) {
      try {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/sessions/${sessionId}/questions/${question.id}`,
          values,
        );
        toast.success("question edited");
        router.push(
          `/teacher/courses/${courseId}/chapters/${chapterId}/sessions/${sessionId}`,
        );
      } catch (err: any) {
        console.log(err);
        toast.error(err.message);
      }
    } else {
      return toast.error("Your answer must match an option");
    }
  };

  return (
    <div
      className="relative max-w-xl mx-auto
    border bg-slate-100 rounded-md p-4"
    >
      <Form {...form}>
        <FormDescription>Edit Question</FormDescription>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Question </FormLabel>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormDescription>{`What's the question`}</FormDescription>
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
            Edit <Loader loading={isSubmitting} />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default QuestionEditForm;
