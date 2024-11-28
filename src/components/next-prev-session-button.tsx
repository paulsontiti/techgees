import React from 'react'
import PrvSessionButton from './prv-session-button'
import NextSessionButton from './next-session-button'
import { Session } from '@prisma/client'

function NextPrevSessionButton({
    hasNextSession,hasPreviousSession,prevSessionUrl,nextSessionUrl
}:{
    hasPreviousSession:boolean,
    hasNextSession:boolean,prevSessionUrl:string,nextSessionUrl:string
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-4">
    {hasPreviousSession && <PrvSessionButton url={prevSessionUrl} />}
    {
      hasNextSession && <NextSessionButton url={nextSessionUrl} />

    }
  </div>
  )
}

export default NextPrevSessionButton