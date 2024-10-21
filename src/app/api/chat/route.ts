import { gemini } from "@/lib/ai"
import {Message, streamText,convertToCoreMessages} from "ai"

export async function POST(req: Request) {
    const {id,messages }: {id: string, messages: Message[]} = await req.json()
    
    const coreMessages = convertToCoreMessages(messages).filter(message => (
        message.content.length > 0
    ))

    const response = await streamText({
        model: gemini,
        system: ``,
        messages: coreMessages,
        onFinish(event) {
            console.log(`Generated response: ${event.text}`)
        },
    })
    return response.toDataStreamResponse()
}