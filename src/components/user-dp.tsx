"use client"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import ErrorBoundary from "./error-boundary"

export function UserDp({ imgUrl, initials }: {
  imgUrl: string, initials: string
}) {
  return (
    <ErrorBoundary>
      <Avatar>
        <AvatarImage src={imgUrl} alt={initials} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </ErrorBoundary>
  )
}
