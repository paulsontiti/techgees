"use client";
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
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import * as zod from "zod";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import toast from "react-hot-toast";

const formSchema = zod.object({
  amount: zod.coerce.number().min(10000, {
    message: "amount is required",
  }),
});

function PriceForm({email,courseId,chapterId}:{
    email:string,courseId:string,chapterId:string
}) {

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      // Send a POST request to your server to create a Paystack checkout session
      const response = await axios.post(
        '/api/paystack/create-checkout-session',
        {
         
          amount: values.amount,
          email,
          courseId
        }
      );

      const { authorizationUrl,reference } = response.data;
      

      // Open Paystack payment page in a new tab
      const paymentWindow = window.open(authorizationUrl);

      if (paymentWindow) {
        const interval = setInterval(() => {
          if (paymentWindow.closed) {
            window.location.href = `/courses/${courseId}/chapters/${chapterId}?reference=${reference}`;
            clearInterval(interval);
          }
        }, 1000);
      } else {
        toast.error('Failed to open payment window.');
      }
    } catch (error:any) {
      toast.error('Error initializing payment: '+ error.message);
      // Handle the error, e.g., show a user-friendly error message to the user.
    } finally {
    }
  };

 
  return (
    <div
      className="mt-6 flex items-center justify-center
    border bg-slate-100 rounded-md p-4 w-[350px]"
    >
   
        <Form {...form}>
          <form
             onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                      type="number"
                      step={10000}
                        disabled={isSubmitting}
                        placeholder='e.g. "20000"'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>How much do you want to pay</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex items-center gap-x-2">
            <Button type="submit" disabled={!isValid || isSubmitting}>
                Pay with Paystack <Loader loading={isSubmitting} />
              </Button>
            </div>
          </form>
        </Form>

    </div>
  );
}

export default PriceForm;
