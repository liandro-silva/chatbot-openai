'use client'

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChat } from 'ai/react';
import Image from 'next/image';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export const Chat: React.FC = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat'
    });
    return (
        <div className="flex min-h-screen bg-slate-50 items-center justify-center">
            <Card className="flex flex-col items-start w-[440px] h-[700px]">
                <CardHeader>
                    <CardTitle className='flex align-center'>
                        <span className='mr-3'>Chatbot</span>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Image src={"/info.png"} alt='info' width={15} height={15} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        Built with NextJS, Vercel AI SDK, OpenAI (gpt-3.5-turbo), Tailwind CSS and Shadcn/ui
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 h-[550px]">
                    {
                        messages.map(message => (
                            <div key={message.id} className="flex gap-3 text-slate-600 text-sm">
                                {
                                    message.role === 'user' && (
                                        <Avatar>
                                            <AvatarFallback>LS</AvatarFallback>
                                            <AvatarImage src="https://avatars.githubusercontent.com/u/59675009?v=4" />
                                        </Avatar>
                                    )
                                }
                                {
                                    message.role === 'assistant' && (
                                        <Avatar>
                                            <AvatarFallback>LS</AvatarFallback>
                                            <AvatarImage src="/android.png" />
                                        </Avatar>
                                    )
                                }
                                <p className={`${message.role == "user" ? "bg-gray-200" : "bg-slate-50"} p-2 rounded-sm`}>
                                    {message.content}
                                </p>
                            </div>
                        ))
                    }
                </CardContent>
                <CardFooter className='space-x-2 aling justify-self-end w-full'>
                    <form className="w-full flex gap-2" onSubmit={handleSubmit}>
                        <Input placeholder="How can I help you?" value={input} onChange={handleInputChange} />
                        <Button type="submit">
                            Ask me
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}
