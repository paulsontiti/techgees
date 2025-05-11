"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Loader from "@/components/loader";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DBUser } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";

type UserType = { userId: string; userName: string };

export function RefererForm({
  toggleEdit,
  scholarshipId,
  scholarshipStudentId,
}: {
  toggleEdit: () => void;
 
  scholarshipId: string;
  scholarshipStudentId: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState<UserType[] | undefined>(undefined);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/scholarships/${scholarshipId}`);
        const students: UserType[] = res.data.map((student: DBUser) => {
          return { userId: student.userId, userName: student.userName };
        });

        setUsers(students);
      } catch (err: any) {
        toast.error(err.message);
      }
    })();
  }, []);

  const onSubmit = async () => {
    const values = { refererId: value };
    try {
      setLoading(true);
      await axios.patch(
        `/api/scholarship-student/${scholarshipStudentId}`,
        values
      );
      toast.success("Referer updated");
      
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
      toggleEdit();
    }
  };
  if (users === undefined) return <Skeleton className="w-full h-10" />;
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? users.find((user) => user.userId === value)?.userName
              : "Select referer..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search referer..." />
            <CommandList>
              <CommandEmpty>No user found.</CommandEmpty>
              <CommandGroup>
                {users.map((user) => (
                  <CommandItem
                    key={user.userId}
                    value={user.userId}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === user.userId ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {user.userName}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <p className="text-xs my-2 p-2">
        {`Search for social media if that's how you got to know about us`}
      </p>

      <div className="flex items-center gap-x-2">
        <Button type="submit" disabled={!value} onClick={onSubmit}>
          Save <Loader loading={loading} />
        </Button>
      </div>
    </div>
  );
}
