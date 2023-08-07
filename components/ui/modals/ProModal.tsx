'use client';

import axios from 'axios';
import { useState } from 'react';
import { Check, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/shadcn/button';
import useProModal from '@/hooks/useProModal';
import { dashboardToolCards } from '@/data/arrays';
import { Card } from '@/components/ui/shadcn/card';
import {
  DialogTitle,
  DialogFooter,
} from '@/components/ui/shadcn/dialog';
import styles from './ProModal.module.scss';
import { Badge } from '../shadcn/badge';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import Modal from './Modal';

const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
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
    <Modal open={proModal.isOpen} onClose={proModal.onClose}>
      <ModalHeader>
        <DialogTitle className={styles.title}>
          <div className={styles.badgeWrapper}>
            Upgrade to Brill
            <Badge variant="premium" className={styles.badge}>
              pro
            </Badge>
          </div>
        </DialogTitle>
      </ModalHeader>
      <ModalBody>
        {dashboardToolCards.map((tool) => (
          <Card key={tool.href} className={styles.card}>
            <div className={styles.wrapper}>
              <div className={cn(styles.iconWrapper, tool.bgColor)}>
                <tool.Icon className={cn(styles.icon, tool.color)} />
              </div>
              <div className={styles.label}>
                {tool.label}
              </div>
            </div>
            <Check className={styles.check} />
          </Card>
        ))}
      </ModalBody>
      <DialogFooter>
        <Button disabled={loading} onClick={onSubscribe} size="lg" variant="premium" className={styles.upgradeButton}>
          Upgrade
          <Zap className={styles.icon} />
        </Button>
      </DialogFooter>
    </Modal>
  );
};

export default ProModal;
