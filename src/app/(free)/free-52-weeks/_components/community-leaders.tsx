"use client"
import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trophy } from 'lucide-react';
import { motion } from "framer-motion";
import { Leaderboard } from './weeks';
import { UserDp } from '@/components/user-dp';

function CommunityLeaders({leaderBoard,userName}:{leaderBoard:Leaderboard[],userName:string}) {
  return (
     <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Top 10 Community Leaders Leaderboard</h4>
            <Trophy className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {leaderBoard.slice(0, 11).map((p, idx) => (
              <motion.li
                key={p.id}
                layout
                className={`flex items-center justify-between ${
                      p.userName === userName ? "bg-yellow-50" : ""
                    }`}
              >
                <div className="flex items-center gap-3">
                  <UserDp imgUrl={p.imageUrl} initials={p.userName[0]}/>
                  {/* <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                      idx === 0 ? "bg-yellow-400" : "bg-slate-400"
                    }`}
                  >
                    {p.userName[0]}
                  </div> */}
                  <div className="text-sm">{p.userName}</div>
                </div>
                <div className="text-sm font-medium">{p.points}</div>
              </motion.li>
            ))}
          </ol>
          {/* <div className="mt-3 text-xs text-slate-500">
            Connect to backend for real-time global leaderboard.
          </div> */}
        </CardContent>
      </Card>
  )
}

export default CommunityLeaders