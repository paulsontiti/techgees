import { Preview } from '@/components/preview';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function QuestionAnswer({ question, sessionId }: 
    { question: string, sessionId: string
    }) {

    const [answer, setAnswer] = useState<string | undefined>(undefined);

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await axios.post(`/api/sessions/${sessionId}/session-questions/answer`,{question});
                    setAnswer(res.data);
                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        )()

    }, []);
    return (
        <div>
            {answer === undefined ? <Skeleton className='w-full h-72' /> :
                <Card>

                    <CardContent>
                        <div>
                            <strong>Answer:</strong>
                            {answer ? <Preview value={answer} /> : <p className='mt-2'>
                                No answer yet
                            </p>
                            }
                        </div></CardContent>
                </Card>
            }
        </div>
    )
}

export default QuestionAnswer