import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

const BADGES = [
  {
    id: "p1",
    name: "Global Genius",
    threshold: 1,
    color: "bg-indigo-600  border-indigo-700 text-white",
    svg: (
      <svg
        className="w-10 h-10 text-indigo-300"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="60" y="65" width="80" height="60" rx="6" fill="white" />
        <line
          x1="100"
          y1="65"
          x2="100"
          y2="125"
          stroke="#4F46E5"
          stroke-width="4"
        />
        <path
          d="M80 115l10 10 25-25"
          fill="none"
          stroke="#4F46E5"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "p2",
    name: "Bronze Spark",
    threshold: 5,
    color: "bg-amber-700 text-yellow-300 border-amber-800",
    svg: (
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
      >
        {/* <circle cx="100" cy="100" r="95" className="fill w-5 h-5" /> */}
        <polygon
          points="90,40 110,40 100,80 130,80 70,160 90,95 60,95"
          fill="white"
        />
      </svg>
    ),
  },
  {
    id: "p3",
    name: "Silver Builder",
    threshold: 25,
    color: "bg-gray-400 text-gray-100 border-gray-500",
    svg: (
      <svg
        className="w-10 h-10 text-gray-400"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <circle cx="100" cy="100" r="95"/> */}
        <path d="M60 80l40 40 30-30-40-40z" fill="white" />
      </svg>
    ),
  },
  {
    id: "b4",
    name: "Gold Influencer",
    threshold: 125,
    color: "bg-yellow-500 text-white border-yellow-600",
    svg: (
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
      >
        <polygon
          points="100,40 112,80 155,80 120,105 135,150 100,125 65,150 80,105 45,80 88,80"
          fill="white"
        />
      </svg>
    ),
  },
  {
    id: "b5",
    name: "Platinum Ambassador",
    threshold: 625,
    color: "bg-sky-500 text-sky-200 border-sky-600",
    svg: (
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
      >
        <path d="M50 120h100l-10-40-30 25-30-25-30 25z" fill="white" />
      </svg>
    ),
  },
  {
    id: "b6",
    name: "Diamond Legend",
    threshold: 3125,
    color: "bg-cyan-600 text-cyan-200 border-cyan-700",
    svg: (
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
      >
        <polygon points="100,40 140,80 100,160 60,80" fill="white" />
      </svg>
    ),
  },
  {
    id: "b7",
    name: "Mythic Titan",
    threshold: 15625,
    color: "bg-violet-700 text-violet-300 border-violet-800",
    svg: (
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
      >
        <path
          d="M70 60l60 80M130 60l-60 80"
          stroke="white"
          stroke-width="10"
          stroke-linecap="round"
        />
      </svg>
    ),
  },
  {
    id: "b8",
    name: "Elite Vanguard",
    threshold: 78125,
    color: "bg-blue-700 text-blue-300 border-blue-800",
    svg: (
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
      >
        <path d="M100 40l30 60-30 20-30-20z" fill="white" />
        <circle cx="100" cy="110" r="6" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "b9",
    name: "Supreme Dominator",
    threshold: 390625,
    color: "bg-red-700 text-red-300 border-red-800",
    svg: (
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
      >
        <circle cx="100" cy="90" r="30" fill="white" />
        <rect x="80" y="120" width="40" height="25" fill="white" />
      </svg>
    ),
  },
  {
    id: "b10",
    name: "Ultimate Apex",
    threshold: 1953125,
    color: "bg-green-700 text-green-300 border-green-800",
    svg: (
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
      >
        <polygon points="40,140 100,50 160,140" fill="white" />
      </svg>
    ),
  },
  {
    id: "b11",
    name: "Eternal Immortal",
    threshold: 9765625,
    color: "bg-neutral-900 text-yellow-300 border-yellow-700",
    svg: (
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
      >
        <path
          d="M60 100c0-20 40-20 40 0s40 20 40 0"
          fill="none"
          stroke="white"
          stroke-width="10"
        />
      </svg>
    ),
  },
];
function Badges({ descendantsCount }: { descendantsCount: number }) {
  //   const unlockedBadges = useMemo(
  //     () => BADGES.filter((b) => completedCount >= b.threshold),
  //     [completedCount]
  //   );
  return (
    <Card className="w-full">
      <CardHeader>
        <h4 className="text-sm font-semibold">Community Building Badges</h4>
        <div className="flex gap-2">
          <span>Community Count: </span>
          <span className="font-bold">{descendantsCount}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {BADGES.map((b) => {
            const unlocked = descendantsCount >= b.threshold;
            return (
              <motion.div
                key={b.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`p-2 rounded-md border w-full ${b.color} 
                  
                        `}
              >
                <div className={`flex items-start gap-2 `}>
                  <div>{b.svg}</div>
                  {/* <b.svg className="w-5 h-5" /> */}
                  <div>
                    <div className="text-sm font-medium">{b.name}</div>
                    <div className="text-xs">
                      {unlocked
                        ? `Unlocked — ${b.threshold} ${
                            b.threshold === 1 ? "member" : "members"
                          }`
                        : `Locked — ${b.threshold} ${
                            b.threshold === 1 ? "member" : "members"
                          }`}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default Badges;
