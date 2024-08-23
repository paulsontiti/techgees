"use client";

import { Button } from "@/components/ui/button";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

import * as zod from "zod";

import { Attachment, Session } from "@prisma/client";
import { File, Loader2, PlusCircle, Trash } from "lucide-react";
import FileUploadButton from "@/components/file-upload-button";

const formSchema = zod.object({
  url: zod.string(),
});

function SessionAttachmentForm({
  session,
  courseId,
}: {
  session: Session & { attachments: Attachment[] };
  courseId: string;
}) {
  const [editing, setEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const toggleEdit = () => {
    setEditing((prv) => !prv);
  };

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/chapters/${session.chapterId}/sessions/${session.id}/attachments`,
        values
      );
      toast.success("Attachment added");
      toggleEdit();
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const onDelete = async (id:string) => {
    try {
        setDeletingId(id)
      await axios.delete(
        `/api/courses/${courseId}/chapters/${session.chapterId}/sessions/${session.id}/attachments/${id}`
      );
      toast.success("Attachment deleted");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }finally{
        setDeletingId(null)
    }
  };

  return (
    <div
      className="mt-6 
    border bg-slate-100 rounded-md p-4"
    >
      <div className="font-medium flex items-center justify-between">
        Session attachments
        <Button variant="ghost" onClick={toggleEdit}>
          {editing ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {editing ? (
        <>
          <FileUploadButton
            endpoint="sessionAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need for this session
          </div>
        </>
      ) : (
        <>
          {!session.attachments.length ? (
            <>
              <p className="text-sm mt-2 text-slate-500 italic">
                No attachments yet
              </p>
            </>
          ) : (
            <div className="space-y-2">
              {session.attachments.map((attachment) => {
                return (
                  <div
                    className="
                    flex items-center justify-between p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                    key={attachment.id}
                  >
                   <div className="flex items-center">
                   <File className="h-4 w-4 mr-2 flex-shrink-0" />
                   <p className="text-xs line-clamp-1">{attachment.name}</p>
                   </div>
                    {
                        deletingId === attachment.id ? (
                            <div>
                                <Loader2 className="w-4 h-4 animate-spin"/>
                            </div>
                        ):
                        (
                            <button
                            onClick={()=>{
                                onDelete(attachment.id)
                            }}
                            className="
                            ml-auto hover:opacity-75 transition">
                            <Trash className="w-4 h-4"/>
                        </button>
                        )
                    }
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SessionAttachmentForm;
