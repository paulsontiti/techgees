"use client";

import { cn } from "@/lib/utils";
import { CheckCheck, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Chapter, Session, UserProgress } from "@prisma/client";
import Banner from "@/components/banner";
import { Preview } from "@/components/preview";


export function ScholarshipTermsAccordion({
terms
}: {terms:string}) {


  return (
    <Accordion type="single" collapsible className="w-full px-2">
      <AccordionItem value="item-1">

        <AccordionTrigger>Terms and conditions
        </AccordionTrigger>
        <AccordionContent className="ml-16">
        <Preview value={terms}/>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
