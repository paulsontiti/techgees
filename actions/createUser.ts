import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { DBUser } from "@prisma/client";

interface ReturnValue {
    createdUser: DBUser | null,
    error: Error | null
}
/**
 * Creates a user from the clerk user.
 * 

 * @param {string} userId - The clerk id of the user.
 * @return {ReturnValue} The user or error.
 */
export const createUser = async (
    userId: string):
    Promise<ReturnValue> => {
    try {
        const clerkUser = await currentUser()
        const createdUser = await db.dBUser.create({
            data: {
                userId,
                imageUrl: clerkUser?.imageUrl,
                firstName: clerkUser?.firstName,
                lastName: clerkUser?.lastName,
                phone: clerkUser?.phoneNumbers[0]?.phoneNumber,
                email: clerkUser?.emailAddresses[0].emailAddress
            }

        })


        return { createdUser, error: null }
    } catch (error: any) {
        console.log("[CREATE_USER]", error)
        return { createdUser: null, error }
    }
}