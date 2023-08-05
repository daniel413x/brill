import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { cobbleStyles } from '@/utils';
import { SCSSModule } from '@/types';
import { cn } from '@/lib/utils';
import defaultStyles from './Loader.module.scss';

const poppins = Poppins({
  weight: '600',
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
