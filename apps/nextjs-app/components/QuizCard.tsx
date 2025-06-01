"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/card'

import type { Quiz,Topic, QuizQuestion } from '@prisma/client'
import { Badge } from '@repo/ui/atoms/shadcn/badge'
import { cn } from '@repo/ui/lib/utils'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { useRouter } from 'next/navigation'

type Props = Quiz & {
    topic: Topic
    questions: QuizQuestion[]
}


const QuizCard = ({quiz}:{quiz: Props}) => {
    const router = useRouter()
  return (
    <Card className={cn(quiz.questions.length ==0 && 'bg-destructive/10',
        quiz.questions.length > 0 && quiz.questions[0]?.score == null && 'bg-yellow-900/10',
        quiz.questions.length > 0 && quiz.questions[0]?.score && 'bg-green-400/10',
    )}>
        <CardHeader>
            <CardTitle>Quiz for {quiz.topic.name} - {quiz.topic.subTopic}  </CardTitle>
                <div className='flex items-center gap-2 justify-start'>
                    <Badge className='bg-blue-400 hover:bg-blue-400'>
                        {quiz.topic.language}
                    </Badge>
                    <Badge className='bg-yellow-400 hover:bg-yellow-400'>
                        {quiz.topic.framework}
                    </Badge>
                    <Badge className='bg-violet-400 hover:bg-violet-400'>
                        Level {quiz.topic.level}
                    </Badge>
                </div>
        </CardHeader>
        <CardContent>
            <div className='flex flex-col gap-2'>
                <p>Number of Questions - {quiz.questions.length}</p>
                <p>Total Score - {quiz.questions.reduce((acc, question) => acc + (question.scoreMax || 0), 0)}</p>
                <p>Current Score - {
                    quiz?.questions[0]?.score ?
                     quiz.questions.reduce((acc, question) => acc + (question.score || 0), 0) :
                     "Not Attempted"
                }</p>
                <Button variant='shimmer' className='w-full mt-4' onClick={() => {
                        router.push(`/quizzes/${quiz.id}`)
                }}>
                    Attempt the Quiz
                </Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default QuizCard