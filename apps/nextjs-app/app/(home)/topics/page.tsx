"use client"
import React, { useEffect, useState } from 'react'
import useProject from '../../../hooks/useProject'
import { createSyllabus } from '../../../actions/syllabus'
import { Button } from '@repo/ui/atoms/shadcn/button'
import useTopics from '../../../hooks/useTopics'
import ByTopicsTab from '../../../components/organisms/ByTopicsTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/tabs'
import ByLanguagesTab from '../../../components/organisms/ByLanguagesTab'
import ByFrameworksTab from '../../../components/organisms/ByFrameworksTab'

const Dashboard = () => {
    const { project, projectId } = useProject();
    const [agentRunning, setAgentRunning] = useState(false);
    const { data: topics = [], refetch, isLoading } = useTopics(projectId ?? "", agentRunning);

    const [prevProjectId, setPrevProjectId] = useState(projectId);
    useEffect(() => {
    if (projectId !== prevProjectId) {
        setPrevProjectId(projectId);
    }
    }, [projectId]);


      // If topics appear, stop agentRunning
    useEffect(() => {
        if (agentRunning && topics.length > 0) {
        setAgentRunning(false);
        // Polling stops automatically because agentRunning is now false
        }
    }, [topics, agentRunning]);


    useEffect(() => {
        if (topics.length > 0 && agentRunning) {
            setAgentRunning(false);
            refetch({ cancelRefetch: true }); // stops polling if you want, or just set refetchInterval to 0
        }
    }, [topics, agentRunning, refetch, projectId]);

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
    <>
        <div className='mx-4'>        
            {project && 
                <Tabs defaultValue="byTopics" className="w-full">
                    <TabsList>
                        <TabsTrigger value="byTopics" >
                            By Topics
                        </TabsTrigger>
                        <TabsTrigger value="byLanguages">
                            By Languages
                        </TabsTrigger>
                        <TabsTrigger value="byFrameworks">
                            By Frameworks
                        </TabsTrigger>
                    </TabsList>
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
                    {(isLoading || projectId !== prevProjectId) ? (
                        <div>Loading topics...</div>
                        ) : topics.length === 0 ? (
                        <div></div>
                        ) : (
                        <TabsContent value="byTopics">
                            <ByTopicsTab />
                        </TabsContent>
                        )}
                    <TabsContent value="byLanguages">
                        <ByLanguagesTab />
                    </TabsContent>
                    <TabsContent value="byFrameworks">
                        <ByFrameworksTab />
                    </TabsContent>
                </Tabs>
            }
        </div>
    </>
  )
}

export default Dashboard