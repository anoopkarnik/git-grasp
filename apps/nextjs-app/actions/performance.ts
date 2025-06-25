"use server"

import db from "@repo/prisma-db/client";
import { auth } from "@repo/auth/better-auth/auth";
import { headers } from "next/headers";


export const getSelfAssessmentForTopics = async() => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const selfAssesssments = await db.selfAssessment.findMany({
        where: {
            userId: session.user.id,
            entityType: "topic"
        }
    })
    return selfAssesssments;
}

export const saveSelfAssessment = async (entityName: string, entityType: string, level: number) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const existingAssessment = await db.selfAssessment.findFirst({
        where: {
            userId: session.user.id,
            entityName,
            entityType
        }
    });
    if (existingAssessment) {
        return await db.selfAssessment.update({
            where: {
                id: existingAssessment.id
            },
            data: {
                level
            }
        });
    } else {
        return await db.selfAssessment.create({
            data: {
                userId: session.user.id,
                entityName,
                entityType,
                level
            }
        });
    }
    
}
   

