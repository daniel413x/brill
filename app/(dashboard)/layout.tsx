import { FC } from 'react';
import { Metadata } from 'next';
import { Children } from '@/types';
import Sidebar from '@/components/ui/dashboard/Sidebar';
import Navbar from '@/components/ui/Navbar';
import { getApiLimitCount } from '@/lib/api-limit';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Authentication',
};

interface DashboardLayoutProps {
  children: Children;
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({
  children,
}: DashboardLayoutProps) => {
  const apiLimitCount = await getApiLimitCount();
  return (
    <>
      <Sidebar parentStyles={styles} apiLimitCount={apiLimitCount} />
      <div className={styles.wrapper}>
        <Navbar />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
