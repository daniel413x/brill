import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { checkApiLimit, incrementApiLimit, checkSubscription } from '@/lib/db/methods';
import { replicate } from '../config';

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    const isSubscribed = await checkSubscription();
    if (!isSubscribed && !freeTrial) {
      return new NextResponse('Free trial has expired.', { status: 403 });
    }
    const res = await replicate.run(
      'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
      {
        input: {
          prompt_a: prompt,
        },
      },
    );
    if (!isSubscribed) {
      await incrementApiLimit();
    }
    return NextResponse.json(res);
  } catch (error: any) {
    return new NextResponse('Error', { status: 500 });
  }
};
