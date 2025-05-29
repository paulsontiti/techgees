'use client'

import { Copy } from "lucide-react";
import React, { useState } from "react";

function ReferralLink({ id, url }: { id: string; url: string }) {

  const [copied,setCopied] = useState(false);

  const referralLink = `${url}sign-up?refererId=${id}`;

 const onClick = ()=>{
  navigator.clipboard.writeText(referralLink)
  setCopied(true);

  setTimeout(()=>{
    setCopied(false);
  }, 2000);
 }
  return (
    <div
      className="mt-6 flex flex-col gap-y-2
    border bg-slate-100 rounded-md p-4"
    >
      <div className="font-medium">Referral link</div>
      <p className="text-sm mt-2">{referralLink}</p>
      <div className="flex gap-x-4">
        <Copy onClick={onClick}/>
        {
          copied && <span>Link copied</span>
        }
      </div>
    </div>
  );
}

export default ReferralLink;
