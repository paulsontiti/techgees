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

import { Scholarship } from "@prisma/client";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";

const formSchema = zod.object({
  price: zod.coerce.number().min(100, {
    message: "price is required",
  }),
});

function PriceForm({ scholarship }: { scholarship: Scholarship }) {
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: scholarship.price ?? 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleEdit = () => {
    setEditing((prv) => !prv);
  };

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/scholarships/${scholarship.id}`, values);
      toast.success("Scholarship updated");
      toggleEdit();
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <div
      className="mt-6 
    border bg-slate-100 rounded-md p-4"
    >
      <div className="font-medium flex items-center justify-between">
      Scholarship price
        <Button variant="ghost" onClick={toggleEdit}>
          {editing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>

      {editing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Scholarship price</FormLabel>
                    <FormControl>
                      <Input
                      type="number"
                      step={1000}
                        disabled={isSubmitting}
                        placeholder='e.g. "20000"'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>How much is your scholarship</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save <Loader loading={isSubmitting} />
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p
          className={cn(
            "text-sm mt-2",
            !scholarship.price && "text-slate-500 italic"
          )}
        >
          {scholarship.price !== null ? formatPrice(scholarship.price) : "No price"}
        </p>
      )}
    </div>
  );
}

export default PriceForm;
