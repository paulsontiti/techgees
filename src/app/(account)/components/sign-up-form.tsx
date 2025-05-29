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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import * as zod from "zod";
import { useCurrentUser } from "../../../../store/current-user-store";
import { bgNeutralColor, textPrimaryColor } from "@/utils/colors";
import { Check, ChevronsUpDown, Eye, EyeOff } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ExternalReferers } from "@/utils/external-referers";

const formSchema = zod
  .object({
    refererId: zod.string().optional(),
    email: zod
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),

    password: zod.string().min(1, {
      message: "Password is required",
    }),
    confirmPassword: zod.string().min(1, {
      message: "Confirm Password is required",
    }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: "Password is not the same as confirm password",
        path: ["confirmPassword"],
      });
    }
  });

function SignUpForm({ referer }: { referer: string }) {
  const router = useRouter();
  const { updateUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  const [passwordType, setPasswordType] = useState("password");
  const [confirmasswordType, setConfirmPasswordType] = useState("password");

  const [open, setOpen] = React.useState(false);
  const [users, setUsers] =
    React.useState<{ id: string; userName: string }[]>(ExternalReferers);
  const [refererId, setRefererId] = React.useState(referer);

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      refererId: "",
    },
  });

  const {
    formState: { isSubmitting, isValid, errors },
  } = form;

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      values.refererId = refererId;

      const response = await axios.post(`/api/user/sign-up`, values);
      if (response.data.successful) {
        toast.success(response.data.message);
        updateUser(response.data.user.userId);
        router.push("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/user/usernames`);
        setUsers((prv) => [...prv, ...res.data]);
      } catch (err: any) {
        toast.error(err.message);
      }
    })();
  }, []);

  //check if the user exists. The referer coming from search params in the sinup page could be broken
  //ensure we actually have the user
  const user = users.find((user) => user.id === refererId);

  return (
    <div
      className={`mt-6 
      border ${bgNeutralColor} ${textPrimaryColor} rounded-md p-4 w-full`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="johndoe@gmail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>What is your email address</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between bg-white px-2">
                      <Input
                        disabled={isSubmitting}
                        {...field}
                        type={passwordType}
                        className="w-9/12 focus-visible:ring-white border-none"
                      />
                      {passwordType === "password" ? (
                        <Eye
                          className={`${textPrimaryColor} w-6 h-6`}
                          onClick={() => {
                            setPasswordType("text");
                          }}
                        />
                      ) : (
                        <EyeOff
                          className={`${textPrimaryColor} w-6 h-6`}
                          onClick={() => {
                            setPasswordType("password");
                          }}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>What is your password</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between bg-white px-2">
                      <Input
                        disabled={isSubmitting}
                        {...field}
                        type={confirmasswordType}
                        className="w-9/12 focus-visible:ring-white border-none"
                      />
                      {confirmasswordType === "password" ? (
                        <Eye
                          className={`${textPrimaryColor} w-6 h-6`}
                          onClick={() => {
                            setConfirmPasswordType("text");
                          }}
                        />
                      ) : (
                        <EyeOff
                          className={`${textPrimaryColor} w-6 h-6`}
                          onClick={() => {
                            setConfirmPasswordType("password");
                          }}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Please confirm your password
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <>
                  {/* if there is user then no need to show referer form */}
                  {referer && user ? (
                    <FormItem>
                      <FormLabel>Your Referer</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-between bg-white px-2">
                          <Input
                            disabled
                            {...field}
                            value={user.userName}
                            className="w-9/12 focus-visible:ring-white border-none"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        The Username of the person that introduced you to us
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  ) : (
                    <FormItem>
                      <FormLabel>Your Referer</FormLabel>
                      <FormControl>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-full justify-between"
                            >
                              {refererId
                                ? users.find((user) => user.id === refererId)
                                    ?.userName
                                : "Select referer..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search referer..." />
                              <CommandList>
                                <CommandEmpty>No user found.</CommandEmpty>
                                <CommandGroup>
                                  {users.map((user) => (
                                    <CommandItem
                                      key={user.id}
                                      value={user.id}
                                      onSelect={(currentValue) => {
                                        setRefererId(
                                          currentValue === refererId
                                            ? ""
                                            : currentValue
                                        );
                                        setOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          referer === user.id
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {user.userName}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormDescription>
                        The Username of the person that introduced you to us
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                </>
              );
            }}
          />

          <div className="flex flex-col items-center gap-x-2">
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full"
            >
              Continue <Loader loading={isSubmitting} />
            </Button>

            <div className="my-10 flex items-center">
              Already have an account?{" "}
              <Button
                type="button"
                variant="tgg_link"
                onClick={() => {
                  setIsLoading(true);
                  router.push("/sign-in");
                }}
              >
                Sign in <Loader loading={isLoading} />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default SignUpForm;
