"use server";

import db from "@repo/prisma-db/client";
import { auth } from "@repo/auth/better-auth/auth";
import { headers } from "next/headers";
import axios from "axios";

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

export const createQuiz = async (topicId: string, totalQuestions: number) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }
    const quiz = await db.quiz.create({
        data: {
            topicId,
            totalQuestions,
            userId: session.user.id
        }
    });
    axios.post(`${process.env.GENERATE_QUIZ_N8N_WEBHOOK_URL}`, {
        topicId,
        totalQuestions,
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
            topic: {
                syllabus: {
                    projectId
                }
            }
        },
        include: {
            topic: true,
            questions: true
        },
        orderBy: {
            createdAt: "desc"
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

