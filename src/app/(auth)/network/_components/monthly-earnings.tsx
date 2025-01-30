"use client"

import { Copy, TrendingDown, TrendingUp } from "lucide-react"
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
import { bgNeutralColor2} from "@/utils/colors"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import toast from "react-hot-toast"
import axios from "axios"
import { YearDropdownmenu } from "./year-dropdown"

type ChartDataType = { month: string, earning?: number };

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
const currentMonthIndex = new Date().getMonth();



const chartConfig = {
    earning: {
        label: "Earning",
        color: "#111587"//"hsl(var(--chart-1))",
    },
} satisfies ChartConfig

type EarningType = {
    _sum: { amount: number },
    month: number
}

export function MonthlyEarnings() {
    //earnings come from database
    const [earnings, setEarnings] = useState<EarningType[] | undefined>(undefined);
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear.toString());


    useEffect(() => {
        (
            async () => {
                try {
                    const res = await axios.get(`/api/user/earnings/${year}`);
                    setEarnings(res.data);

                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        )()
    }, [year])

    const chartData: ChartDataType[] = []
    const len = months.length;
    let currentMonthEarning = 0;
    let prviousMonthEarning = 0;
    if (earnings) {
        currentMonthEarning = earnings.find(earning => earning.month === currentMonthIndex)?._sum.amount || 0;
        prviousMonthEarning = earnings.find(earning => earning.month === currentMonthIndex - 1)?._sum.amount || 0;

        for (let i = 0; i < len; i++) {
            const monthEarningExist = earnings.find(earning => earning.month === i)

            chartData.push({

                month: months[i], earning: monthEarningExist?._sum.amount
            })
        }
    }

    return (
        <section className="flex flex-col gap-4 bg-white w-full">
            {earnings === undefined ? <Skeleton className={`${bgNeutralColor2} w-full h-72`} /> :
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Earnings</CardTitle>
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
                                <Bar dataKey="earning"

                                    fill="var(--color-earning)"
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
                    <CardFooter className="flex-col items-start gap-2 text-sm">
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
                    </CardFooter>
                </Card>
            }
          
        </section>
    )
}
