import { LucideIcon } from 'lucide-react'
import React from 'react'
import { bgNeutralColor2 } from '@/utils/colors'
import IconBadge from '@/components/icon-badge'
import { Skeleton } from '@/components/ui/skeleton'

function NetworkInfoCard(
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
                   {numberOfItems === undefined ? <Skeleton className={`${bgNeutralColor2} w-full h-5`}/> 
                   :  <p className='text-gray-500 text-sm'>
                        {numberOfItems} 
                    </p>}
                </div>
            </div>
    )
}

export default NetworkInfoCard