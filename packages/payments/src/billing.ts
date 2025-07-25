"use server"

import { auth } from "@repo/auth/better-auth/auth";
import db from "@repo/prisma-db/client";
import { LogCollector } from "@repo/ts-types/scrape-flow/log";
import { billingAddressSchemaType } from "./utils";
import { headers } from "next/headers";


export async function GetAvailableCredits(){
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({
        where: {
            id: session.user.id
        }
    })
    if(!user){
        throw new Error("User not found");
    }
    const balance = user.creditsTotal - user.creditsUsed;
    return balance;
}

export async function decrementCredits(userId:string, amount: number, logCollector: LogCollector){
    try{
        const user = await db.user.findUnique({
            where: { id: userId },
            select: { creditsTotal: true, creditsUsed: true },
          });
        
        if (!user) {
            throw new Error("User not found");
          }
        
        const { creditsTotal, creditsUsed } = user;

        // Check if sufficient balance exists
        if (creditsTotal - creditsUsed <= amount) {
            logCollector.error("Insufficient balance");
            return false;
        }

        await db.user.update({
            where:{
                id: userId,
            },
            data:{
                creditsUsed: {
                    increment: amount
                }
            }
        })
        return true
    }catch{
        logCollector.error("Insufficient balance");
        return false
    }
}

export async function GetUserPurchaseHistory() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    return db.userPurchase.findMany({
        where: {
            userId: session.user.id
        },
        orderBy:{
            date: "desc"
        }
    })
}


export async function GetUserAddress(){
    const session = await auth.api.getSession({
        headers: await headers(),
    });;
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const userFinancial = await db.userFinancial.findUnique({
        where: {
            userId: session.user.id
        }
    })
    return userFinancial;
}

export const increaseCredits = async (userId: string, credits: number) => {
    const user = await db.user.update({
        where: { id: userId },
        data: {
            creditsUsed: {
                increment: credits
            }
        }
    });
    return user;
}
