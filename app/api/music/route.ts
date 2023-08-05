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
      'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
      {
        input: {
          prompt_a: prompt,
        },
      },
    );
    return NextResponse.json(res);
  } catch (error: any) {
    return new NextResponse('Error', { status: 500 });
  }
};
