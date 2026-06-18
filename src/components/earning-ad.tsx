import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { bgPrimaryColor, textSecondaryColor } from '@/utils/colors'
import { Copy } from 'lucide-react'

function  EarningAd() {
  return (
    <Card className={`${bgPrimaryColor}`}>
                <CardHeader >
                    <CardTitle className={`${textSecondaryColor} text-2xl`}>Earn more rewards</CardTitle>
                    <CardDescription className="text-white text-xl">By referring a friend to The Global Genius</CardDescription>
                </CardHeader>
                <CardContent className="text-white lg:w-1/2">
                    With our referral system, you can earn upto 10% when you grow a network of friends who buy our courses.
                    Ensure they select your username as their referer
                </CardContent>
                <CardFooter>
                    {/* <div className="bg-white flex items-center justify-center gap-6 p-2">
                        Ref username: <strong>titile</strong>
                        <Copy className="h-5 w-5" />
                    </div> */}
                </CardFooter>
            </Card>
  )
}

export default EarningAd