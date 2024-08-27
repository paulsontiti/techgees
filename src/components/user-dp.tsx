import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function UserDp({imgUrl,initials}:{
    imgUrl:string,initials:string
  }) {
    return (
      <Avatar>
        <AvatarImage src={imgUrl} alt={initials} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    )
  }
  