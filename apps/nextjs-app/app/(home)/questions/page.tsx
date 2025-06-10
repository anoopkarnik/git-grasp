"use client"
import React, { useEffect } from 'react'
import useProject from '../../../hooks/useProject'
import { getQuestions } from '../../../actions/project'
import AskQuestionCard from '../../../components/organisms/AskQuestionCard'
import QuestionCard from '../../../components/organisms/QuestionCard'

const QAPage = () => {
  const [questions, setQuestions] = React.useState<any[]>([])
  const {projectId} = useProject()

  useEffect(()=>{
    const fetchQuestions = async () => {
      if (!projectId) return;
      const data = await getQuestions(projectId)
      setQuestions(data)
    }
    fetchQuestions()
  }, [projectId])
  return (
    <div className='my-4'>        
        <AskQuestionCard />
       
          <h1 className='text-xl font-semibold my-4 mx-8'>
            Saved Questions
          </h1>
          <div className='flex flex-col gap-2'>
              {questions?.map((question) => (
                  <QuestionCard key={question.id} 
                  question={question}
                  />
              ))}
      
          </div>

    </div>
  )
}

export default QAPage