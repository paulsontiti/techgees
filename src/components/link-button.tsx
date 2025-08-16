"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Loader from "./loader";
import { useRouter } from "next/navigation";

function LinkButton({ label, url }: { label: string; url: string }) {
  const [isRedirecting, setRedirecting] = useState(false);
  const router = useRouter();

  const onClick = () => {
    setRedirecting(true);
    router.push(url);
    setTimeout(()=>{
       setRedirecting(false)
    },2000)
   
  };

  return (
    <Button
      className="flex items-center justify-center gap-x-2 my-4"
      onClick={onClick}
      size="sm"
    >
      {label} <Loader loading={isRedirecting} />
    </Button>
  );
}

export default LinkButton;
