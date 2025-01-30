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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import * as zod from "zod";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import toast from "react-hot-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import WalletBalance from "../../dashboard/_components/wallet-balance";
import { useRouter } from "next/navigation";


const formSchema = zod.object({
  amount: zod.coerce.number().min(100, {
    message: "amount is required",
  }),
});

function WalletPaymentForm({courseId,redirecturl}:{courseId:string,redirecturl:string}) {

  const [walletBalance,setWalletBalance] = useState(0);
  const router = useRouter();

  useEffect(()=>{
   (
    async()=>{
        try{
            const res = await axios.get(`/api/user/wallet/balance`);
            setWalletBalance(res.data);
        }catch(err:any){
            toast.error(err.message);
        }
    }
   )()
  },[]);

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      if(walletBalance >= values.amount){
        const res = await axios.post(`/api/user/wallet/buy-course`,{
            amount:values.amount,courseId
        });
        if(res.data === ""){
            toast.success(`Successful`,{duration:3000});
            router.push(redirecturl);
        }else{
            toast.error(res.data,{duration:3000});
        }
      }else{
        toast.error(`Insufficient balance`);
      }
       
    } catch (error: any) {
      toast.error('Error occurred: ' + error.message);
    
    } 
  };


  return (
    <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Buy from your wallet</CardTitle>
      <CardDescription>Pay for this course from your wallet balance</CardDescription>
    </CardHeader>
    <CardContent>
    <WalletBalance/>
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
                      placeholder='e.g. "50000"'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Note: The amount will be deducted from your wallet balance</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
           <CardFooter className="flex justify-between">
      <Button variant="outline">Cancel</Button>
      <Button className="flex items-center gap-x-2"
       type="submit" disabled={!isValid || isSubmitting}>
        Pay for this course
        <Loader loading={isSubmitting}/>
        </Button>
    </CardFooter>
          {/* <div className="flex items-center gap-x-2">
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Pay with Paystack <Loader loading={isSubmitting} />
            </Button>
          </div> */}
        </form>
      </Form>
    </CardContent>
   
  </Card>
  
  );
}

export default WalletPaymentForm;
