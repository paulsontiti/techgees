import React from 'react'
import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  ThreadsShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
import { Button } from './ui/button';

function ShareButton({url,fBHashtag}:{fBHashtag:string,url:string}) {
  return (
  <div className=' flex items-center gap-2 justify-center'>
    <FacebookShareButton 
   hashtag={fBHashtag}
   url={url}>
    <Button> Share on Facebook</Button>
   </FacebookShareButton>
<WhatsappShareButton 
   
   url={url}>
    <Button> Share on WhatsApp</Button>
   </WhatsappShareButton>
  </div>
  )
}

export default ShareButton