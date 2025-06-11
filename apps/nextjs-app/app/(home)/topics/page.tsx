"use client"
import React, { useEffect, useState } from 'react'
import useProject from '../../../hooks/useProject'
import { createSyllabus } from '../../../actions/syllabus'
import TopicCard from '../../../components/organisms/TopicCard'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/accordion'
import { Button } from '@repo/ui/atoms/shadcn/button'
import useTopics from '../../../hooks/useTopics'

const Dashboard = () => {
    const { project, projectId } = useProject();
    const [agentRunning, setAgentRunning] = useState(false);
    const [uniqueTopics, setUniqueTopics] = useState<string[]>([]);
    const { data: topics = [], refetch } = useTopics(projectId ?? "", agentRunning);

      // If topics appear, stop agentRunning
    useEffect(() => {
        if (agentRunning && topics.length > 0) {
        setAgentRunning(false);
        // Polling stops automatically because agentRunning is now false
        }
    }, [topics, agentRunning]);

    // Update unique topics
    useEffect(() => {
        if (!topics || topics.length === 0) return;
        const topicNames = topics.map((topic: any) => topic.name)
        setUniqueTopics(Array.from(new Set(topicNames)));
    }, [topics]);


    useEffect(() => {
        if (topics.length > 0 && agentRunning) {
            setAgentRunning(false);
            refetch({ cancelRefetch: true }); // stops polling if you want, or just set refetchInterval to 0
        }
    }, [topics, agentRunning, refetch]);

   const createSyllabusAndTopics = async () => {
    if (!projectId) return;
    try {
      setAgentRunning(true);
      await createSyllabus(projectId);
      // No need to refetch here; polling will handle updates
    } catch (error) {
      setAgentRunning(false);
      console.error("Error creating syllabus and topics:", error);
    }
  };

  return (
    <div className='mx-4'>        
        {project && 
            <>
                <div className='text-2xl font-semibold my-4 mx-8'>
                    Topics
                </div>
                {topics.length==0 && !agentRunning && <div className='flex flex-col items-center justify-center p-4 gap-6'>
                    <div className='text-description'>No topics generated yet.</div>
                    <Button 
                        onClick={createSyllabusAndTopics} 
                        disabled={!projectId}
                    >
                        Create Topics for this project
                    </Button>
                </div>}
                {agentRunning && <div className='flex flex-col items-center justify-center p-4 gap-6'>
                    <div className='text-description'>Generating topics... It may take 10-20 minutes</div>
                    <Button disabled>
                        Please wait...
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