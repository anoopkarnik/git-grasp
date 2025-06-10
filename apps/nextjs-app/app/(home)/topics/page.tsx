"use client"
import React, { useEffect, useState } from 'react'
import useProject from '../../../hooks/useProject'
import { createSyllabus, getTopics } from '../../../actions/syllabus'
import TopicCard from '../../../components/organisms/TopicCard'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/accordion'
import type { Topic } from '@prisma/client'
import { Button } from '@repo/ui/atoms/shadcn/button'

const Dashboard = () => {
    const {project,projectId} = useProject()
    const [uniqueTopics, setUniqueTopics] = useState<string[]>([])
    const [topics, setTopics] = useState<Topic[]>([])

    useEffect(()=>{
        const fetchTopics = async () => {
            if(!projectId) return;
            const topics = await getTopics(projectId)
            setTopics(topics)
            const topicNames = topics.map((topic: any) => topic.name)
            const uniqueTopics = Array.from(new Set(topicNames))
            setUniqueTopics(uniqueTopics)
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
                {topics.length==0 && <div className='flex flex-col items-center justify-center p-4 gap-6'>
                    <div className='text-description'>No topics generated yet.</div>
                    <Button 
                        onClick={() => projectId && createSyllabus(projectId)} 
                        disabled={!projectId}
                    >
                        Create Topics for this project
                    </Button>
                </div>}
                <div className=' mx-8'>
                    <Accordion type="single" collapsible className="w-full">
                        {uniqueTopics?.map((uniqueTopic, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className='text-lg font-semibold flex justify-between items-center'>
                                    {uniqueTopic} ({topics.filter(topic => topic.name === uniqueTopic).length})
                                </AccordionTrigger>
                                <AccordionContent className='flex flex-col gap-4'>
                                    {topics
                                        .filter(topic => topic.name === uniqueTopic)
                                        .map(topic => (
                                            <TopicCard key={topic.id} topic={topic} />
                                        ))
                                    }
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </>
        }
    </div>
  )
}

export default Dashboard