'use client';

import * as z from 'zod';
import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChatCompletionRequestMessage } from 'openai';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { CONVERSATION_ROUTE } from '@/lib/data/routes';
import useHasMounted from '@/lib/hooks/useHasMounted';
import useProModal from '@/lib/hooks/useProModal';
import { randomInt } from '@/lib/utils';
import styles from './ConversationLayout.module.scss';
import Heading from '../../Heading';
import { formSchema } from './consts';
import PromptForm from '../../PromptForm';
import ChatMessages from '../../ChatMessages';

const placeholders = [
  'How do you calculate the radius of the sun?',
  'What are some synonyms for the word "genius"?',
  'What did Nietzsche think about Dionysus?',
  'List 5 ideas for a side hustle.',
  'List 5 random facts about polar bears.',
];

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
  const proModal = useProModal();
  const [placeholder] = useState(placeholders[randomInt(placeholders.length)]);
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
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error('Something went wrong');
      }
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
          placeholder,
        }}
        buttonColor="bg-violet-500"
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
