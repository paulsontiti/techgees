import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { textPrimaryColor } from "@/utils/colors";
import { ChevronDown, Send, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation";
import { CiBank } from "react-icons/ci";

export function WalletActionDropdownMenu() {

    const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-4">Action <ChevronDown className="w-4 h-4"/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>Select action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-2">
          <DropdownMenuItem onClick={()=>{
            router.push('/search')
          }}>
            Buy course
            <DropdownMenuShortcut><ShoppingCart className={`w-4 h-4 ${textPrimaryColor}`}/></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Withdraw
            <DropdownMenuShortcut><CiBank className={`w-4 h-4 ${textPrimaryColor}`}/></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Transfer
            <DropdownMenuShortcut><Send className={`w-4 h-4 ${textPrimaryColor}`}/></DropdownMenuShortcut>
          </DropdownMenuItem>
         
        </DropdownMenuGroup>
      
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
