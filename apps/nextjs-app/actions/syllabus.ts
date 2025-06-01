"use server";

import db from "@repo/prisma-db/client";

export const getTopics = async (projectId:string) => {

    const syllabus = await db.syllabus.findUnique({
        where: {
            projectId
        },
    });
    if (!syllabus) {
        throw new Error("Syllabus not found for the project");
    }

    const topics = await db.topic.findMany({
        where: {
            syllabusId: syllabus.id
        },
        include: {
            quizzes: {
                include: {
                    questions: true
                }
            }
        },
        orderBy: {
            createdAt: "asc"
        }
    });
    return topics;
}