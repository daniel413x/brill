'use client';

import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { DASHBOARD_ROUTE, SIGNUP_ROUTE } from '@/data/routes';
import { Button } from '../shadcn/button';
import styles from './LandingNavbar.module.scss';

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
});

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className={styles.landingNavbar}>
      <Link href="/" className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image
            fill
            alt="brill.ai Logo"
            src="/logos/brill-logo-c.png"
          />
        </div>
        <h1 className={cn(styles.header, font.className)}>
          brill.ai
        </h1>
      </Link>
      <div className={styles.buttons}>
        <Link href={isSignedIn ? `/${DASHBOARD_ROUTE}` : `/${SIGNUP_ROUTE}`}>
          <Button className={styles.getStartedButton} variant="premium">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
