"use client";
import React, { useState } from "react";
import { StudentRealitySurveyForm } from "./student-reality-survey-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { bgNeutralColor, bgNeutralColor2 } from "@/utils/colors";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const sectionOne: QuestionsAndOptionsType[] = [
  {
    question: `How confident are you that your degree alone will
          secure you a job after graduation?
          (Linear Scale – 1 to 10)
        `,
    options: [
      "1 - Not confident",
      "2 - 4 - Confident",
      "5 - 7 - Very confident",
      "8 - 10 - Extremely confident",
    ],
  },
  {
    question: `Do you personally know any graduates who are still unemployed or underemployed?
          `,
    options: ["Yes", "No"],
  },
  {
    question: `What is your biggest fears about life after graduation?
          `,
    options: [
      "No job opportunities",
      "Unclear career path",
      "Lack of experience",
      "Financial struggles",
    ],
  },
  {
    question: `How often do you think about what you’ll do immediately after NYSC?
          `,
    options: ["Frequently", "Occasionally", "Rarely", "Never"],
  },
  {
    question: `How much do you believe the Nigerian job market favors people with extra skills outside their degree?
          `,
    options: ["A lot", "Not really", "Not at all", "I don't know"],
  },
];

const sectionTwo: QuestionsAndOptionsType[] = [
  {
    question: `Are you aware that tech (e.g., software development) allows people to work remotely for companies globally?
          `,
    options: ["Yes", "No"],
  },
  {
    question: `Do you know you can earn in foreign currencies as a software developer?
            `,
    options: ["Yes", "No"],
  },
  {
    question: `Do you know anyone earning money through software development, even without a tech degree?
            `,
    options: ["Yes", "No"],
  },
  {
    question: `Have you ever considered learning software development or tech-related skills?
            `,
    options: ["Yes", "No"],
  },
  {
    question: `What’s stopping you from learning a tech skill right now?
            `,
    options: [
      "Not interested",
      "No one to guide me",
      "I don’t have a laptop or good internet",
      "I think it’s too hard",
    ],
  },
];

const sectionThree: QuestionsAndOptionsType[] = [
  {
    question: `If you could learn software development with guidance and mentorship, would you be interested?
            `,
    options: ["Yes", "No"],
  },
  {
    question: `What would motivate you to take a software development course?
              `,
    options: [
      "Job guarantee or internship opportunity",
      "Flexibility to learn while in school",
      "Affordable cost",
      "Mentorship and community",
    ],
  },
  {
    question: `Can you spare an hour daily for the next two year to learn software development?
              `,
    options: ["Yes", "No"],
  },
  {
    question: `Are you willing to pay #500 naira daily for your studies?
              `,
    options: ["Yes", "No"],
  },
];

export type QuestionAndAnswerType = {
  question: string;
  answer: string;
};

export type QuestionsAndOptionsType = {
  question: string;
  options: string[];
};

function SurveyComponent() {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState<
    QuestionAndAnswerType[]
  >([]);

  const updateQuestionsAndAnswers = (questionAnswer: QuestionAndAnswerType) => {
    setQuestionsAndAnswers((current) => {
      if (current.find((item) => item.question === questionAnswer.question)) {
        current = current.filter(
          (item) => item.question !== questionAnswer.question
        );
      }
      return [...current, questionAnswer];
    });
  };

  const FormSchema = zod.object({
    firstname: zod.string().min(1,{
        message:"First name is required"
    }),
    lastname: zod.string().min(1,{
        message:"Last name is required"
    }),
    phone: zod.string().length(11,"Phone number is required and must be 11 characters"),
    whatsapp: zod.string().length(11,"WhatsApp number is required and must be 11 characters"),
  });

  const form = useForm<zod.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {isSubmitting,isValid} = form.formState

  const router = useRouter();

      const onSubmit = async(values:zod.infer<typeof FormSchema>)=>{
          try{
              await axios.post(`/api/survey`,values)
              toast.success("Thanks for your feedback")
              router.push("/")
          }catch(err:any){
              toast.error(err.message)
          }
      }

  return (
    <section>
      <section className="my-4">
        <h3 className="text-2xl font-bold">
          Section 1: Life After Graduation – Reality Check
        </h3>
        {sectionOne.map((qO) => (
          <StudentRealitySurveyForm
            key={Math.random()}
            qO={qO}
            qA={
              questionsAndAnswers.find((qa) => qa.question === qO.question) ||
              null
            }
            updateQuestionsAndAnswers={updateQuestionsAndAnswers}
          />
        ))}
      </section>
      <section className="my-4">
        <h3 className="text-2xl font-bold">
          Section 2: Awareness of Tech Opportunities
        </h3>
        {sectionTwo.map((qO) => (
          <StudentRealitySurveyForm
            key={Math.random()}
            qO={qO}
            qA={
              questionsAndAnswers.find((qa) => qa.question === qO.question) ||
              null
            }
            updateQuestionsAndAnswers={updateQuestionsAndAnswers}
          />
        ))}
      </section>
      <section className="my-4">
        <h3 className="text-2xl font-bold">
          Section 3: Exploring the Opportunity
        </h3>
        {sectionThree.map((qO) => (
          <StudentRealitySurveyForm
            key={Math.random()}
            qO={qO}
            qA={
              questionsAndAnswers.find((qa) => qa.question === qO.question) ||
              null
            }
            updateQuestionsAndAnswers={updateQuestionsAndAnswers}
          />
        ))}
      </section>

      <section className="p-4 bg-white">
      <div className={`${bgNeutralColor} p-4`}>
      <Form {...form}>
        <form className="w-full space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    
                    placeholder="e.g. John"
                    {...field}
                  />
                </FormControl>
                 <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    
                    placeholder="e.g. Doe"
                    {...field}
                  />
                </FormControl>
                 <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    
                    placeholder="e.g. +2348071234567"
                    {...field}
                  />
                </FormControl>
                 <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>WhatsApp number</FormLabel>
                <FormControl>
                  <Input
                    
                    placeholder="e.g. +2348071234567"
                    {...field}
                  />
                </FormControl>
                 <FormMessage/>
              </FormItem>
            )}
          />
<div className='flex items-center gap-x-2'>
                        
                        <Button
                        className="w-full"
                     type='submit'
                    disabled={!isValid || isSubmitting}
                     >Submit <Loader loading={isSubmitting}/></Button>
                 </div>
        </form>
      </Form>
      </div>
      </section>
    </section>
  );
}

export default SurveyComponent;
