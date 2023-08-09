'use client';

import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import styles from './LandingFooter.module.scss';
import SocialMedia from '../SocialMedia';

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
});

const LandingFooter = () => (
  <footer className={styles.landingFooter}>
    <span className={cn(styles.brill, font.className)}>brill.ai</span>
    &#124;
    <SocialMedia />
  </footer>
);

export default LandingFooter;
