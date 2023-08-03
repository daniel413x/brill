import Image from 'next/image';
import styles from './Loader.module.scss';

const Loader = () => (
  <div className={styles.loader}>
    <div className={styles.imageWrapper}>
      <Image
        alt="Logo"
        src="/images/logo-bg.png"
        fill
        className="rounded-1/3"
      />
    </div>
    <p className={styles.label}>
      Brill is thinking...
    </p>
  </div>
);

export default Loader;
