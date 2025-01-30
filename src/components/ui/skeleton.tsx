import { cn } from "@/lib/utils"
import { bgNeutralColor2 } from "@/utils/colors"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(`animate-pulse rounded-md bg-muted ${bgNeutralColor2}`, className)}
      {...props}
    />
  )
}

export { Skeleton }
