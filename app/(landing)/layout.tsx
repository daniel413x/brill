import { Children } from '@/types';
import styles from './layout.module.scss';

interface LandingLayoutProps {
  children: Children;
}

const LandingLayout = ({
  children,
}: LandingLayoutProps) => (
  <main className={styles.main}>
    <div className={styles.main}>
      {children}
    </div>
  </main>
);

export default LandingLayout;
