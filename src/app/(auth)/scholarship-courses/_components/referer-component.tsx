"use client";

import { Button } from "@/components/ui/button";

import React, {useEffect, useState } from "react";

import { Pencil } from "lucide-react";
import { RefererForm } from "./referer-form";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import axios from "axios";

function RefererComponent({refererId,
  scholarshipId,scholarshipStudentId,
 
}:{scholarshipId:string,
  refererId:string,scholarshipStudentId:string}) {
  const [editing, setEditing] = useState(false);
  const [referer,setReferer] = useState(undefined);

 
  useEffect(()=>{
    (
        async()=>{
      
            try{
                const res = await axios.get(`/api/user/${refererId}/user-name`);
             
                setReferer(res.data);
            }catch(err:any){
                toast.error(err.message)
            }
        }
    )()
  },[])

  const toggleEdit = () => {
  
    setEditing((prv) => !prv);
  };

if(referer === undefined) return <Skeleton className="w-full h-10"/> 


  return (
    <div
      className="mt-6 
    border bg-white rounded-md p-4"
    >
      <div className="font-medium flex items-center justify-between">
        Referer
<Button variant="ghost" onClick={toggleEdit}>
            {editing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit referer
              </>
            )}
          </Button>
       
      </div>
      {editing ? (
        <RefererForm
        
        toggleEdit={toggleEdit} scholarshipId={scholarshipId} scholarshipStudentId={scholarshipStudentId}/>
      ) : (
        <p className="text-sm mt-2">{referer}</p>
      )}
    </div>
  );
}

export default RefererComponent;
