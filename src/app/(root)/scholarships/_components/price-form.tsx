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
import { redirect } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Preview } from "@/components/preview";

function ScholarshipPriceForm({
  email,
  scholarshipId,
  price,
  terms,
}: {
  email?: string;
  scholarshipId: string;
  price: number;
  terms: string;
}) {
  const [showTerms, setShowTerms] = useState(false);

  const formSchema = zod.object({
    amount: zod.coerce
      .number()
      .min(price, {
        message: `amount is required and must be ${price}`,
      })
      .max(price, {
        message: `amount is required and must be ${price}`,
      }),
    terms: zod.boolean().refine((val) => val === true, {
      message: "You must agree to terms and condition to proceed",
    }),
  });
  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      terms: false,
    },
  });

  if (!email) {
    toast.error(
      "No email found. You will be redirected to profile page. Please update your profile",
      { duration: 5000 }
    );
    return redirect("/profile");
  }

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      // Send a POST request to your server to create a Paystack checkout session
      const response = await axios.post(
        "/api/paystack/create-scholarship-checkout-session",
        {
          amount: values.amount,
          email,
          scholarshipId,
        }
      );

      const { authorizationUrl, reference } = response.data;

      // Open Paystack payment page in a new tab
      const paymentWindow = window.open(authorizationUrl);

      if (paymentWindow) {
        const interval = setInterval(() => {
          if (paymentWindow.closed) {
            window.location.href = `/scholarships/${scholarshipId}?reference=${reference}`;
            clearInterval(interval);
          }
        }, 1000);
      } else {
        toast.error("Failed to open payment window.Try again");
      }
    } catch (error: any) {
      toast.error("Error initializing payment: " + error.message);
      // Handle the error, e.g., show a user-friendly error message to the user.
    } finally {
    }
  };

  return (
    <div className="border bg-slate-100 rounded-md p-4 w-[350px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
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
                      placeholder={`e.g. ${price}`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Note: You will be paying to Black Wizards Technology
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex items-center gap-x-2 my-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                     <div>
                      <span className="text-blue-800 underline"
                      onClick={()=>{
                        setShowTerms(curr => !curr)}
                      }>
                        Agreed to terms and conditions
                      </span>
                    </div>
                  </div>
                   <div>
                    
                    {showTerms && <Preview value={terms} />}
                   </div>
                  <FormDescription>
                    You have to agree to the terms and conditions to proceed
                  </FormDescription>
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

export default ScholarshipPriceForm;
