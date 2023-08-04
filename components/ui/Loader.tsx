import Image from 'next/image';
import { cobbleStyles } from '@/utils';
import { SCSSModule } from '@/types';
import defaultStyles from './Loader.module.scss';

interface LoaderProps {
  parentStyles?: SCSSModule;
}

const Loader = ({
  parentStyles,
}: LoaderProps) => {
  const styles = cobbleStyles(defaultStyles, parentStyles);
  return (
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
};

export default Loader;
