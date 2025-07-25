"use client"

import React, { useEffect, useState } from 'react'
import { getQuestions } from '../../actions/syllabus';
import { Button } from '@repo/ui/atoms/shadcn/button';
import { Textarea } from '@repo/ui/atoms/shadcn/textarea';
import { getMarks } from '../../actions/openai';
import { cn } from '@repo/ui/lib/utils';
import { Mic } from 'lucide-react'
import { useAudioRecorder } from '../../hooks/useAudioRecorder';

const QuestionQuizCard = ({quizId}: {quizId:string}) => {

    const [questions,setQuestions] = useState<any[]>([]); // Replace 'any' with your question type
    const [answers, setAnswers] = useState<string[]>([]);
    const [marksGiven, setMarksGiven] = useState<any[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { startRecording, stopRecording} = useAudioRecorder();

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

        const marks = await getMarks(questions, answers);
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
                    {question?.type == 'subjective' && 
                    <div className="relative w-[60vw]">
                        <Textarea
                            value={answers[index] || ""}
                            onChange={(e) => {
                            const newAnswers = [...answers]
                            newAnswers[index] = e.target.value
                            setAnswers(newAnswers)
                            }}
                            placeholder="Type or speak your answer..."
                            className="w-full min-h-[150px]"
                        />

                        {/* 🎙️ Mic Button */}
                        <button
                            onMouseDown={async () => {
                              await startRecording()
                            }}
                            onMouseUp={async () => {
                            const audioBlob = await stopRecording()
                            const formData = new FormData();
                            formData.append("file", audioBlob, "speech.webm");
                            const response = await fetch("/api/ai/speechToText", { method: "POST",body: formData,});
                            const conversation = await response.json();
                            const newAnswers = [...answers]
                            newAnswers[index] = (newAnswers[index] || "") + " " + conversation.text;
                            setAnswers(newAnswers)
                            }}
                            className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-800 text-white p-2 rounded-full"
                        >
                            <Mic className="h-5 w-5" />
                        </button>
                        </div>
}
                    {question?.type == 'multiple_choice' && (
                        <div className='flex flex-col gap-2'>
                            {question.options?.map((option: string, optionIndex: number) => (
                                <label key={optionIndex} className='flex items-center gap-2'>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        checked={answers[index] === option}
                                        onChange={() => {
                                            const newAnswers = [...answers];
                                            newAnswers[index] = option;
                                            setAnswers(newAnswers);
                                        }}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    )
                     }
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