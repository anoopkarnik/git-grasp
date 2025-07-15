import { Button } from '@repo/ui/atoms/shadcn/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/molecules/shadcn/accordion'
import {useEffect, useState} from 'react'
import TopicCard from './TopicCard';
import { Dialog, DialogContent } from '@repo/ui/molecules/shadcn/dialog';
import CreateQuizForm from './CreateQuizForm';
import useProject from '../../hooks/useProject';
import useTopics from '../../hooks/useTopics';

const ByTopicsTab = () => {

      const [open, setOpen] = useState(false);
      const { projectId } = useProject();
      const [agentRunning] = useState(false);
      const [uniqueTopics, setUniqueTopics] = useState<string[]>([]);
      const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
      const { data: topics = [] } = useTopics(projectId ?? "", agentRunning);

      // Update unique topics
      useEffect(() => {
          if (!topics || topics.length === 0) return;
          const topicNames = topics.map((topic: any) => topic.name)
          setUniqueTopics(Array.from(new Set(topicNames)));
      }, [topics]);
  return (
        <div className=' mx-8'>
          <Accordion type="single" collapsible className="w-full">
              {uniqueTopics?.map((uniqueTopic, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className='text-lg'>
                          <div className='flex items-center justify-between  w-full mr-4'>
                              <div>{uniqueTopic} ({topics.filter(topic => topic.name === uniqueTopic).length})</div>
                              <Button 
                                  variant='default'
                                  size={'sm'}
                                  onClick={() => {
                                    setOpen(true)
                                    setSelectedTopic(uniqueTopic);}
                                  }>
                                  Generate Quiz
                              </Button>
                          </div>
                      </AccordionTrigger>
                      <AccordionContent className='flex flex-col gap-4'>
                          {topics
                              .filter(topic => topic.name === uniqueTopic)
                              .map(topic => (
                                  <TopicCard key={topic.id} topic={topic} />
                              ))
                          }
                      </AccordionContent>
                      <Dialog open={open} onOpenChange={setOpen}>
                          <DialogContent>
                              <CreateQuizForm topicIds= {topics
                              .filter(topic => topic.name === selectedTopic)
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

export default ByTopicsTab