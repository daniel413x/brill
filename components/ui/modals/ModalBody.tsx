'use client';

import {
  DialogDescription,
} from '@/components/ui/shadcn/dialog';
import { Children } from '@/types';
import styles from './ModalBody.module.scss';

interface ModalBodyProps {
  children: Children;
}

const ModalBody = ({
  children,
}: ModalBodyProps) => (
  <DialogDescription className={styles.description}>
    {children}
  </DialogDescription>
);

export default ModalBody;
