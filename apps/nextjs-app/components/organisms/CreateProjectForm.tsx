"use client"
import React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl,FormField, FormItem, FormMessage } from '@repo/ui/molecules/shadcn/form';
import { Separator } from '@repo/ui/atoms/shadcn/separator';
import { Input } from '@repo/ui/atoms/shadcn/input';
import { Button } from '@repo/ui/atoms/shadcn/button';
import { useToast } from '@repo/ui/hooks/use-toast';
import { checkCreditsAction, createProject } from '../../actions/project';
import useProject from '../../hooks/useProject';
import { Info } from 'lucide-react';
import { MultiStepLoader } from '@repo/ui/organisms/aceternity/multi-step-loader';
import { IconSquareRoundedX } from "@tabler/icons-react";

const loadingStates = [
  { text: "Initializing project", duration: 100},
    { text: "Connecting to Github", duration: 100},
    { text: "Fetching repository details", duration: 1000},
    { text: "Creating project in database", duration: 1000},
    { text: "Getting repository files", duration: 1000},
    { text: "Processing & summarizing files",duration: 15000},
    { text: "Adding files and their summaries to the project database", duration: 15000},
    { text: "Creating embedding for these summaries and updating the database", duration: 15000},
    { text: "Finalizing setup", duration: 100},
    { text: "Project setup complete", duration: 100},
    { text: "Ready to use your project",duration: 100}
];

const formSchema = z.object({
    projectName: z.string().min(1, {message: "Project name is required"}),
    repoUrl: z.string().url({message: "Invalid URL"}),
    githubToken: z.string().optional()
})

const CreateProjectForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
            repoUrl: "",
            githubToken: "",
        }
    })
    const { setProjectId,refreshProjects } = useProject()

    const [loadingRepository, setLoadingRepository] = React.useState(false)

    const isLoading = form.formState.isSubmitting

    const {toast} = useToast()

    const [checkCredits, setCheckCredits] = React.useState<any>(null)



    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{

            if(!!checkCredits){

                const result = await createProject({
                    githubUrl: values.repoUrl,
                    name: values.projectName,
                    githubToken: values.githubToken as string
                })
                
                if(!result){
                    toast({
                        title: "Failed to add project",
                        description : "An error occured while  adding your project",
                        variant: "destructive"
                    })
                    return
                }
                toast({
                    title: "Project added successfully",
                    description : "Your project has been added successfully",
                    variant: "success"
                })
                await refreshProjects()
                setProjectId(result.id)
                form.reset()
            }
            const creditsDetails = await checkCreditsAction(values.repoUrl,values.githubToken as string)
            setCheckCredits(creditsDetails)
        } catch(error){
            console.log(error)
            toast({
                title: "Failed to add project",
                description : "An error occured while  adding your project",
                variant: "destructive"
            })
        }
    }
  return (
    <>
        <div className='h-full p-4 space-y-2 max-w-3xl mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 pb-10'>
                    <div className='space-y-2 w-full col-span-2'>
                        <div>
                            <h3 className='text-lg font-medium'>
                                Link your Github Repository
                            </h3>
                            <p className='text-description'>
                                Enter the URL of your Github repository and the name of your project.
                            </p>
                        </div>
                        <Separator className='bg-primary/10' />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <FormField
                            name='projectName'
                            control={form.control}
                            render={({field}) => (
                                <FormItem className='col-span-2 md:col-span-1'>
                                    <FormControl>
                                        <Input disabled={isLoading} placeholder ="Project Name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='repoUrl'
                            control={form.control}
                            render={({field}) => (
                                <FormItem className='col-span-2 md:col-span-1'>
                                    <FormControl>
                                        <Input disabled={isLoading} placeholder ="Repository URL" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='githubToken'
                            control={form.control}
                            render={({field}) => (
                                <FormItem className='col-span-2 md:col-span-1'>
                                    <FormControl>
                                        <Input disabled={isLoading} placeholder ="Github Token (Optional)" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    {!!checkCredits && (
                        <>
                            <div className='mt-4 bg-destructive/40 px-4 py-2 rounded-md border border-destructive '>
                                <div className='flex items-center gap-2'>
                                    <Info className='size-4'/>
                                    <p className='text-sm'>You will be charged <strong>{checkCredits?.fileCount}</strong> credits for this repository.
                                    </p>
                                </div>
                                <p className='text-sm text-primary ml-6'>
                                    You have <strong>{checkCredits?.userCredits}</strong> credits remaining.
                                </p>
                            </div>
                        </>
                    )}
                    {!checkCredits && (
                        <>
                            <div className='mt-4 bg-destructive/40 px-4 py-2 rounded-md border border-destructive'>
                                <div className='flex items-center gap-2'>
                                    <Info className='size-4'/>
                                    <p className='text-sm'>
                                        Check the credits cost before connecting your Github repository.
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                    <div className='w-full flex justify-center gap-4'>
                        {!checkCredits && <Button size='lg'  disabled={isLoading} >
                            Check Credits Cost
                        </Button>}
                        {!!checkCredits && <Button size='lg' disabled={isLoading || !checkCredits || (checkCredits?.userCredits < checkCredits?.fileCount)} 
                        onClick={()=> setLoadingRepository(true)} >
                            Connect Your Github Repository
                        </Button>}
                    </div>
                </form>
            </Form>
           
            {loadingRepository && (
            <button
            className="fixed top-4 right-4 z-[120]"
            onClick={() => setLoadingRepository(false)}
            >
            <IconSquareRoundedX className="h-10 w-10" />
            </button>
        )}
        </div>
        <MultiStepLoader loadingStates={loadingStates} loading={loadingRepository} loop={false}/>
    </>
    
  )
}

export default CreateProjectForm