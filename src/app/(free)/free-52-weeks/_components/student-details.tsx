"use client"
import React from 'react'

import { UserDp } from "@/components/user-dp";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { free52WeekShare } from "@/lib/socia-share";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DBUser } from '@prisma/client';

function StudentDetails({user,tggUrl}:{user:DBUser,tggUrl:string}) {
     const text = `Hi! I am learning Frontend Web Development for FREE — join me on this course for free!`;
  return (
      <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm">Signed in as </span>
                <span className="font-bold ml-1">
                  {user?.userName || user?.email}
                </span>
              </div>
              <UserDp
                imgUrl={user?.imageUrl || ""}
                initials={
                  user?.userName?.slice(0, 1).toUpperCase() ||
                  user?.email?.slice(0, 1).toUpperCase() ||
                  "GG"
                }
              />
              {/* <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${profile.avatarColor}`}
                  >
                    {profile.name[0]}
                  </div> */}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row xl:flex-col gap-1">
              <Button
                className=""
                size={"sm"}
                disabled
                //onClick={handleDownloadCertificate}
              >
                <Download className="w-4 h-4 mr-1" />
                Download Certificate
              </Button>
              <Button
                className=""
                size={"sm"}
                onClick={() =>
                  free52WeekShare({
                    platform: "wa",
                    userId: user?.id!,
                    tggUrl,
                    text,
                  })
                }
              >
                <Share2 className="w-4 h-4 mr-1" />
                Invite on WhatsApp
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() =>
                  free52WeekShare({
                    platform: "twitter",
                    userId: user?.id!,
                    tggUrl,
                    text,
                  })
                }
                className="px-2 py-1 rounded border text-sm"
              >
                Twitter
              </button>
              <button
                onClick={() =>
                  free52WeekShare({
                    platform: "facebook",
                    userId: user?.id!,
                    tggUrl,
                    text,
                  })
                }
                className="px-2 py-1 rounded border text-sm"
              >
                Facebook
              </button>
            </div>
          </CardContent>
        </Card>
  )
}

export default StudentDetails