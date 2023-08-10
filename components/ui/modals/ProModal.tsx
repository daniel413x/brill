'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import useProModal from '@/lib/hooks/useProModal';
import { dashboardToolCards } from '@/lib/data/arrays';
import { Card } from '@/components/ui/shadcn/card';
import {
  DialogFooter,
} from '@/components/ui/shadcn/dialog';
import styles from './ProModal.module.scss';
import { Badge } from '../shadcn/badge';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import Modal from './Modal';
import SubscriptionButton from '../SubscriptionButton';

const ProModal = () => {
  const proModal = useProModal();
  return (
    <Modal open={proModal.isOpen} onClose={proModal.onClose}>
      <ModalHeader>
        <div className={styles.badgeWrapper}>
          Upgrade to Brill
          <Badge variant="premium" className={styles.badge}>
            pro
          </Badge>
        </div>
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
        <SubscriptionButton />
      </DialogFooter>
    </Modal>
  );
};

export default ProModal;
