import { FC } from 'react';
import { Metadata } from 'next';
import { Children } from '@/types';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Authentication',
};

interface AuthLayoutProps {
  children: Children;
}

const AuthLayout: FC<AuthLayoutProps> = ({
  children,
}: AuthLayoutProps) => (
  <main className={styles.layout}>
    {children}
  </main>
);

export default AuthLayout;
