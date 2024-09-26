import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request,
    {
        params: { assignmentId }
    }: {
        params: { assignmentId: string }
    }
) {
    try {
        const { userId } = auth();
        const { answer } = await req.json();

        if (!userId) {
            return new NextResponse("Unautorized", { status: 401 });
        }

        const ans = await db.assignmentAnswer.findUnique({
            where: {
                userId_assignmentId: {
                    userId, assignmentId
                }
            }
        })

        if (ans) {
            await db.assignmentAnswer.update({
                where: {
                    userId_assignmentId: {
                        userId, assignmentId
                    }
                }, data: {
                    answer
                }
            })
        } else {
            await db.assignmentAnswer.create({
                data: {
                    userId,
                    assignmentId,
                    answer
                },
            });
        }


        return NextResponse.json("");
    } catch (err) {
        console.log("[ASSIGNMENT_ANSWER]", err);
        return new NextResponse("Internal Error", {
            status: 500,
        });
    }
}


