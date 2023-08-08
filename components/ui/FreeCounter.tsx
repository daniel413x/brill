'use client';

import { Zap } from 'lucide-react';
import { MAX_FREE_COUNTS } from '@/data/consts';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { Button } from '@/components/ui/shadcn/button';
import { Progress } from '@/components/ui/shadcn/progress';
import useProModal from '@/hooks/useProModal';
import styles from './FreeCounter.module.scss';

interface FreeCounterProps {
  isPro: boolean;
  apiLimitCount: number;
}

const FreeCounter = ({
  isPro = false,
  apiLimitCount = 0,
}: FreeCounterProps) => {
  const proModal = useProModal();
  if (isPro) return null;
  return (
    <div className={styles.freeCounter}>
      <Card className={styles.card}>
        <CardContent className={styles.content}>
          <div className={styles.counter}>
            <p>
              {apiLimitCount}
              {' '}
              /
              {' '}
              {MAX_FREE_COUNTS}
              {' '}
              Free Generations
            </p>
            <Progress className={styles.counter} value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
          </div>
          <Button onClick={proModal.onOpen} variant="premium" className={styles.upgradeButton}>
            Upgrade
            <Zap className={styles.zap} />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
