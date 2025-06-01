"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/molecules/shadcn/card'
import type {Topic} from "@prisma/client"
import { Badge } from '@repo/ui/atoms/shadcn/badge'

const TopicCard = ({topic}:{topic:Topic}) => {

  return (
    <>
        <Card className='bg-sidebar hover:bg-sidebar/80 transition-all duration-200 cursor-pointer'>
            <CardHeader>
                <CardTitle className='text-lg'>{topic.subTopic} - {topic.name}</CardTitle>
                <div className='flex items-center gap-2 justify-start'>
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

            </CardHeader>
            <CardContent>
                <div className='text-description'>
                    {topic.description}
                </div>
            </CardContent>
        </Card>
    </>
  )
}

export default TopicCard