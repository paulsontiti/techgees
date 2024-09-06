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

import StatInfo, { StatInfoProps } from "./stat-info";
import { Preview } from "@/components/preview";

export function StatInfoDialog({
  numberOfComments,
  numberOfStudents,
  likes,
  disLikes,
  description,
  title,
}: StatInfoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="text-xs">
          More info
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full p-2">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <Preview value={description ?? ""} />
          </DialogDescription>
        </DialogHeader>
        <StatInfo
          numberOfComments={numberOfComments}
          numberOfStudents={numberOfStudents}
          likes={likes}
          disLikes={disLikes}
          rating={0}
        />
      </DialogContent>
    </Dialog>
  );
}
