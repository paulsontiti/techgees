import Banner from '@/components/banner'
import LinkButton from '@/components/link-button'
import React from 'react'

function CompletedPreviousChapterTest({previousChapterAssignmentUrl}:{previousChapterAssignmentUrl:string}) {
  return (
    <div>
                      <Banner label="Previous chapter is not completed " />
                      <LinkButton label='Complete previous chapter assignments' url={previousChapterAssignmentUrl}/>
    </div>
  )
}

export default CompletedPreviousChapterTest