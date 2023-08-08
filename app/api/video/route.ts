import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { checkApiLimit, incrementApiLimit } from '@/lib/api-limit';
import checkSubscription from '@/lib/checkSubscription';
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
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
      {
        input: {
          prompt,
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
