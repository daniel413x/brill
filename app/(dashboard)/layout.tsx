import { FC } from 'react';
import { Metadata } from 'next';
import { Children } from '@/types';
import Sidebar from '@/components/ui/dashboard/Sidebar';
import Navbar from '@/components/ui/Navbar';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Authentication',
};

interface DashboardLayoutProps {
  children: Children;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
}: DashboardLayoutProps) => (
  <>
    <Sidebar parentStyles={styles} />
    <main className={styles.main}>
      <Navbar />
      {children}
    </main>
  </>
);

export default DashboardLayout;
