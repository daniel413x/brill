import * as z from 'zod';

// eslint-disable-next-line import/prefer-default-export
export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Prompt is required',
  }),
});
