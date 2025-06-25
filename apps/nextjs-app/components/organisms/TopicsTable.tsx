"use client"

import { DataTable } from '@repo/ui/molecules/shadcn/data-table'
import React, { useEffect, useState } from 'react'
import useTopics from '../../hooks/useTopics'
import useProject from '../../hooks/useProject'
import { Button } from '@repo/ui/atoms/shadcn/button'
import { ArrowUpDown } from 'lucide-react'
import { getSelfAssessmentForTopics, saveSelfAssessment } from '../../actions/performance'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/molecules/shadcn/select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@repo/ui/molecules/shadcn/sheet'

const assessmentLevels = [1,2,3,4,5,6,7,8,9,10];

const TopicsTable = () => {

    const {projectId} = useProject()
    const {data: topics = []} = useTopics(projectId ?? "", false);
    const [keys, setKeys] = useState<any[]>([]); // Use correct type for columns
    const [data, setData] = useState<any[]>([]); // Use correct type for data
    const [assessments, setAssessments] = useState<any[]>([]); // Store assessments for each topic
    const [open, setOpen] = useState(false);

    const columns = ["Name", "Number of Subtopics", "Self Assessment","Details"]

     const saveAssessment = async (topicName: string, level: number) => {
      // Save assessment to database via API call
      await saveSelfAssessment(topicName, "topic", level);
      setAssessments((prev: any) => ({
        ...prev,
        [topicName]: level
      }));
    };





    useEffect(() => {
        const getData = async () => {
            if (!topics || topics.length === 0) return;
            const topicNames = topics.map((topic: any) => topic.name)
            const uniqueTopicNames = Array.from(new Set(topicNames));
            const topicAssessments = await getSelfAssessmentForTopics();
            setAssessments(topicAssessments);
            const data = uniqueTopicNames.map((name) => {
            const subTopics = topics.filter((topic: any) => topic.name === name);
                return {
                    Name: name,
                    "Number of Subtopics": subTopics.length + " subtopics",
                    "Self Assessment":  topicAssessments[name] ?? "Not Assessed",
                };
            })
            setData(data);
        }
        getData();

    }, [topics]);

      useEffect(() =>{
        const updateDatabase = async() => {
            const keys:any = columns.map(key => {
                return {
                    header: ({ column }:any) => {
                        return (
                          <Button
                            variant="blank"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            className='text-left'
                          >
                            {key}
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        )
                    },
                    accessorKey: key,
                    id: key,
                    cell: ({row}:any) => {
                        if (key === "Self Assessment") {
                            const topicName = row.original.Name;
                            return (
                                <Select
                                value={assessments[topicName]?.toString() || ""}
                                onValueChange={(level) => saveAssessment(topicName, parseInt(level))}
                                >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {assessmentLevels.map(level=> (
                                    <SelectItem key={level} value={level.toString()}>
                                        Level {level}
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                            );
                        } else if (key === "Details") {
                            return (
                                <Button variant="link" onClick={() => {setOpen(true)}}>
                                    View Details
                                </Button>
                            );
                        }
                        else {
                            return <div className='text-description text-left'>{row.getValue(key)}</div>
                        }
                    },
                }
            })
            setKeys(keys);
        }
        updateDatabase();
      },[assessments, columns])

  return (
    <>
        <DataTable columns={keys} data={data} />
        <Sheet open ={open} onOpenChange={setOpen}>
            <SheetContent className='sm:max-w-[80vw] mx-4'>
                <SheetHeader>
                    <SheetTitle>Topic Details</SheetTitle>
                    <SheetDescription>
                        View and manage details for the selected topic.
                    </SheetDescription>
                </SheetHeader>
                {/* Add content for topic details here */}
            </SheetContent>
        </Sheet>
    </>
  )
}

export default TopicsTable