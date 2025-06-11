"use client"

import React, {  useCallback, useEffect, useState } from 'react'
import useProject from '../../hooks/useProject'
import { GithubCommit } from "@prisma/client"
import { getCommits } from '../../actions/requests'
import { cn } from '@repo/ui/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const PAGE_SIZE = 10;

const CommitLog = () => {
    const { projectId, project } = useProject()
    const [commits, setCommits] = useState<GithubCommit[]>([])
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Optional, set to false if no more data


  // Fetch commits whenever projectId or page changes
  useEffect(() => {
    const fetchCommits = async () => {
      if (!projectId || !hasMore) return;
      setLoading(true);
      const newCommits = await getCommits(projectId, page, PAGE_SIZE);
      setCommits((prev) => [...prev, ...newCommits]);
      setLoading(false);
      if (newCommits.length < PAGE_SIZE) setHasMore(false);
    };
    fetchCommits();
  }, [projectId, page, hasMore]);

      // Infinite scroll handler
    const handleScroll = useCallback(() => {
        if (!loading && hasMore && window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [loading, hasMore]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Reset commits when project changes
    useEffect(() => {
        setCommits([]);
        setPage(1);
        setHasMore(true);
    }, [projectId]);

  return (
    <>
        {commits.length === 0 && (
            <div className='flex flex-col items-center justify-center p-4'>
                <div className='text-description'>No commits found for this project.</div>
            </div>
        )}
        <ul className='space-y-6'>
            {commits?.map((commit,index) => (
                <li key={commit.id} className='relative flex gap-x-4'>
                    <div className={cn("absolute left-0, top-0 flex w-6 justify-center",
                        index === commits.length - 1 ? 'h-8' : '-bottom-8' 
                    )}>
                        <div className='w-px translate-x-1 bg-sidebar'>

                        </div>
                    </div>
                    <>
                       <Image src={commit.commitAuthorAvatar} alt="Avatar" width={40} height={40} 
                       className='relative mt-4 size-8 flex-none rounded-full ' />
                       <div className='flex-auto rounded-md bg-sidebar p-3 ring-1 ring-inset ring-ring/30'>
                            <div className='flex justify-between gap-x-4'>
                                <Link target='_blank' 
                                href={`${project?.githubUrl}/commit/${commit.commitHash}`} 
                                className='py-0.5 text-xs leading-5 '>
                                    <span className='font-medium '>
                                        {commit.commitAuthorName}
                                    </span> <span className='inline-flex items-center text-description'>
                                        commited
                                        <ExternalLink className='ml-1 size-4' />
                                    </span>
                                </Link>
                                <span className='text-xs text-description'>
                                    {new Date(commit.commitDate).toLocaleDateString()}
                                </span>
                            </div>
                            <span className='font-semibold'>
                                {commit.commitMessage}
                            </span>
                            <pre className='mt-2 whitespace-pre-wrap text-sm text-gray-500'>
                                {commit.summary}
                            </pre>
                        </div>
                       
                    </>
                </li>
            ))}
        </ul>
           {loading && <p className="text-center py-4">Loading...</p>}
        {!hasMore && commits.length > 0 && (
            <div className="text-center py-4 text-muted-foreground">No more commits.</div>
        )}

    </>
  )
}

export default CommitLog