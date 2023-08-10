import { FC } from 'react';
import { Metadata } from 'next';
import { Children } from '@/types';
import Sidebar from '@/components/ui/dashboard/Sidebar';
import Navbar from '@/components/ui/Navbar';
import { getApiLimitCount } from '@/lib/api-limit';
import checkSubscription from '@/lib/checkSubscription';
import CrispProvider from '@/components/providers/CrispProvider';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: {
    template: '%s | brill.ai',
    default: 'Dashboard',
  },
};

interface DashboardLayoutProps {
  children: Children;
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({
  children,
}: DashboardLayoutProps) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <>
      <CrispProvider />
      <Sidebar parentStyles={styles} apiLimitCount={apiLimitCount} isPro={isPro} />
      <div className={styles.wrapper}>
        <Navbar apiLimitCount={apiLimitCount} isPro={isPro} />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
