
import React from 'react'
import WalletBalanceCard from './_components/wallet-balance-card'
import AffiliateEarnings from './_components/affiliate-earnings'
import Incoming from './_components/incoming'
import Outgoing from './_components/outgoing'
import { OutInChart } from './_components/out-in-chart'
import { InflowOutflowTable } from './_components/inflow-outflow-table'
import { columns } from './_components/columns'
import EarningAd from '@/components/earning-ad'

 function WalletPage() {




  return (
   <section className='p-4 w-full'>
    <div className='grid lg:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-2'>
    <WalletBalanceCard/>
    <AffiliateEarnings/>
    <Incoming/>
    <Outgoing/>
    </div>
    <div className='my-8'>
        <OutInChart/>
        <EarningAd/>
    </div>
    <InflowOutflowTable columns={columns}/>
   </section>
  )
}

export default WalletPage