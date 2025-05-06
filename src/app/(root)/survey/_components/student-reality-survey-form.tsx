"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionAndAnswerType, QuestionsAndOptionsType } from "./survey-component";


const FormSchema = z.object({
  answer: z.string(),
});

export function StudentRealitySurveyForm({
  qO: { question, options },
  updateQuestionsAndAnswers,qA
}: {
  qO: QuestionsAndOptionsType,qA:QuestionAndAnswerType | null,
  updateQuestionsAndAnswers: (questionsAndOptions:QuestionAndAnswerType) => void;
}) {


    
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });


  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="text-xl">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {

                        const item = {
                            question,
                            answer:value
                        }
                    
                        updateQuestionsAndAnswers(item);
                        
                      }}
                      defaultValue={qA?.answer || ""}
                      className="flex flex-col space-y-1"
                    >
                      {options.map((option) => (
                        <FormItem
                          key={Math.random()}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
