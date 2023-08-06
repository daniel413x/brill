'use client';

import * as z from 'zod';
import { Code } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChatCompletionRequestMessage } from 'openai';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { CODE_ROUTE } from '@/data/routes';
import { errorCatch } from '@/utils';
import useHasMounted from '@/hooks/useHasMounted';
import styles from './CodeLayout.module.scss';
import Heading from '../../Heading';
import { formSchema } from './consts';
import PromptForm from '../../PromptForm';
import ChatMessages from '../../ChatMessages';

const PreMarkup = ({ node, ...props }: any) => (
  <div className={styles.pre}>
    <pre {...props} />
  </div>
);

const CodeMarkup = ({ node, ...props }: any) => (
  <code
    className={styles.code}
    {...props}
  />
);

interface ChatMessageProps {
  message: ChatCompletionRequestMessage;
}

const ChatMessage = ({
  message,
}: ChatMessageProps) => (
  <ReactMarkdown
    components={{
      pre: PreMarkup,
      code: CodeMarkup,
    }}
    className={styles.message}
  >
    {message.content || ''}
  </ReactMarkdown>
);

const CodeLayout = () => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });
  const { isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      const res = await axios.post(`/api/${CODE_ROUTE}`, {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, res.data]);
      form.reset();
    } catch (error: any) {
      console.log(errorCatch(error));
    } finally {
      router.refresh();
    }
  };
  if (!useHasMounted()) {
    return null;
  }
  return (
    <div className={styles.codeLayout}>
      <Heading
        title="Code"
        description="Generate code using descriptive text."
        Icon={Code}
        iconColor="text-green-700"
        iconBgColor="bg-green-700/10"
      />
      <PromptForm
        form={form}
        submit={onSubmit}
        promptField={{
          id: 'prompt-field',
          name: 'prompt',
          placeholder: 'An algorithm that rotates an array 90 degrees.',
        }}
        buttonColor="bg-green-700"
      />
      <ChatMessages
        messages={messages}
        Message={ChatMessage}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default CodeLayout;
