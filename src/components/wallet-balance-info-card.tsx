import { LucideIcon } from 'lucide-react'
import React from 'react'
import IconBadge from './icon-badge'
import { Skeleton } from './ui/skeleton'
import { bgNeutralColor2 } from '@/utils/colors'
import { formatPrice } from '@/lib/format'

function WalletbalanceInfoCard(
    {
        icon: Icon, label, balance, variant
    }: {
        icon: LucideIcon,
        label: string,
        balance?: number
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
                   {balance === undefined ? <Skeleton className={`${bgNeutralColor2} w-full h-5`}/> :  <p className='text-gray-500 text-sm'>
                        {formatPrice(balance)}
                    </p>}
                </div>
            </div>
    )
}

export default WalletbalanceInfoCard