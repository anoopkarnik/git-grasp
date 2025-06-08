"use client"
import React, { useEffect, useState } from 'react'
import useProject from '../../../hooks/useProject'
import { getTopics } from '../../../actions/syllabus'
import TopicCard from '../../../components/organisms/TopicCard'

const Dashboard = () => {
    const {project,projectId} = useProject()
    const [topics, setTopics] = useState<any[]>([])

    useEffect(()=>{
        const fetchTopics = async () => {
            if(!projectId) return;
            const topics = await getTopics(projectId)
            setTopics(topics)
        }
        fetchTopics()
    },[projectId])

  return (
    <div className='mx-4'>        
        {project && 
            <>
                <div className='text-2xl font-semibold my-4 mx-8'>
                    Topics
                </div>
                <div className='grid grid-cols-3  gap-4 mx-4 mb-10'>
                    {topics?.map((topic) => (
                        <TopicCard key={topic.id}
                        topic={topic}
                        />
                    ))}
                </div>
            </>
        }
    </div>
  )
}

export default Dashboard