import Image from 'next/image';
import styles from './Empty.module.scss';

interface EmptyProps {
  label: string;
}

const Empty = ({
  label,
}: EmptyProps) => (
  <div className={styles.empty}>
    <div className={styles.imageWrapper}>
      <Image src="/images/empty.png" fill alt="Empty" priority />
    </div>
    <p className={styles.label}>
      {label}
    </p>
  </div>
);

export default Empty;
