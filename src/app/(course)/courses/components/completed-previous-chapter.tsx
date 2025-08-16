import Banner from '@/components/banner'
import LinkButton from '@/components/link-button'
import React from 'react'

function CompletedPreviousChapterTest({previousChapterTestUrl}:{previousChapterTestUrl:string}) {
  return (
    <div>
                      <Banner label="Previous chapter is not completed " />
                      <LinkButton label='Complete previous chapter test' url={previousChapterTestUrl}/>
    </div>
  )
}

export default CompletedPreviousChapterTest