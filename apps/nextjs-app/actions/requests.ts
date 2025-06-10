"use server"

import { revalidatePath } from "next/cache";
import { pollCommits } from "../lib/helper/github-commit";
import { auth } from "@repo/auth/better-auth/auth";
import { headers } from "next/headers";
import db from "@repo/prisma-db/client";

export const getCommitsFromGithub = async (projectId: string) => {
    await pollCommits(projectId,1000);
    revalidatePath(`request-analyzer`);
};

export const getCommits = async (projectId: string, page: number, total:number  ) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const githubCommits = await db.githubCommit.findMany({
        where: {
            projectId,
        },
        orderBy: {
            commitDate: "desc",
        },
        skip: (page - 1) * total,
        take: total       
    });
    if (!githubCommits) {
        return [];
    }
    else if (githubCommits.length ===0 ) {
        await pollCommits(projectId,1000);
        revalidatePath(`/request-analyzer`);
    }
    else{
        await pollCommits(projectId,10);
        revalidatePath(`/request-analyzer`);
    }
    return githubCommits;
}