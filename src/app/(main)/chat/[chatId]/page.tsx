"use client"

import { Markdown } from "@/components/markdown";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BotIcon, UserIcon } from "lucide-react";

export default function ChatPage({ params: { chatId } }: { params: { chatId: string } }) {
    const { messages, input, handleInputChange, handleSubmit } = useChat()
    console.log(messages)
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 p-4">
                <ScrollArea className="h-full">
                    <div className="flex flex-col w-full max-w-2xl  mx-auto ">
                        {messages.map(message => (
                            <div key={message.id} className={cn("flex items-center justify-center m-2", message.role === "user" ? "justify-end" : "justify-start")}>
                                <div className="size-[24px] border p-1 flex flex-col justify-center items-center shrink-0 text-black rounded-xl">
                                    {message.role === "assistant" ? <BotIcon /> : <UserIcon />}
                                </div>

                                <div className={cn("rounded-lg px-4 py-2 max-w-xl", message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black")}>
                                    <Markdown>
                                        {message.content}
                                    </Markdown>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

            </div>

            <div className="sticky bottom-0 bg-slate-100 p-4">

                <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto self-end">
                    <Input value={input} onChange={handleInputChange} />
                </form>
            </div>
        </div>
    )
}  