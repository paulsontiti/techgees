"use client";

import { Button } from "@/components/ui/button";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

import * as zod from "zod";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import FileUploadButton from "@/components/file-upload-button";
import Image from "next/image";

const formSchema = zod.object({
  schoolIdUrl: zod.string().min(1, {
    message: "Schoool Id  is required",
  }),
});

function SchoolIdForm({
  schoolIdUrl,
  scholarshipStudentId,
}: {
  schoolIdUrl?: string;
  scholarshipStudentId: string;
}) {
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => {
    setEditing((prv) => !prv);
  };

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/scholarship-student/${scholarshipStudentId}`,
        values
      );
      toast.success("School Id updated");
      toggleEdit();
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div
      className="mt-6 
    border bg-slate-100 rounded-md p-4"
    >
      <div className="font-medium flex items-center justify-between">
        School ID image
        <Button variant="ghost" onClick={toggleEdit}>
          {editing ? (
            <>Cancel</>
          ) : (
            <>
              {schoolIdUrl ? (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit image
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  add image
                </>
              )}
            </>
          )}
        </Button>
      </div>
      {editing ? (
        <>
          <FileUploadButton
            endpoint="schoolIDImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ schoolIdUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </>
      ) : (
        <>
          {schoolIdUrl ? (
            <div className="relative aspect-video mt-2">
              <Image
                fill
                src={schoolIdUrl ?? ""}
                alt={"School ID"}
                className="object-cover rounded-md"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-60 *:bg-slate-200 rounded-md">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SchoolIdForm;
