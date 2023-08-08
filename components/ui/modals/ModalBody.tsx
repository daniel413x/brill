import { Children } from '@/types';
import styles from './ModalBody.module.scss';

interface ModalBodyProps {
  children: Children;
}

const ModalBody = ({
  children,
}: ModalBodyProps) => (
  <div className={styles.description}>
    {children}
  </div>
);

export default ModalBody;
