"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Question } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SessionTestSoreQuestion, useSessionTestStore } from "../../../../../../../../../../../../../store/session-test-store"
import { Preview } from "@/components/preview"

const FormSchema = z.object({
  type: z.enum(["optionA", "optionB", "optionC", "optionD"], {
    required_error: "You need to select an option.",
  }),
})

export function QuestionItemForm({
  question
}: {
  question: Question
}) {

  const updateQuestions = useSessionTestStore((state) => state.updateQuestions)

  const options = JSON.parse(JSON.stringify(question.options))
  const { optionA, optionB, optionC, optionD } = options

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })



  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="text-xl">
          <Preview value={question.question}/>
        </CardTitle>

      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">

                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        const questionObj: SessionTestSoreQuestion = {
                          questionId: question.id,
                          questionAnswer: question.answer,
                          studentOption: options[value]

                        }

                        updateQuestions(questionObj)
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="optionA" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {optionA}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="optionB" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {optionB}
                        </FormLabel>
                      </FormItem>
                      {optionC && <>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="optionC" />
                          </FormControl>
                          <FormLabel className="font-normal"> {optionC}</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="optionD" />
                          </FormControl>
                          <FormLabel className="font-normal"> {optionD}</FormLabel>
                        </FormItem>
                      </>}

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
  )
}
