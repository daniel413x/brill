import { UserButton } from '@clerk/nextjs';
import styles from './Navbar.module.scss';
import MobileSidebar from './MobileSidebar';

interface NavbarProps {
  apiLimitCount: number;
}

const Navbar = async ({
  apiLimitCount,
}: NavbarProps) => (
  <div className={styles.navbar}>
    <MobileSidebar apiLimitCount={apiLimitCount} />
    <div className={styles.end}>
      <UserButton afterSignOutUrl="/" />
    </div>
  </div>
);
export default Navbar;
