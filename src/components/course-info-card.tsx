import { LucideIcon } from 'lucide-react'
import React from 'react'
import IconBadge from './icon-badge'
import { Skeleton } from './ui/skeleton'
import { bgNeutralColor2 } from '@/utils/colors'

function CourseInfoCard(
    {
        icon: Icon, label, numberOfItems, variant
    }: {
        icon: LucideIcon,
        label: string,
        numberOfItems?: number
        variant?: "default" | "success"
    }
) {
    return (
            <div className='
    border rounded-md flex items-center gap-x-2 p-3 bg-white'>

                <IconBadge
                    icon={Icon}
                    variant={variant}
                />
                <div>
                    <p className='font-medium'>
                        {label}
                    </p>
                   {numberOfItems === undefined ? <Skeleton className={`${bgNeutralColor2} w-full h-5`}/> :  <p className='text-gray-500 text-sm'>
                        {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
                    </p>}
                </div>
            </div>
    )
}

export default CourseInfoCard