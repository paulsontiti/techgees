
"use client"
import React, { useState } from 'react'

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';
import { leaderboards, LS } from './weeks';

type LSProfile = { name: "You"; avatarColor: "bg-indigo-500" };

function CommunityAside() {



        // ------------------ UseStates ------------------
        const [profile, setProfile] = useState(() =>
          loadLSProfile(LS.PROFILE, { name: "You", avatarColor: "bg-indigo-500" })
        );
        const [leaderboard, setLeaderboard] = useState(leaderboards);


        function loadLSProfile(key: string, fallback: LSProfile): LSProfile {
          try {
            const r = localStorage.getItem(key);
            return r ? JSON.parse(r) : fallback;
          } catch {
            return fallback;
          }
        }

  return (
      <aside className="flex-1">
        

          <Card >
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
              <div className="mt-3 flex gap-2">
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
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <h4 className="text-sm font-semibold">Full Leaderboard</h4>
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
  )
}

export default CommunityAside