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
       
        <DialogContent className="min-w-[300px] md:min-w-[600px] overflow-y-scroll max-h-[600px]">
          <DialogHeader>
            <DialogTitle>Students Reality Check Survey</DialogTitle>
            <DialogDescription>
              Help us share this survey as it increases your chance of getting your fully funded scholarship.
              Share on Facebook and Whatsapp.
            
            </DialogDescription>
          </DialogHeader>
         <ShareButton url={url} fBHashtag="#theglobalgenius_scholarship"/>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
