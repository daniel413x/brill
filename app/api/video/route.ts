import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { replicate } from '../config';

// eslint-disable-next-line import/prefer-default-export
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
    const res = await replicate.run(
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
      {
        input: {
          prompt,
        },
      },
    );
    return NextResponse.json(res);
  } catch (error: any) {
    return new NextResponse('Error', { status: 500 });
  }
};
