"use client"
import React, { useEffect, useState } from 'react'
import { ExternalLink, GithubIcon } from 'lucide-react'
import useProject from '../../hooks/useProject'
import Link from 'next/link'
import AskQuestionCard from '../../components/AskQuestionCard'
import ArchiveButton from '../../components/ArchiveButton'
import InviteButton from '../../components/InviteButton'
import TeamMembers from '../../components/TeamMembers'
import { getTopics } from '../../actions/syllabus'
import TopicCard from '../../components/TopicCard'

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
                <div className='flex items-center justify-between flex-wrap gap-y-4 m-4 '>
                    {/* Github Link */}
                    <div className='w-fit rounded-md bg-primary/20 px-4 py-3 flex items-center gap-2'>
                        <GithubIcon className='h-4 w-4 text-white' />
                        <div className='ml-2'>
                            This project is linked to  <Link href={project?.githubUrl as string} 
                            target='_blank' className='inline-flex items-center text-white/80 hover:underline'>
                                {project?.githubUrl as string}
                                <ExternalLink className='h-4 w-4 ml-1' />
                            </Link>
                        </div>
                    </div>
                    <div className='h-4'></div>
                    <div className='flex items-center gap-4'>
                        <TeamMembers/>
                        <InviteButton/>
                        <ArchiveButton/>
                    </div>                
                </div>
                <div className='grid grid-cols-5 w-full mx-2 my-10 gap-2s'>
                    <AskQuestionCard/>
                </div>
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