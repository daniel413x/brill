import { ChatCompletionRequestMessage } from 'openai';
import { cn } from '@/lib/utils';
import styles from './ChatMessages.module.scss';
import Empty from './Empty';
import Loader from './Loader';
import UserAvatar from './UserAvatar';
import BotAvatar from './BotAvatar';

interface ChatMessagesProps {
  messages: ChatCompletionRequestMessage[];
  Message: any;
  isSubmitting: boolean;
}

const ChatMessages = ({
  messages,
  Message,
  isSubmitting,
}: ChatMessagesProps) => (
  <div className={styles.chatMessages}>
    {isSubmitting && (
    <div className={styles.loader}>
      <Loader />
    </div>
    )}
    {!isSubmitting && messages.length === 0 && (
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
            <Message message={message} />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ChatMessages;
