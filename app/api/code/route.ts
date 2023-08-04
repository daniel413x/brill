import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { ChatCompletionRequestMessage } from 'openai';
import { configuration, openai } from '../config';

const instruction: ChatCompletionRequestMessage = {
  role: 'system',
  content: 'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.',
};

// eslint-disable-next-line import/prefer-default-export
export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!configuration.apiKey) {
      return new NextResponse('OpenAI API Key not configured', { status: 500 });
    }
    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 });
    }
    const res = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        instruction,
        ...messages,
      ],
    });
    return NextResponse.json(res.data.choices[0].message);
  } catch (error: any) {
    return new NextResponse('Error', { status: 500 });
  }
};
