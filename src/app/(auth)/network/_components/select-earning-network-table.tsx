"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export function SelectEarningNetworkTableDropdownMenu({selectedValue,setSelectedValue}:
    {selectedValue:string,setSelectedValue:React.Dispatch<React.SetStateAction<string>>}) {
    


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex items-center gap-2">
        <span>{selectedValue}<ChevronDown className="h-5 w-5"/></span> 
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel>{`Showing - ${selectedValue}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedValue} onValueChange={setSelectedValue}>
            <DropdownMenuRadioItem value="Recent Earnings" >
                Recent Earnings</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Network Additions" >
                Network Additions</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
