"use client"
import React, { useState } from 'react'
import Income from './_components/income'
import { MonthlyEarnings } from './_components/monthly-earnings'
import NetworkComponent from './_components/network'
import Sales from './_components/sales'
import Commissions from './_components/commissions'
import { EarningsTable } from './_components/earnings-table'
import { columns } from './_components/columns'
import { SelectEarningNetworkDropdownMenu } from './_components/select-earning-network-dropdownmenu'
import EarningAd from '@/components/earning-ad'
import { MonthlyNetworkGrowth } from './_components/network-growth'
import { SelectEarningNetworkTableDropdownMenu } from './_components/select-earning-network-table'
import { NetworkTable } from './_components/network-table'
import { networkColumns } from './_components/network-column'

function NetworkPage() {
    const [selectedValue,setSelectedValue] = useState("Monthly Earnings");
    const [selectedTableValue,setSelectedTableValue] = useState("Recent Earnings");
    return (
        <section className='flex flex-col gap-8 items-center justify-center px-4'>
            <div className='w-full grid grid-cols-2 lg:grid-cols-4 p-4 gap-6 items-center justify-around rounded-3xl bg-white'>
                <Income/>

                <div className='flex flex-col items-center justify-center'>
                   <Sales/>
                </div>
              <Commissions/>
              <NetworkComponent/>

            </div>
           <div className='bg-white p-2 flex flex-col gap-4 w-full'>
           <SelectEarningNetworkDropdownMenu selectedValue={selectedValue}
             setSelectedValue={setSelectedValue}/>
            {selectedValue === "Monthly Earnings" ? <MonthlyEarnings/> : 
            <MonthlyNetworkGrowth/>
            }
           </div>

           <EarningAd/>

           <div className='bg-white p-2 flex flex-col gap-4 w-full'>
           <SelectEarningNetworkTableDropdownMenu selectedValue={selectedTableValue}
             setSelectedValue={setSelectedTableValue}/>
            {selectedTableValue === "Recent Earnings" ?  <EarningsTable columns={columns}/> : 
            <NetworkTable columns={networkColumns}/>
            }
           </div>
           
        </section>
    )
}

export default NetworkPage