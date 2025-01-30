import { cn } from "@/lib/utils";
import { SessionQuestion } from "@prisma/client";
import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "../../../../../hooks/use-debounce";
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import * as zod from "zod"
import QuestionAnswer from "./question-answer";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PreviouslyAskedQuestions from "./previously-asked-questions";

function AskSessionQuestion({ sessionId }: { sessionId: string }) {
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const [searchedQuestions, setSearchedQuestions] =
        React.useState<SessionQuestion[]>([]);

    const debouncedValue = useDebounce(searchValue);

    useEffect(() => {
        (async () => {
            if (searchValue) {
                try {
                    const res = await axios.post(`/api/sessions/${sessionId}/session-questions/search`, { searchValue });
                    setSearchedQuestions(res.data);
                } catch (err: any) {
                    toast.error(err.message);
                }
            } else {
                setSearchedQuestions([]);
            }
        })();
    }, [debouncedValue, searchValue]);


    const formSchema = zod.object({
        question: zod.string().min(1, {
            message: "question is required"
        })
    })


    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: ""
        }
    })


    const { isSubmitting } = form.formState
    const router = useRouter();

    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        try {
            await axios.post(
                `/api/sessions/${sessionId}/session-questions`, values);
            toast.success("Your question was submitted successfully");
            router.refresh()
        } catch (err: any) {
            toast.error(err.message)
        }
    }
    return (
        <div className="relative my-4 bg-white p-4">

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4 mt-4'
                >
                    <FormField
                        control={form.control}
                        name='question'
                        render={({ field }) => {
                            return <FormItem>
                                <FormLabel className='w-full flex items-center justify-between'>

                                    <div className='w-full mb-2'> Ask a question</div>


                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
                                        <Input
                                            value={searchValue}
                                            onFocus={() => {
                                                setOpen(true);
                                            }}
                                           
                                            onChange={(e) => {
                                                form.setValue("question", e.target.value);
                                                setSearchValue(e.target.value);
                                            }}

                                            className="w-full pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                                            placeholder="Type your question"
                                        />
                                        {open && searchValue && searchedQuestions.length > 0 && (
                                            <Card className={cn(
                                                "hidden",
                                                open && "block bg-white z-10 absolute top-15 left-0 mt-4 px-2 w-full"
                                            )}>
                                                <CardContent className="mt-4">
                                                    <div className="flex justify-between">

                                                        <div className="mt-4">
                                                            {searchedQuestions.map((question) => {
                                                                return (
                                                                    <Dialog key={question.id}>
                                                                        <DialogTrigger asChild>
                                                                            <div
                                                                                className="text-xs text-primary p-2 hover:bg-slate-100 hover:cursor-pointer">
                                                                                {question.question}
                                                                            </div>
                                                                        </DialogTrigger>
                                                                        <DialogContent
                                                                        onCloseAutoFocus={()=>{setOpen(false)}}
                                                                         className="min-w-[300px] md:min-w-[600px] overflow-y-scroll max-h-[600px]">
                                                                            <DialogHeader>
                                                                                <DialogTitle> {question.question}</DialogTitle>
                                                                            </DialogHeader>
                                                                            <QuestionAnswer sessionId={sessionId}
                                                                             question={question.question} 
                                                                            //  setOpen={setOpen}
                                                                             />
                                                                            {/* <DialogFooter>

                                                                            </DialogFooter> */}
                                                                        </DialogContent>
                                                                    </Dialog>

                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>




                                        )}
                                    </div>
                                </FormControl>
                                <FormDescription>What are you confused about this session?</FormDescription>
                                <FormMessage />
                            </FormItem>
                        }}
                    />
                    <div className='flex items-center gap-x-2'>

                        <Button
                            type='submit'
                            disabled={!searchValue || isSubmitting}
                        >Send <Loader loading={isSubmitting} /></Button>
                    </div>
                </form>
            </Form>
                        <PreviouslyAskedQuestions sessionId={sessionId}/>
        </div>
    );
}

export default AskSessionQuestion;
