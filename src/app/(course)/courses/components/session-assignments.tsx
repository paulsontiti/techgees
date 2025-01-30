"use client"
import { Skeleton } from '@/components/ui/skeleton';
import { Assignment } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import AssignmentAccordion from '../combo/[courseId]/child/[childId]/chapters/[chapterId]/sessions/[sessionId]/_components/assignment-accordion';
import toast from 'react-hot-toast';
import axios from 'axios';

function SessionAssignments({ sessionId }: { sessionId: string }) {
    const [assignments, setAssignments] = useState<Assignment[] | undefined>(undefined);

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await axios.get(`/api/sessions/${sessionId}/assignments`);
                    setAssignments(res.data);
                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        )()
    }, []);

    if (assignments === undefined) return <Skeleton className='w-full h-96 my-2' />
    if (!assignments.length) return null;
    return (
        <div>
            <h2 className='text-xl mt-8 font-bold'>Assignments</h2>
            {
                assignments.map((assignment, index) => {

                    return <AssignmentAccordion assignment={assignment} key={assignment.id} assignmentNumber={index + 1} />
                })
            }

        </div>
    )
}

export default SessionAssignments