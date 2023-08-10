'use client';

import { UserButton } from '@clerk/nextjs';
import useHasMounted from '@/lib/hooks/useHasMounted';
import MobileSidebar from './MobileSidebar';
import styles from './Navbar.module.scss';

const UserAvatar = () => {
  if (!useHasMounted()) {
    return null;
  }
  return (<UserButton afterSignOutUrl="/" />);
};

interface NavbarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Navbar = ({
  apiLimitCount,
  isPro,
}: NavbarProps) => (
  <div className={styles.navbar}>
    <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
    <div className={styles.end}>
      <UserAvatar />
    </div>
  </div>
);

export default Navbar;
