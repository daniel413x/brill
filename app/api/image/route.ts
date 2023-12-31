import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { checkApiLimit, incrementApiLimit, checkSubscription } from '@/lib/db/methods';
import { openaiConfig, openai } from '../config';

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = '512x512' } = body;
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!openaiConfig.apiKey) {
      return new NextResponse('OpenAI API Key not configured', { status: 500 });
    }
    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }
    if (!amount) {
      return new NextResponse('Amount is required', { status: 400 });
    }
    if (!resolution) {
      return new NextResponse('Resolution is required', { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    const isSubscribed = await checkSubscription();
    if (!isSubscribed && !freeTrial) {
      return new NextResponse('Free trial has expired.', { status: 403 });
    }
    const res = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });
    if (!isSubscribed) {
      await incrementApiLimit();
    }
    return NextResponse.json(res.data.data);
  } catch (error: any) {
    return new NextResponse('Error', { status: 500 });
  }
};
