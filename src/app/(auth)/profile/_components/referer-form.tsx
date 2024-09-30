"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import ErrorPage from "@/components/error"
import Loader from "@/components/loader"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"



export function RefererForm({users,error,setEditing}:{
  users:{id:string,userName:string}[],
  error:Error | null,
  setEditing:React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const router = useRouter()

  if(error) return <ErrorPage name={error.name}/>

  const onSubmit = async()=>{
    const values = {refererId:value}
    try{
      setLoading(true)
        await axios.patch(`/api/user`,values)
        toast.success("Profile updated")
    
        router.refresh()
    }catch(err:any){
        toast.error(err.message)
    }finally{
      setLoading(false)
      setEditing(false)
    }
}

  return (
   <div>
     <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? users.find((user) => user.id === value)?.userName
            : "Select referer..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search referer..." />
          <CommandList>
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === user.userName ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user.userName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    <p className="text-xs my-2 p-2">
      {`Search for social media if that's how you got to know about us`}
    </p>

    <div className='flex items-center gap-x-2'>
                        
                           <Button
                        type='submit'
                       disabled={!value}
                        onClick={onSubmit}
                        >Save <Loader loading={loading}/></Button>
                    </div>
   </div>
  )
}
