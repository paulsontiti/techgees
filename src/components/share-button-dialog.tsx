"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ShareButton from "./share-button";

export function ShareButtonDialog({url,open,closeDialog}:{url:string,open:boolean,closeDialog:()=>void}) {


  return (
    <div className="w-10/12 my-4">
      <Dialog open={open} onOpenChange={closeDialog}>
        <DialogTrigger asChild>
          <Button size="sm" variant="tgg_link">
            Show Scholarship details
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[300px] md:min-w-[600px] overflow-y-scroll max-h-[600px]">
          <DialogHeader>
            <DialogTitle>Scholarship Details</DialogTitle>
            <DialogDescription>
              Make sure you meet up with the terms and conditions before
            
            </DialogDescription>
          </DialogHeader>
         <ShareButton url={url} fBHashtag="#theglobalgenius_scholarship"/>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
