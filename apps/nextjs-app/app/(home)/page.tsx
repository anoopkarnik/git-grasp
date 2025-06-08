"use client"
import React from 'react'
import { ExternalLink, GithubIcon } from 'lucide-react'
import useProject from '../../hooks/useProject'
import Link from 'next/link'
import ArchiveButton from '../../components/molecules/ArchiveButton'
import InviteButton from '../../components/molecules/InviteButton'
import TeamMembers from '../../components/molecules/TeamMembers'
import GetStartedSteps from '../../components/organisms/GetStartedSteps'
import { Badge } from '@repo/ui/atoms/shadcn/badge'

const Dashboard = () => {
    const {project} = useProject()

  return (
    <div className='mx-4'>    
        <GetStartedSteps/>    
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
                        {project.public && <Badge variant="default" >
                            Public</Badge>}
                        {!project.public &&<InviteButton/>}
                        {!project.public && <ArchiveButton/>}
                    </div>                
                </div>
            </>
        }
    </div>
  )
}

export default Dashboard