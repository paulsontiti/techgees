'use client'
import { textPrimaryColor } from '@/utils/colors'
import React, { useEffect, useState } from 'react'
import EnrollButton from './enroll-button'
import { hasStartedACourse } from '../../../../../../actions/hasStartedACourse';
import { useCurrentUser } from '../../../../../../store/current-user-store';

function GetStarted({courseId}:{courseId:string}) {
    const [hasStarted,setHasStarted] = useState(false);

    useEffect(()=>{
        (
            async()=>{
                const {user} = useCurrentUser();
                const {startedCourse,error} = await hasStartedACourse(user?.userId ?? "",courseId);
                setHasStarted(startedCourse ?? false);
            }
        )()
    })
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
          <h2 className={`${textPrimaryColor}`}>Get started</h2>
          <EnrollButton courseId={courseId} label={`${hasStarted ? "Go to class" : "Start for free"}`} />

        </div>
  )
}

export default GetStarted