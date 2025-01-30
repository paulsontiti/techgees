import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import StatInfo from "./course-stat-info";
import { Preview } from "@/components/preview";
import ChapterStatInfo from "./chapter-stat-info";

type StatInfoProps = {
chapterId:string,
  description?: string;
  title?: string;
};

export function ChapterStatInfoDialog({
chapterId,
  description,
  title
}: StatInfoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="text-xs">
          More info
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full p-2 max-h-[50vh] overflow-scroll">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <Preview value={description ?? ""} />
          </DialogDescription>
        </DialogHeader>
        <ChapterStatInfo chapterId={chapterId}
        />
      </DialogContent>
    </Dialog>
  );
}
