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
import { cn } from '@/lib/utils';
import useHasMounted from '@/hooks/useHasMounted';
import styles from './ConversationLayout.module.scss';
import Heading from '../../Heading';
import { formSchema } from './consts';
import {
  Form, FormControl, FormField, FormItem,
} from '../../shadcn/form';
import { Input } from '../../shadcn/input';
import { Button } from '../../shadcn/button';
import Empty from '../../Empty';
import Loader from '../../Loader';
import UserAvatar from '../../UserAvatar';
import BotAvatar from '../../BotAvatar';

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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles.form}
        >
          <FormField
            name="prompt"
            render={({ field }) => (
              <FormItem className={styles.formItem} id="prompt-field">
                <FormControl className={styles.formControl}>
                  <Input
                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                    disabled={isSubmitting}
                    placeholder="How do I calculate the radius of a circle?"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            Generate
          </Button>
        </form>
      </Form>
      <div className={styles.messages}>
        {isSubmitting && (
        <div className={styles.loader}>
          <Loader />
        </div>
        )}
        {messages.length === 0 && (
          <Empty label="No conversation history" />
        )}
        <ul className={styles.messagesUl}>
          {messages.map((message, i) => (
            <li key={i}>
              <div className={cn(styles.message, {
                [styles.user]: message.role === 'user',
              })}
              >
                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                <p className={styles.content}>
                  {message.content}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConversationLayout;
