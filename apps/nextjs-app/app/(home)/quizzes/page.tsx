"use client"
import React, { useEffect, useState } from 'react'
import { getQuizzes } from '../../../actions/syllabus'
import QuizCard from '../../../components/QuizCard'
import type { Quiz,Topic, QuizQuestion } from '@prisma/client'

type Props = Quiz & {
    topic: Topic
    questions: QuizQuestion[]
}

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState<Props[]>([])

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await getQuizzes()
                setQuizzes(data)
            } catch (error) {
                console.error('Error fetching quizzes:', error)
            }
        }
        fetchQuizzes()
    },[])
  return (
    <div>
        <h1 className="text-2xl font-bold m-4">Quizzes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
            {quizzes.map((quiz) => (
                 <QuizCard key={quiz.id} quiz={quiz} />
            ))}
        </div>
    </div>
  )
}

export default Quizzes