import React from 'react'
import CommitLog from '../../../components/organisms/CommitLog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/molecules/shadcn/tabs'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <Tabs defaultValue='commits' className='w-full '>
        <TabsList className='w-full justify-center'>
          <TabsTrigger value='commits' className='w-full text-center'>
            Commit Logs
          </TabsTrigger>
          <TabsTrigger value='pull-request' className='w-full text-center'>
            Pull Request Analysis
          </TabsTrigger>
        </TabsList>
        <TabsContent value='commits'>
            <CommitLog />
        </TabsContent>
        <TabsContent value='pull-request'>
          <div className='text-description w-full flex items-center justify-center mt-10 '>
            Pull Request Analysis feature is under development.
            </div>
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default page