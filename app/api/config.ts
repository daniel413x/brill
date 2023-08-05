import { Configuration, OpenAIApi } from 'openai';
import Replicate from 'replicate';

export const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(openaiConfig);

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
});
