"use client" 

import React, { useEffect, useState } from 'react'
import useProject from '../../../hooks/useProject'
import useDocumentations from '../../../hooks/useDocumentations';
import { createReadme } from '../../../actions/project';
import { Button } from '@repo/ui/atoms/shadcn/button';
import MarkdownPreview from '../../../components/organisms/MarkdownPreview';


const DocumentationGenerator = () => {

    const { projectId } = useProject();
    const {data:documentations=[], refetch} = useDocumentations(projectId ?? "", true);
    const [agentRunning, setAgentRunning] = useState(false);

    useEffect(() => {
        if (agentRunning && documentations.length > 0) {
        setAgentRunning(false);
        // Polling stops automatically because agentRunning is now false
        }
    }, [documentations, agentRunning]);

    useEffect(() => {
        if (documentations.length > 0 && agentRunning) {
            setAgentRunning(false);
            refetch({ cancelRefetch: true }); // stops polling if you want, or just set refetchInterval to 0
        }
    }, [documentations, agentRunning, refetch]);

     const createReadmeDocumentation = async () => {
    if (!projectId) return;
    try {
      setAgentRunning(true);
      await createReadme(projectId);
      // No need to refetch here; polling will handle updates
    } catch (error) {
      setAgentRunning(false);
      console.error("Error creating syllabus and topics:", error);
    }
  };

  return (
    <div className='mx-4'>
        { !agentRunning && <div className='flex items-center p-4 gap-6'>
            <Button 
                onClick={createReadmeDocumentation} 
                disabled={!projectId}
            >
                Create a New Readme.md 
            </Button>
        </div>}
        {agentRunning && <div className='flex flex-col items-center justify-center p-4 gap-6'>
            <div className='text-description'>Generating documentaion... It may take few minutes</div>
            <Button disabled>
                Please wait...
            </Button>
        </div>}
        {documentations.length > 0 && (
            <div className='flex flex-col gap-4 mx-4'>
                {documentations.map((doc) => (
                    <MarkdownPreview content={doc.content}  key={doc.id}/>
                ))}
            </div>
        )}

    </div>
  )
}

export default DocumentationGenerator