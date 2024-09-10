import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import StatInfo from "./stat-info";
import { Preview } from "@/components/preview";

type StatInfoProps = {
  numberOfStudents: number;
  numberOfComments:number,
  numberOfRatings: number;
  likes: number;
  disLikes: number;
  description?: string;
  title?: string;
  rating: number;
};

export function StatInfoDialog({
  numberOfComments,
  numberOfStudents,
  numberOfRatings,
  likes,
  disLikes,
  description,
  title,rating
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
          numberOfRatings={numberOfRatings}
          likes={likes}
          disLikes={disLikes}
          rating={rating}
        />
      </DialogContent>
    </Dialog>
  );
}
