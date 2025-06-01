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
import { createQuiz } from '../actions/syllabus';

const formSchema = z.object({
    totalQuestions: z.number().min(1, {message: "Number of questions is required"}).max(20, {message: "Maximum number of questions is 20"}),
})

const CreateQuizForm = ({topicId}:{topicId:string}) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            totalQuestions: 1
        }
    })

    const isLoading = form.formState.isSubmitting

    const {toast} = useToast()



    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            await createQuiz(topicId, values.totalQuestions)
            
            toast({
                title: "Quiz is being generated. Please wait...",
                description : "Your quiz is being generated. You will be notified once it is ready.",
                variant: "success"
            })

            form.reset()


        } catch(error){
            console.log(error)
            toast({
                title: "Failed to create quiz",
                description : "An error occured while creating your quiz",
                variant: "destructive"
            })
        }
    }
  return (
    <div className='h-full p-4 space-y-2 max-w-3xl mx-auto'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 pb-10'>
                <div className='space-y-2 w-full col-span-2'>
                    <div>
                        <h3 className='text-lg font-medium'>
                            Generate Quiz
                        </h3>
                        <p className='text-description'>
                            Generate a quiz with a specified number of questions. 
                        </p>
                    </div>
                    <Separator className='bg-primary/10' />
                </div>
                <div className='flex flex-col gap-4'>
                    <FormField
                        name='totalQuestions'
                        control={form.control}
                        render={({field}) => (
                            <FormItem className='col-span-2 md:col-span-1'>
                                 <FormControl>
                                    <Input
                                        type="number"
                                        disabled={isLoading}
                                        placeholder="Total Questions"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                 </FormControl>
                                 <FormMessage/>
                            </FormItem>
                        )}
                    />
                    
                </div>
                
                <div className='w-full flex justify-center gap-4'>
                    <Button size='lg' disabled={isLoading} >
                        Generate Quiz
                    </Button>
                </div>
            </form>
        </Form>
    </div>
  )
}

export default CreateQuizForm