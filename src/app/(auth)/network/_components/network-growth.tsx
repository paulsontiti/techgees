"use client"

import {TrendingDown, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { bgNeutralColor2 } from "@/utils/colors"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import toast from "react-hot-toast"
import axios from "axios"
import { YearDropdownmenu } from "./year-dropdown"

type ChartDataType = { month: string, growth?: number };

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
const currentMonthIndex = new Date().getMonth();



const chartConfig = {
    growth: {
        label: "Growth",
        color: "#111587"//"hsl(var(--chart-1))",
    },
} satisfies ChartConfig

type GrowthType = {
    growth: number,
    month: number
}

export function MonthlyNetworkGrowth() {
    //earnings come from database
    const [growth, setGrowth] = useState<any[] | undefined>(undefined);
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear.toString());
    const [network,setNetwork] = useState<{year:number,month:number}[]>([]);


    useEffect(()=>{
        (
            async function getReferees(userId:string){
                try{
                    if(!userId){
                        const res = await axios.get(`/api/user/userId`);
                        userId = res.data;
                    }
                   
                    const res = await axios.post(`/api/user/network/${userId}`);
                    const referees:any[] = res.data && res.data.referees;
                    const len = referees ? referees.length : 0;

                    const groupableReferees = referees.map(
                        (referee)=> {
                            return {year: new Date(referee.createdAt).getFullYear(),
                            month: new Date(referee.createdAt).getMonth()}
                        
                    })
                  
                    setNetwork(prv => [...prv,...groupableReferees]);
                    if(Array.isArray(referees) && len > 0){
                        referees.map((referee)=>{
                            getReferees(referee.userId);
                        })
                    }
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )("")
        
    },[]);
    const chartData: ChartDataType[] = []
    const len = months.length;
    let currentMonthGrowth = 0;
    let prviousMonthGrowth = 0;
 if(network){
    const selectedYear = parseInt(year)
    const groupedByYear = Object.groupBy(network,({year}) => year)[selectedYear]
    
   if(groupedByYear){
    const groupedByMonth = Object.groupBy(groupedByYear!,({month}) => month);
    
    
    
    if (groupedByMonth) {
        currentMonthGrowth = groupedByMonth[currentMonthIndex]?.length || 0;
        prviousMonthGrowth = groupedByMonth[currentMonthIndex - 1]?.length || 0;

        for (let i = 0; i < len; i++) {
            const monthGrowthExist = groupedByMonth[i];

            chartData.push({

                month: months[i], growth: monthGrowthExist?.length
            })
        }
    }

   }
 }
    return (
        <section className="flex flex-col gap-4 bg-white w-full">
              <Card>
                    <CardHeader>
                        <CardTitle>Monthly Network Growth</CardTitle>
                        <CardDescription className="flex items-center gap-2">

                            <span>{`January ${currentMonthIndex !== 0 ?
                                `- ${months[currentMonthIndex]}` : ""}`}</span>

                            <YearDropdownmenu year={year} setYear={setYear} currentYear={currentYear} /></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="md:max-h-48 xl:max-h-96 min-w-full">
                            <BarChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    top: 20,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)
                                    }
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar dataKey="growth"

                                    fill="var(--color-growth)"
                                    radius={8}>
                                    <LabelList
                                        position="top"
                                        offset={12}
                                        className="fill-foreground"
                                        fontSize={12}
                                    />
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                      {!!currentMonthIndex && <>
                       {currentMonthEarning > prviousMonthEarning ?  <div className="flex gap-2 font-medium leading-none">
                            Trending up by {((currentMonthEarning - prviousMonthEarning)/prviousMonthEarning)*100}% this month <TrendingUp className="h-4 w-4" />
                        </div> :
                        
                        <div className="flex gap-2 font-medium leading-none">
                            Trending down by {((prviousMonthEarning - currentMonthEarning)/currentMonthEarning)*100}% this month <TrendingDown className="h-4 w-4" />
                        </div>
                        }
                      </>}
                        <div className="leading-none text-muted-foreground">

                            Showing total earnings for the last {currentMonthIndex + 1}
                            {`${currentMonthIndex > 0 ? " months" : " month"}`}

                        </div>
                    </CardFooter> */}
                </Card>
            {/* {earnings === undefined ? <Skeleton className={`${bgNeutralColor2} w-full h-72`} /> :
              
            } */}
     
        </section>
    )
}
