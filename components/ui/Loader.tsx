import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { SCSSModule } from '@/lib/types';
import { cn, cobbleStyles } from '@/lib/utils';
import defaultStyles from './Loader.module.scss';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

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
      <p className={cn(styles.label, poppins.className)}>
        Brill is thinking...
      </p>
    </div>
  );
};

export default Loader;
