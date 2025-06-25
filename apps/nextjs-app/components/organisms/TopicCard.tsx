"use client"
import React, { useState } from 'react'
import type {Topic} from "@prisma/client"
import { Badge } from '@repo/ui/atoms/shadcn/badge'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { Dialog, DialogContent } from '@repo/ui/molecules/shadcn/dialog'
import CreateQuizForm from './CreateQuizForm'

const TopicCard = ({topic}:{topic:Topic}) => {
    const [open, setOpen] = useState(false)

  return (
    <>  
        <div className='flex items-center justify-between '>
            <div className='flex items-center justify-start gap-2'>
                <div>{topic.subTopic}</div>
                <Badge className='bg-blue-400 hover:bg-blue-400'>
                    {topic.language}
                </Badge>
                <Badge className='bg-yellow-400 hover:bg-yellow-400'>
                    {topic.framework}
                </Badge>
                <Badge className='bg-violet-400 hover:bg-violet-400'>
                    Level {topic.level}
                </Badge>
            </div>
            <Button 
                variant='default'
                size={'sm'}
                onClick={() => setOpen(true)}
            >
                Generate 
            </Button>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <CreateQuizForm topicIds={[topic.id]}/>
            </DialogContent>
        </Dialog>

    </>
  )
}

export default TopicCard