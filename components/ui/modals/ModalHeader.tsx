import {
  DialogHeader,
  DialogTitle,
} from '@/components/ui/shadcn/dialog';
import { Children } from '@/types';
import styles from './ModalHeader.module.scss';

interface ModalHeaderProps {
  children: Children;
}

const ModalHeader = ({
  children,
}: ModalHeaderProps) => (
  <DialogHeader>
    <DialogTitle className={styles.title}>
      {children}
    </DialogTitle>
  </DialogHeader>
);

export default ModalHeader;
