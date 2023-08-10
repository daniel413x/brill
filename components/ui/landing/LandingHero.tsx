'use client';

import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import TypewriterComponent from 'typewriter-effect';
import { DASHBOARD_ROUTE, SIGNIN_ROUTE } from '@/lib/data/routes';
import { Button } from '../shadcn/button';
import styles from './LandingHero.module.scss';

const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className={styles.landingHero}>
      <div className={styles.innerWrapper}>
        <h1>
          Your Limitless AI Tool for
        </h1>
        <div className={styles.typewriterWrapper}>
          <TypewriterComponent
            options={{
              strings: [
                'Chatting.',
                'Photo generation.',
                'Video generation.',
                'Music generation.',
                'Code generation.',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div className={styles.byline}>
          Create content using AI 10x faster.
        </div>
        <Link href={isSignedIn ? `/${DASHBOARD_ROUTE}` : `/${SIGNIN_ROUTE}`}>
          <Button className={styles.startButton} variant="premium">
            Start Generating For Free
          </Button>
        </Link>
        <div className={styles.byline}>
          No credit card required. 5 free generations.
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
