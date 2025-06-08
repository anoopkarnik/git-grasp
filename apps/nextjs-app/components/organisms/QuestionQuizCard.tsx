"use client"

import React, { useEffect, useState } from 'react'
import { getQuestions } from '../../actions/syllabus';
import { Button } from '@repo/ui/atoms/shadcn/button';
import { Textarea } from '@repo/ui/atoms/shadcn/textarea';
import { getMarks } from '../../actions/openai';
import { cn } from '@repo/ui/lib/utils';
import useConnections from '../../hooks/useConnections';

const QuestionQuizCard = ({quizId}: {quizId:string}) => {

    const [questions,setQuestions] = useState<any[]>([]); // Replace 'any' with your question type
    const [answers, setAnswers] = useState<string[]>([]);
    const [marksGiven, setMarksGiven] = useState<any[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {connections} = useConnections();

    useEffect(() =>{
        const fetchQuestions = async () => {
            try {
                const questions = await getQuestions(quizId);
                setQuestions(questions);

            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    },[quizId])

    const handleSubmit = async () => {
        setIsSubmitted(true);
        const openAiConnection = connections.find((connection) => connection.connection === 'OpenAI');
        const apiKey = openAiConnection?.details ? JSON.parse(openAiConnection.details).apiKey : "";
        const marks = await getMarks(questions, answers, apiKey);
        setMarksGiven(marks);
        setIsSubmitted(false);
    }




  return (
    <div className='flex flex-col justify-between items-start my-4 gap-20 mx-4'>
        {questions.length >0 &&  questions.map((question,index) => (
            <div key={question.id} className='flex flex-col items-start gap-4'>
                <div>
                    <h1 className='text-4xl font-bold text-left'>
                        Question {index + 1} of {questions.length} ({question?.scoreMax || 0} marks)
                    </h1>
                    <p className='text-2xl font-semibold mb-2 text-left'>
                        {question?.question || "Loading question..."}
                    </p>
                </div>
                <div className=''>
                    {question?.type !== 'MCQ' && 
                    <Textarea
                        value={answers[index] || ""}
                        onChange={(e) => {
                            const newAnswers = [...answers];
                            newAnswers[index] = e.target.value;
                            setAnswers(newAnswers);
                        }}
                        placeholder="Type your answer here..."
                        className="w-[60vw] min-h-[150px]"
                    />}
                </div>
                <div> 
                    {marksGiven[index] && (
                        <div className={cn('text-2xl font-semibold text-left',
                            marksGiven[index].score >= question.scoreMax ? 'text-green-200' : 'text-red-200'
                        )}>
                            <p >Scored Marks: {marksGiven[index].score || 0} </p>
                            <p>Feedback: {marksGiven[index].comment || "No feedback provided"}</p>
                        </div>
                    )}
                </div>
            </div>
        ))}

        <div className='flex items-center justify-center gap-4 mb-16'>
            <Button 
                variant='shimmer'
                disabled={isSubmitted}
                onClick={()=>{handleSubmit()}}
            >
                Submit Quiz
            </Button>
        </div>
    </div>
  )
}

export default QuestionQuizCard