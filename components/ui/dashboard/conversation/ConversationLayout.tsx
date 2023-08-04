'use client';

import * as z from 'zod';
import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChatCompletionRequestMessage } from 'openai';
import axios from 'axios';
import { CONVERSATION_ROUTE } from '@/data/routes';
import { errorCatch } from '@/utils';
import useHasMounted from '@/hooks/useHasMounted';
import styles from './ConversationLayout.module.scss';
import Heading from '../../Heading';
import { formSchema } from './consts';
import PromptForm from '../../PromptForm';
import ChatMessages from '../../ChatMessages';

interface ChatMessageProps {
  message: ChatCompletionRequestMessage;
}

const ChatMessage = ({
  message,
}: ChatMessageProps) => (
  <p className={styles.chatMessage}>
    {message.content}
  </p>
);

const ConversationLayout = () => {
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
      const res = await axios.post(`/api/${CONVERSATION_ROUTE}`, {
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
    <div className={styles.conversationLayout}>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        Icon={MessageSquare}
        iconColor="text-violet-500"
        iconBgColor="bg-violet-500/10"
      />
      <PromptForm
        form={form}
        submit={onSubmit}
        promptField={{
          id: 'prompt-field',
          name: 'prompt',
          placeholder: 'How do you calculate the radius of the sun?',
        }}
      />
      <ChatMessages
        messages={messages}
        Message={ChatMessage}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ConversationLayout;
