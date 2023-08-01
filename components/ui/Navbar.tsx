import { FC } from 'react';
import { UserButton } from '@clerk/nextjs';
import styles from './Navbar.module.scss';
import MobileSidebar from './MobileSidebar';

const Navbar: FC = () => (
  <div className={styles.navbar}>
    <MobileSidebar />
    <div className={styles.end}>
      <UserButton afterSignOutUrl="/" />
    </div>
  </div>
);

export default Navbar;
