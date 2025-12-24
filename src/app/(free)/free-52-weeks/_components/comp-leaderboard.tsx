"use client"
import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

import { getISOWeek, startOfISOWeek, endOfISOWeek } from "@/lib/isoWeek";
import { Leaderboard } from './weeks';

function CompLeaderBoard({userName,sortedCompLeaderBoards}:{userName:string,sortedCompLeaderBoards:Leaderboard[]}) {
  return (
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
                  <th className='text-center'>#</th>
                  <th className='text-center'>Name</th>
                  <th className='text-center'>Points</th>
                </tr>
              </thead>
              <tbody>
                {sortedCompLeaderBoards.map((p, i) => (
                  <tr
                    key={p.id}
                    className={`${
                      p.userName === userName ? "bg-yellow-50" : ""
                    }`}
                  >
                    <td className='text-center'>{i + 1}</td>
                    <td className='text-center'>{p.userName}</td>
                    <td className='text-center'>{p.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
  )
}

export default CompLeaderBoard