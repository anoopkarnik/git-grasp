import { Button } from '@repo/ui/atoms/shadcn/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/accordion'
import {useEffect, useMemo, useState} from 'react'
import TopicCard from './TopicCard';
import { Dialog, DialogContent } from '@repo/ui/molecules/shadcn/dialog';
import CreateQuizForm from './CreateQuizForm';
import useProject from '../../hooks/useProject';
import useTopics from '../../hooks/useTopics';

const ByFrameworksTab = () => {

      const [open, setOpen] = useState(false);
      const { projectId } = useProject();
      const [agentRunning] = useState(false);
      const [uniqueFrameworks, setUniqueFrameworks] = useState<string[]>([]);
        const { data } = useTopics(projectId ?? "", agentRunning);
        const topics = useMemo(() => data?.topics ?? [], [data]);
      // Update unique topics
      useEffect(() => {
          if (!topics || topics.length === 0) return;
          const frameworks = topics.map((topic: any) => topic.framework)
          setUniqueFrameworks(Array.from(new Set(frameworks)));
      }, [topics]);
  return (
        <div className=' mx-8'>
          <Accordion type="single" collapsible className="w-full">
              {uniqueFrameworks?.map((uniqueFramework, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className='text-lg'>
                          <div className='flex items-center justify-between  w-full mr-4'>
                              <div>{uniqueFramework} ({topics.filter(topic => topic.framework=== uniqueFramework).length})</div>
                              <Button 
                                  variant='default'
                                  size={'sm'}
                                  onClick={() => setOpen(true)}
                              >
                                  Generate Quiz
                              </Button>
                          </div>
                      </AccordionTrigger>
                      <AccordionContent className='flex flex-col gap-4'>
                          {topics
                              .filter(topic => topic.framework === uniqueFramework)
                              .map(topic => (
                                  <TopicCard key={topic.id} topic={topic} />
                              ))
                          }
                      </AccordionContent>
                      <Dialog open={open} onOpenChange={setOpen}>
                          <DialogContent>
                              <CreateQuizForm topicIds= {topics
                              .filter(topic => topic.framework === uniqueFramework)
                              .map(topic => topic.id)
                          }/>
                          </DialogContent>
                      </Dialog>
                  </AccordionItem>
                  
              ))}
          </Accordion>
      </div>
  )
}

export default ByFrameworksTab