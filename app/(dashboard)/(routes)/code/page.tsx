import { Metadata } from 'next';
import CodeLayout from '@/components/ui/dashboard/code/CodeLayout';

export const metadata: Metadata = {
  title: 'Code Generation',
};

const CodePage = () => (
  <CodeLayout />
);

export default CodePage;
