'use client';

import axios from 'axios';
import { useState } from 'react';
import { Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/shadcn/button';
import styles from './SubscriptionButton.module.scss';

interface SubscriptionButtonProps {
  isPro?: boolean;
}

const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');
      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button className={styles.subscriptionButton} variant={isPro ? 'default' : 'premium'} disabled={loading} onClick={onClick}>
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Zap className={styles.icon} />}
    </Button>
  );
};

export default SubscriptionButton;
