import React from 'react'
import QuestionQuizCard from '../../../../components/QuestionQuizCard';

type Props = {
    params: Promise<{quizId: string}>
}

const QuizQuestionPage = async ({params} : Props) => {
    const {quizId} = await params;
  return (
    <QuestionQuizCard quizId={quizId}/>
  )
}

export default QuizQuestionPage