"use client"
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function PayButton({price}:{price:number}) {

  const pathname = usePathname()

   localStorage.setItem("redirectUrl", pathname);
  return (
    <Button
    //   onClick={(e: any) => {
    //     e.stopPropagation();
    //     setLoading(true);
    //   }}
      size="sm"
      className="w-full md:w-auto my-4"
    >
      <Link href={`/payment/?coursePrice=${price}`}>
        Pay for this course
      </Link>
    </Button>
  )
}

export default PayButton