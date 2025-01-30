"use client"

import { TrendingUp } from "lucide-react"
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
import { YearDropdownmenu } from "../../network/_components/year-dropdown"
import { useEffect, useState } from "react"
import { months } from "../../network/_components/monthly-earnings"
import axios from "axios"
import toast from "react-hot-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { bgPrimaryColor, bgSecondaryColor } from "@/utils/colors"


type ChartDataType = { month: string, incoming?: number, outgoing?: number };
const chartConfig = {
    incoming: {
        label: "Incoming",
        color: "#111587"//"hsl(var(--chart-1))",
    },
    outgoing: {
        label: "Outgoing",
        color: "#f0fe03"//"hsl(var(--chart-2))",
    },
} satisfies ChartConfig

type InOutType = {
    _sum: { amount: number },
    month: number
}

export function OutInChart() {
    const currentMonthIndex = new Date().getMonth();
    //incomings come from database
    const [incomings, setIncomings] = useState<InOutType[] | undefined>(undefined);
    //outgoings come from database
    const [outgoings, setOutgoings] = useState<InOutType[] | undefined>(undefined);
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear.toString());


    useEffect(() => {
        (
            async () => {
                try {
                  
                    const res = await axios.get(`/api/user/wallet/incoming/${year}`);
                    setIncomings(res.data);

                    const outRes = await axios.get(`/api/user/wallet/outgoing/${year}`);
                    setOutgoings(outRes.data);

                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        )()
    }, [year])
    const chartData: ChartDataType[] = []
    const len = months.length;
    let currentMonthIncoming = 0;
    let prviousMonthIncoming = 0;

    let currentMonthOutgoing = 0;
    let prviousMonthOutgoing = 0;

    
    if (incomings && outgoings) {
        currentMonthIncoming = incomings.find(incoming => incoming.month === currentMonthIndex)?._sum.amount || 0;
        prviousMonthIncoming = incomings.find(incoming => incoming.month === currentMonthIndex - 1)?._sum.amount || 0;

        currentMonthOutgoing = outgoings.find(incoming => incoming.month === currentMonthIndex)?._sum.amount || 0;
        prviousMonthOutgoing = outgoings.find(incoming => incoming.month === currentMonthIndex - 1)?._sum.amount || 0;

        for (let i = 0; i < len; i++) {
            const monthIncomingExist = incomings.find(incoming => incoming.month === i);
            const monthoutgoingExist = outgoings.find(incoming => incoming.month === i);

            chartData.push({

                month: months[i], incoming: monthIncomingExist?._sum.amount, outgoing: monthoutgoingExist?._sum.amount
            })
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{`Incoming-Outgoing chart(${year})`}</CardTitle>
                <CardDescription className="flex items-center gap-2"> <span>{`January ${currentMonthIndex !== 0 ?
                    `- ${months[currentMonthIndex]}` : ""}`}</span>

                    <YearDropdownmenu year={year} setYear={setYear} currentYear={currentYear} /></CardDescription>
            </CardHeader>
            <CardContent>
              {incomings === undefined ? <Skeleton className="w-full h-40"/> :
                <ChartContainer config={chartConfig} className="md:max-h-48 xl:max-h-96 min-w-full">
                <BarChart accessibilityLayer data={chartData} margin={{
                    top: 20,
                }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Bar dataKey="incoming"

                        fill="var(--color-incoming)"
                        radius={8}>
                        <LabelList
                            position="top"
                            offset={12}
                            className="fill-foreground"
                            fontSize={12}
                        />
                    </Bar>

                    <Bar dataKey="outgoing"

                        fill="var(--color-outgoing)"
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
              }
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2">
                    <div className={`${bgPrimaryColor} w-10 h-5`}></div>
                    Incoming
                </div>
                <div className="flex gap-2">
                    <div className={`${bgSecondaryColor} w-10 h-5`}></div>
                    Outgoing
                </div>
                <div className="flex gap-2 font-medium leading-none mt-4">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                Showing total incomings/outgoings for the last {currentMonthIndex + 1}
                {`${currentMonthIndex > 0 ? " months" : " month"}`}
                </div>
            </CardFooter>
        </Card>
        
    )
}
