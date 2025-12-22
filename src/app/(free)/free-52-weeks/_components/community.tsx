"use client";
import React, { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { leaderboards, LS } from "./weeks";
import Image from "next/image";
import { UserDp } from "@/components/user-dp";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { free52WeekShare } from "@/lib/socia-share";
import Badges from "./badges";
import { getISOWeek, startOfISOWeek, endOfISOWeek } from "@/lib/isoWeek";

function CommunityAside({
  user,
  tggUrl,
  descendantsCount,
}: {
  tggUrl: string;
  descendantsCount: number;
  user: { userName: string; imgUrl: string; id: string };
}) {
  // ------------------ UseStates ------------------

  const [profile, setProfile] = useState({
    name: user.userName,
    avatarColor: "bg-indigo-500",
  });

  const [leaderboard, setLeaderboard] = useState(leaderboards);
  const text = `Hi! I am learning Frontend Web Development for FREE — join me on this course for free!`

  return (
    <div className="flex flex-col xl:flex-row">
      <aside className="w-full xl:w-1/2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm">Signed in as </span>
                <span className="font-bold ml-1">{profile.name}</span>
              </div>
              <UserDp imgUrl={user.imgUrl} initials={user.userName[0]} />
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
                    platform:"wa",
                    userId:user.id,
                    tggUrl,
                    text}
                  )
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
                    platform:"twitter",
                    userId:user.id,
                    tggUrl,
                    text}
                  )
                }
                className="px-2 py-1 rounded border text-sm"
              >
                Twitter
              </button>
              <button
                onClick={() =>
                  free52WeekShare({
                    platform:"facebook",
                    userId:user.id,
                    tggUrl,
                    text}
                  )
                }
                className="px-2 py-1 rounded border text-sm"
              >
                Facebook
              </button>
            </div>
          </CardContent>
        </Card>
        <Badges descendantsCount={descendantsCount} />
        {/* <Card className="mt-4">
              <CardHeader>
                <h5 className="text-sm font-medium">Quick Analytics</h5>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Client-side: watch events, quiz events. Pro tip: connect
                  server analytics for cohort insights and retention funnels.
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <h5 className="text-sm font-medium">Extras</h5>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  Planned: SCORM/xAPI export, SSO (OAuth), subtitle
                  auto-generation, SCORM packaging, offline video (PWA & service
                  worker).
                </div>
              </CardContent>
            </Card> */}
      </aside>
      <aside className="w-full xl:w-1/2">
        {/* <Card >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">CommunityAside</h4>
                <Users className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                Invite friends, create study groups, or open cohort chats
                (integrate with a chat provider like Pusher or Firebase for
                scale).
              </div>
              <div className="mt-4 flex xl:flex-col gap-2">
                <Button 
                // onClick={() => share("wa")}
                    >Invite on WhatsApp</Button>
                <Button
                //   onClick={() => {
                //     navigator.clipboard?.writeText(window.location.href);
                //     showToast("Link copied");
                //   }}
                >
                  Copy invite link
                </Button>
              </div>
            </CardContent>
          </Card> */}

        <Card className="mt-4 w-full">
          <Image
            src="/assets/weekly.png"
            alt="Tech community building weekly challenge image"
            className="min-w-full h-auto"
            width={300}
            height={400}
          />
          <CardHeader>
            <h4 className="text-sm font-semibold">
              Community Building Challenge Leaderboard -{" "}
              <span>
                Week {getISOWeek()} of {new Date().getFullYear()}
              </span>
            </h4>
            <div>{`(${startOfISOWeek(
              new Date()
            ).toDateString()} - ${endOfISOWeek(
              new Date()
            ).toDateString()})`}</div>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th>#</th>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((p, i) => (
                  <tr
                    key={p.id}
                    className={`${
                      p.name === profile.name ? "bg-yellow-50" : ""
                    }`}
                  >
                    <td>{i + 1}</td>
                    <td>{p.name}</td>
                    <td>{p.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

export default CommunityAside;
