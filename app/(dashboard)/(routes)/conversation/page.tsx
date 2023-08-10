import { Metadata } from 'next';
import ConversationLayout from '@/components/ui/dashboard/conversation/ConversationLayout';

export const metadata: Metadata = {
  title: 'Conversation',
};

const ConversationPage = () => (
  <ConversationLayout />
);

export default ConversationPage;
