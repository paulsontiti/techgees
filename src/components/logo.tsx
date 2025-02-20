"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React from 'react'

function Logo() {
const router = useRouter();

    return        <div className="items-center gap-8">
        <Link href="/" className="flex items-center gap-3 group relative">
          {/* Logo hover effect */}

          <div
            className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
              group-hover:opacity-100 transition-all duration-500 blur-xl"
          />

          {/* Logo */}
          {/* <div
            className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
            ring-white/10 group-hover:ring-white/20 transition-all"
          >
            <Blocks className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
          </div> */}

          <div className="flex flex-col">
            <span className="block text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
              The Global Genius
            </span>
            {/* <span className="block text-xs text-blue-400/60 font-medium">
              Online, Self-paced
            </span> */}
          </div>
        </Link>


      </div>
}

export default Logo