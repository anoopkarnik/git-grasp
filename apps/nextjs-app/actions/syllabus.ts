"use server";

import db from "@repo/prisma-db/client";
import { auth } from "@repo/auth/better-auth/auth";
import { headers } from "next/headers";
import axios from "axios";

export const createSyllabus = async (projectId: string) => {
    axios.post(`${process.env.GENERATE_SYLLABUS_N8N_WEBHOOK_URL}`, {
        projectId
    })
}


export const getTopics = async (projectId:string) => {

    const syllabus = await db.syllabus.findUnique({
        where: {
            projectId
        },
    });
    if (!syllabus) {
        return [];
    }

    const topics = await db.topic.findMany({
        where: {
            syllabusId: syllabus.id
        },
        include: {
            questions: {
                include: {
                    quiz: true
                }
            }
        },
        orderBy: {
            createdAt: "asc"
        }
    });
    return topics;
}

export const createQuiz = async (topicIds: string[], totalQuestions: number, type: string) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    const quiz = await db.quiz.create({
        data: {
            totalQuestions,
            userId: session.user.id
        }
    });

    axios.post(`${process.env.GENERATE_QUIZ_N8N_WEBHOOK_URL}`, {
        topicIds,
        totalQuestions,
        type,
        quizId: quiz.id
    })
    return quiz;

}

export const getQuizzes = async (projectId: string) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const quizzes = await db.quiz.findMany({
        where: {
            userId: session.user.id,
            questions: {
                some: {
                    topic: {
                        syllabus: {
                            projectId
                        }
                    }
                }
            }
        },
        include: {
            questions: {
                include: {
                    topic: true
                }
            }
        },
        orderBy: {
            createdAt: "asc"
        }
    });
    return quizzes;
}

export const getQuestions= async (quizId: string) => {
    const questions = await db.quizQuestion.findMany({
        where: {
            quizId
        },
        orderBy: {
            createdAt: "asc"
        }
    });
    return questions;
}