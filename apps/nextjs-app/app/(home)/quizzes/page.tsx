"use client"
import React, { useEffect, useState } from 'react'
import { getQuizzes } from '../../../actions/syllabus'
import QuizCard from '../../../components/organisms/QuizCard'
import type { Quiz,Topic, QuizQuestion } from '@prisma/client'
import useProject from '../../../hooks/useProject'

type QuizQuestionWithTopic = QuizQuestion & { topic: Topic }

type Props = Quiz & {
    questions: QuizQuestionWithTopic[]
}
const Quizzes = () => {
    const [quizzes, setQuizzes] = useState<Props[]>([])
    const { projectId } = useProject()

    useEffect(() => {
        const fetchQuizzes = async () => {
            if (!projectId) return;
            try {
                const data = await getQuizzes(projectId)
                setQuizzes(data)
            } catch (error) {
                console.error('Error fetching quizzes:', error)
            }
        }
        fetchQuizzes()
    },[projectId])
  return (
    <div>
        <h1 className="text-2xl font-bold m-4">Quizzes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4">
            {quizzes.map((quiz) => (
                 <QuizCard key={quiz.id} quiz={quiz} />
            ))}
        </div>
    </div>
  )
}

export default Quizzes