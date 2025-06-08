"use client"
import { Badge } from '@repo/ui/atoms/shadcn/badge';
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger  } from '@repo/ui/molecules/shadcn/accordion'
import React from 'react'
import useProject from '../../hooks/useProject';
import useConnections from '../../hooks/useConnections';

const GetStartedSteps = () => {

    const {projects} = useProject();
    const {connections} = useConnections();

  return (
    <div className='border border-border m-10 rounded-lg p-6 bg-background'>
      <h2 className='text-2xl font-semibold mb-4'>Get Started with Your Project</h2>
       <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="step1">
                <AccordionTrigger className='text-md font-medium'>
                    <div className="flex items-center justify-start gap-2">
                        Step 1: Add your OpenAI Key
                        {connections.length==0 && <Badge variant='destructive' className='ml-2'>
                            To be completed
                        </Badge>}
                         {connections.length>0 && <Badge variant='default' className='ml-2'>
                            Completed
                        </Badge>}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <p className='text-sm text-muted-foreground'>
                    To begin, you need to add your OpenAI API key, from the connections sidetab. This key is essential for accessing the AI capabilities of the platform.
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="step2">
                <AccordionTrigger className='text-md font-medium'>
                   <div className="flex items-center justify-start gap-2">
                        Step 2: Add a Repository
                        {projects.length==0 && <Badge variant='destructive' className='ml-2'>
                            To be completed
                        </Badge>}
                         {projects.length>0 && <Badge variant='default' className='ml-2'>
                            Completed
                        </Badge>}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <p className='text-sm text-muted-foreground'>
                    Start by adding a repository which contains the code you want to analyze. This will allow the platform to access your codebase and provide insights.
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        
    </div>
  )
}

export default GetStartedSteps